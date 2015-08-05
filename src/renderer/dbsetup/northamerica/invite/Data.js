// Elite: 100
// Expert: 90

function BaseTeam( teamname ) {
  this._id = camelize( teamname );
  this.teamname = teamname;
  this.country = null;
  this.tag = null;
  this.squad = [];

  function camelize( str ) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function( letter, index ) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  }
}

function BasePlayer( username ) {
  this._id = camelize( username );
  this.username = username;
  this.teamId = null;
  this.transferValue = 0;
  this.skillTemplate = null;
  this.weaponTemplate = null;

  function camelize( str ) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function( letter, index ) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  }
}

var teamArr = [
  {
    name: 'Team 3D', tag: '3D | ', country: 'US', squad: [
      { username: 'rambo', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'moto', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'ksharp', skillTemplate: 'Elite', weaponTemplate: 'Sniper' },
      { username: 'Volcano', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'dohteM', skillTemplate: 'Elite', weaponTemplate: 'Rifle' }
    ]
  },
  {
    name: 'Cyberglobe', tag: 'Cyberglobe | ', country: 'CA', squad: [
      { username: 'chosen[st]', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'Loh', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'PublicEnemy', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'lazreth', skillTemplate: 'Expert', weaponTemplate: 'Sniper' },
      { username: 'brooks', skillTemplate: 'Expert', weaponTemplate: 'Rifle' }
    ]
  },
  {
    name: 'DeadZone', tag: '[DZ] ', country: 'US', squad: [
      { username: 'Talon', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'cole', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'Tekn1kal', skillTemplate: 'Elite', weaponTemplate: 'Sniper' },
      { username: 'phys1kz', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'arkrael', skillTemplate: 'Expert', weaponTemplate: 'Rifle' }
    ]
  },
  {
    name: 'Evil Geniuses', tag: 'EG.', country: 'CA', squad: [
      { username: 'Lan', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'blackpanther', skillTemplate: 'Elite', weaponTemplate: 'Sniper' },
      { username: 'Kolach', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'shaGuar[A]', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'Stevenson', skillTemplate: 'Elite', weaponTemplate: 'Rifle' }
    ]
  },
  {
    name: 'Green Berets', tag: '[GB] ', country: 'US', squad: [
      { username: 'b33f', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'Jame^s', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'LuckyTed', skillTemplate: 'Elite', weaponTemplate: 'Sniper' },
      { username: 'CuZ-1H', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'Rocky', skillTemplate: 'Expert', weaponTemplate: 'Rifle' }
    ]
  },
  {
    name: 'iDemise', tag: 'iD ` ', country: 'US', squad: [
      { username: 'noXn', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'goodfornothing', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'hostile', skillTemplate: 'Elite', weaponTemplate: 'Sniper' },
      { username: 'senaH', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'exodus', skillTemplate: 'Elite', weaponTemplate: 'Rifle' }
    ]
  },
  {
    name: 'JaX Money Crew', tag: 'JMC | ', country: 'US', squad: [
      { username: 'JaX', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'Vigaku', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'RhapX', skillTemplate: 'Expert', weaponTemplate: 'Sniper' },
      { username: 'Kam', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'Des1re', skillTemplate: 'Elite', weaponTemplate: 'Rifle' }
    ]
  },
  {
    name: 'Mug N Mouse', tag: 'm[n]m * ', country: 'US', squad: [
      { username: 'Mason', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 's0nNy', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'MuMiX', skillTemplate: 'Expert', weaponTemplate: 'Sniper' },
      { username: 'punkvillE', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'phamtastik', skillTemplate: 'Expert', weaponTemplate: 'Rifle' }
    ]
  },
  {
    name: 'Netfragz', tag: 'netfragz | ', country: 'CA', squad: [
      { username: 'panacea', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'tOyMaCHiN3', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'dutchfoo', skillTemplate: 'Expert', weaponTemplate: 'Sniper' },
      { username: 'jess', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'happa', skillTemplate: 'Expert', weaponTemplate: 'Rifle' }
    ]
  },
  {
    name: 'Pandemic', tag: 'Pandemic | ', country: 'US', squad: [
      { username: 'cramblock', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'IceCream', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'elusive', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'Griff', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'voodoo', skillTemplate: 'Expert', weaponTemplate: 'Sniper' }
    ]
  },
  {
    name: 'Rival', tag: 'Rival | ', country: 'CA', squad: [
      { username: 'keen', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'kaM', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'exodu[st]', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'Masternook', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'Ph33r', skillTemplate: 'Elite', weaponTemplate: 'Sniper' }
    ]
  },
  {
    name: 'Turmoil', tag: 'Turmoil * ', country: 'US', squad: [
      { username: 'Bruin', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'chaos', skillTemplate: 'Expert', weaponTemplate: 'Sniper' },
      { username: 'jaded', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'SuperBug', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'VoltroN', skillTemplate: 'Elite', weaponTemplate: 'Rifle' }
    ]
  },
  {
    name: 'Underestimated', tag: 'ue.', country: 'US', squad: [
      { username: 'cbfx', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'pure', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'VandaL', skillTemplate: 'Expert', weaponTemplate: 'Sniper' },
      { username: 'BiRDY', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'sjyxx', skillTemplate: 'Elite', weaponTemplate: 'Rifle' }
    ]
  },
  {
    name: 'United 5', tag: 'United[5] * ', country: 'US', squad: [
      { username: 'evaN', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'PaTyoJoN', skillTemplate: 'Elite', weaponTemplate: 'Sniper' },
      { username: 'BatMaN[st]', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'zid[1g]', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
      { username: 'killabeez-1H', skillTemplate: 'Elite', weaponTemplate: 'Rifle' }
    ]
  },
  {
    name: 'zEx', tag: 'zEx | ', country: 'US', squad: [
      { username: 'reCTOOOOOR', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'Titus', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'moses', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'aimeTTi', skillTemplate: 'Elite', weaponTemplate: 'Sniper' },
      { username: 'hickEEEEY', skillTemplate: 'Expert', weaponTemplate: 'Rifle' },
    ]
  },
  {
    name: 'compLexity', tag: 'coL.', country: 'US', squad: [
      { username: 'fRoD[A]', skillTemplate: 'Elite', weaponTemplate: 'Sniper' },
      { username: 'Warden[A]', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'sunman', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'tr1p[g]', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
      { username: 'Storm[A]', skillTemplate: 'Elite', weaponTemplate: 'Rifle' },
    ]
  }
];

var PouchDB = require('pouchdb');
var dbCountries = PouchDB('la-liga-countries');
var dbTeams = PouchDB('la-liga-teams');
var dbPlayers = PouchDB('la-liga-players');

var promises = { countries: null, teams: [], players: [] };
var savedObjects = { countries: [], teams: [] };

// begin by fetching the country objects we need from the db
promises.countries = dbCountries.get( 'US' ).then(function( doc ) {
  savedObjects.countries[ 'US' ] = doc;
  return dbCountries.get( 'CA' );
}).then(function( doc ) {
  savedObjects.countries[ 'CA' ] = doc;
  return Promise.resolve();
});

// continue only when the previous calls are fully done.
module.exports = {
  init: function() {
    return new Promise( function( resolve, reject ) {
      promises.countries.then( function() {
        for( var i = 0; i < teamArr.length; i++ ) {
          var teamObj = new BaseTeam( teamArr[ i ].name );
          teamObj.country = savedObjects.countries[ teamArr[ i ].country ];
          teamObj.tag = teamArr[ i ].tag;

          savedObjects.teams[ teamObj._id ] = teamObj; // not really saved but READY to be saved
          promises.players[ i ] = []; // hold current index promises

          for( var j = 0; j < teamArr[ i ].squad.length; j++ ) {
            var playerObj = new BasePlayer( teamArr[ i ].squad[ j ].username );
            playerObj.skillTemplate = teamArr[ i ].squad[ j ].skillTemplate;
            playerObj.weaponTemplate = teamArr[ i ].squad[ j ].weaponTemplate;
            playerObj.teamId = teamObj._id;
            
            // give player his market value depending on skill level
            switch( playerObj.skillTemplate ) {
              case 'Elite':
                playerObj.transferValue = 250000000;
                break;
              case 'Expert':
                playerObj.transferValue = 200000000;
                break;
            }
            
            promises.players[ i ].push( dbPlayers.put( playerObj ).then( function( res ) {
              return dbPlayers.get( res.id );
            }) );
          }

          promises.teams.push( Promise.all( promises.players[ i ] ).then( function( squad ) {
            var teamObj = savedObjects.teams[ squad[ 0 ].teamId ];
            teamObj.squad = squad;

            return dbTeams.put( teamObj );
          }) );
        }

        Promise.all( promises.teams ).then( function() {
          resolve();
        });
      });
    });
  }
};
