export default ( sequelize, DataTypes ) => {
  const FIELDS = {};
  const OPTIONS = {
    timestamps: false,
    classMethods: {}
  };

  let model = null;

  FIELDS.username = {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  };

  FIELDS.transferValue = {
    type: DataTypes.DECIMAL( 10, 2 ),
    defaultValue: 0.00
  };

  OPTIONS.classMethods.associate = ( models ) => {
    model.belongsTo( models.team );
    model.belongsTo( models.game );
    model.belongsTo( models.country );
  };

  model = sequelize.define( 'player', FIELDS, OPTIONS );
  return model;
};