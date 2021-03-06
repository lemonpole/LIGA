// @flow
import { camelCase } from 'lodash';
import cheerio from 'cheerio';
import CachedScraper from '../cached-scraper';
import { ESEA_CSGO_Player } from './esea-csgo';


export interface ESEA_CSGO_FA_Regions {
  [x: string]: ESEA_CSGO_Player[];
}


export default class ESEA_CSGO_FREEAGENTS {
  // @constants
  BASE_URL = 'https://play.esea.net/index.php?s=stats&d=overall';
  NA_REGION_ID = '&region_id=1';
  EU_REGION_ID = '&region_id=2';

  // @properties
  scraperObj: CachedScraper;
  regions: ESEA_CSGO_FA_Regions;

  constructor( cacheDir: string ) {
    this.scraperObj = new CachedScraper( cacheDir );
    this.scraperObj.initCacheDir();

    this.regions = {
      NA: [],
      EU: []
    };
  }

  buildPlayerList = ( html: string ): ESEA_CSGO_Player[] => {
    const $ = cheerio.load( html );
    const playerListElem = $( '#layout-column-center table tr[class*="row"]' );
    const playerList: ESEA_CSGO_Player[] = [];

    playerListElem.each( ( counter: number, el: CheerioElement ) => {
      const nameContainerElem = $( el ).children( 'td' ).first();
      const countryElem = $( nameContainerElem ).children( 'a' ).first().children( 'img' );
      const nameElem = $( nameContainerElem ).children( 'a:nth-child( 2 )' );

      // scrape the country code
      const index = countryElem.attr( 'src' ).indexOf( '.gif' );
      const countryCode = countryElem.attr( 'src' ).substring( index - 2, index );

      const playerObj = new ESEA_CSGO_Player( camelCase( nameElem.text() ) );
      playerObj.username = nameElem.text();
      playerObj.countryCode = countryCode;
      playerObj.teamId = '';
      playerObj.transferValue = 0;
      playerObj.skillTemplate = 'Easy';
      playerObj.weaponTemplate = ( ( counter % 4 === 0 ) ? 'Sniper' : 'Rifle' );

      playerList.push( playerObj );
    });

    return playerList;
  }

  generate = async (): Promise<ESEA_CSGO_FA_Regions> => {
    const { regions } = this;

    // build the NA region free agents
    let url = this.BASE_URL + this.NA_REGION_ID;
    let content = await this.scraperObj.scrape( url, 'na_freeagents' );
    regions.NA = this.buildPlayerList( content );

    // build the EU region free agents
    url = this.BASE_URL + this.EU_REGION_ID;
    content = await this.scraperObj.scrape( url, 'eu_freeagents' );
    regions.EU = this.buildPlayerList( content );

    return Promise.resolve( this.regions );
  }
}
