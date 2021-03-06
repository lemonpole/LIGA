const players = require( '../fixtures/20200516133922-freeagents.json' );


module.exports = {
  up: async ( queryInterface ) => {
    // load data from db
    const [ countryrows ] = await queryInterface.sequelize.query(`
      SELECT id, code FROM Countries;
    `);

    // this will store out player array
    const output = [];

    // parse each team's roster
    players.forEach( player => {
      // find the countryid
      const countrycode = player.countrycode.toLowerCase() || 'na';
      const { id: countryid } = countryrows.find( c => c.code.toLowerCase() === countrycode );

      // add to the output
      output.push({
        alias: player.alias,
        tier: player.tier,
        transferListed: true,
        teamId: null,
        countryId: countryid,
        createdAt: new Date(),
        updatedAt: new Date(),
        eligibleDate: null,
        starter: false,
        stats: null,
      });
    });

    return queryInterface.bulkInsert( 'Players', output, { ignoreDuplicates: true });
  },

  down: () => {
    // @todo
  }
};
