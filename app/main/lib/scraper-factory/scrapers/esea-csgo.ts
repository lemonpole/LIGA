import { uniqBy, camelCase } from 'lodash';
import cheerio from 'cheerio';
import CachedScraper from '../cached-scraper';


export class ESEA_CSGO_Player {
  id: string;
  username = '';
  countryCode = '';
  teamId = '';
  transferValue = 0;
  skillTemplate = '';
  weaponTemplate = '';

  constructor( id: string ) {
    this.id = id;
  }
}


export class ESEA_CSGO_Team {
  id: string;
  name = '';
  url: string;
  placement: number;
  tag = '';
  countryCode = '';
  division = '';
  skillTemplate = '';
  squad: Array<ESEA_CSGO_Player> = [];

  constructor( url: string, division: string, placement: number ) {
    this.id = url.split( '?' )[ 0 ].split( 'teams/' )[ 1 ];
    this.url = url;
    this.division = division;
    this.placement = placement;
  }
}

export class ESEA_CSGO_Division {
  id: string;
  url: string;
  name = '';
  teams: Array<ESEA_CSGO_Team> = [];

  constructor( url: string ) {
    this.id = url.split( 'division_id=' )[ 1 ];
    this.url = url;
  }
}

export class ESEA_CSGO_Region {
  id: string;
  divisions: Array<ESEA_CSGO_Division>;

  constructor( id: string, divisions: Array<ESEA_CSGO_Division> ) {
    this.id = id;
    this.divisions = divisions;
  }
}

export type ESEA_CSGO_Regions = Array<ESEA_CSGO_Region>;


class ESEA_CSGO {
  BASE_URL = 'https://play.esea.net';
  DIVISION_BASE_URL = 'index.php?s=league&d=standings&division_id';

  scraperObj: CachedScraper;
  regions: ESEA_CSGO_Regions;

  constructor( cacheDir: string ) {
    this.scraperObj = new CachedScraper( cacheDir );
    this.scraperObj.initCacheDir();

    this.regions = [
      new ESEA_CSGO_Region(
        'na', [
          new ESEA_CSGO_Division( `${this.BASE_URL}/${this.DIVISION_BASE_URL}=2490` ),
          new ESEA_CSGO_Division( `${this.BASE_URL}/${this.DIVISION_BASE_URL}=2491` )
        ]
      ),
      new ESEA_CSGO_Region(
        'eu', [
          new ESEA_CSGO_Division( `${this.BASE_URL}/${this.DIVISION_BASE_URL}=2485` ),
          new ESEA_CSGO_Division( `${this.BASE_URL}/${this.DIVISION_BASE_URL}=2505` )
        ]
      )
    ];
  }

  /**
   * Build a unique array of team URLs for the current division object.
   * Modifies the passed in division object and returns it.
   */
  buildDivision = ( divisionObj: ESEA_CSGO_Division, data: string ): ESEA_CSGO_Division => {
    const $ = cheerio.load( data );
    const teamListElem = $( '#league-standings table tr[class*="row"]' );

    const divisionStringResult = $( '#league-standings section.division h1' ).html() as string;
    const divisionString = divisionStringResult.split( 'CS:GO' );

    divisionObj.name = divisionString[ 1 ].trim();

    teamListElem.each( ( counter: number, el: CheerioElement ) => {
      const teamContainerElem = $( el ).children( 'td:nth-child(2)' );
      const teamURL = teamContainerElem.children( 'a:nth-child(2)' ).attr( 'href' ) || '';

      divisionObj.teams.push( new ESEA_CSGO_Team(
        this.BASE_URL + teamURL.replace( /\./g, '&period[' ),
        divisionObj.name,
        counter
      ) );
    });

    // before returning remove duplicate URLs due to
    // pre and post-seasons
    divisionObj.teams = uniqBy( divisionObj.teams, 'url' );
    return divisionObj;
  }

  /**
   * Build the team object and its squad from the scraped html data.
   * Modified the passed in team object5 and returns it.
   */
  buildTeam = ( teamObj: ESEA_CSGO_Team, html: string ) => {
    const $ = cheerio.load( html );
    const profileElem = $( '#teams-profile hr + section' );
    const profileInfoElem = profileElem.children( 'div#profile-info' );
    const teamnameElem = profileElem.children( 'div#profile-header' ).children( 'h1' );
    const profileRosterElem = profileElem.children( 'div#profile-column-right' ).children( 'div.row1' );

    teamObj.name = teamnameElem.text();
    teamObj.tag = profileInfoElem.children( 'div.content' ).children( 'div.data' ).html() as string;

    // Professional = Elite
    // Premier = Expert, Very Hard
    // Main = Hard, Tough
    // Intermediate = Normal, Fair
    // Open = Easy
    switch( teamObj.division ) {
      case 'Professional':
        teamObj.skillTemplate = 'Elite';
        break;
      case 'Premier':
        teamObj.skillTemplate = ( ( teamObj.placement < 3 ) ? 'Expert' : 'Very Hard' );
        break;
      case 'Main':
        teamObj.skillTemplate = ( ( teamObj.placement < 3 ) ? 'Hard' : 'Tough' );
        break;
      case 'Intermediate':
        teamObj.skillTemplate = ( ( teamObj.placement < 3 ) ? 'Normal' : 'Fair' );
        break;
      case 'Amateur':
        teamObj.skillTemplate = 'Easy';
        break;
      default:
        break;
    }

    // TODO — a team may not have a roster. eg: https://goo.gl/DfhSNi
    // TODO — what to do in this case?
    profileRosterElem.each( ( counter: number, el: CheerioElement ) => {
      const countryElem = $( el ).children( 'a' ).children( 'img' );
      const nameElem = $( el ).children( 'a:nth-child(3)' );

      // @ts-ignore
      const index = countryElem.attr( 'src' ).indexOf( '.gif' );
      // @ts-ignore
      const countryCode = countryElem.attr( 'src' ).substring( index - 2, index );

      // Inherit first player's country code as the team's
      if( counter === 0 ) {
        teamObj.countryCode = countryCode;
      }

      const playerObj = new ESEA_CSGO_Player( camelCase( nameElem.text() ) );
      playerObj.username = nameElem.text();
      playerObj.countryCode = teamObj.countryCode;
      playerObj.teamId = teamObj.id;
      playerObj.transferValue = 0;
      playerObj.skillTemplate = teamObj.skillTemplate;
      playerObj.weaponTemplate = ( ( counter % 4 === 0 ) ? 'Sniper' : 'Rifle' );

      teamObj.squad.push( playerObj );
    });

    return teamObj;
  }

  generate = async (): Promise<ESEA_CSGO_Regions> => {
    const regions = this.regions;

    for( let i = 0; i < regions.length; i++ ) {
      // each region has divisions we must loop through in order
      // to scrape information for itself, the teams, and squads
      const region = regions[ i ];

      for( let j = 0; j < region.divisions.length; j++ ) {
        let divisionObj = region.divisions[ j ];

        // scrape the current division's information and collect
        // its list of teams
        try {
          const content = await this.scraperObj.scrape( divisionObj.url, divisionObj.id );
          divisionObj = this.buildDivision( divisionObj, content );
        } catch( err ) {
          console.log( `\nskipping ${divisionObj.id}...` );
          console.log( err.message );
          continue;
        }

        // we have the list of teams for the current division
        // now we need to scrape each team's page and collect information and squad
        const { teams } = divisionObj;

        for( let k = 0; k < teams.length; k++ ) {
          let teamObj = teams[ k ];

          const content = await this.scraperObj.scrape( teamObj.url, teamObj.id );
          teamObj = this.buildTeam( teamObj, content );
        }
      }
    }

    return Promise.resolve( this.regions );
  }
}


export default ESEA_CSGO;
