import { Model, Sequelize } from 'sequelize';
import { BelongsToSetAssociationMixin, BelongsToManySetAssociationsMixin } from 'sequelize/types';


/**
 * Sequelize models are not written in typescript
 * so their typings will be defined here.
 */

declare module 'main/database/models' {


  class BaseModel extends Model {
    public readonly id: number;

    public static autoinit( sequelize: Sequelize ): void;
    public static associate( models: any ): void;
  }


  export class Continent extends BaseModel {}


  export class Country extends BaseModel {}


  export class Compdef extends BaseModel {
    public readonly name: string;
    public readonly season: number;
    public readonly tiers: any[];
  }


  export class Competition extends BaseModel {
    public readonly data: any;
    public setCompdef: BelongsToSetAssociationMixin<Compdef, number>;
    public setContinents: BelongsToManySetAssociationsMixin<Continent, number>;
  }


  export class Team extends BaseModel {
    public readonly name: string;
    public readonly tier: number;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    public static findByRegionId( id: number ): Promise<Team[]>;
    public setCountry: BelongsToSetAssociationMixin<Country, number>;
  }


  export class Player extends BaseModel {
    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    public setTeam: BelongsToSetAssociationMixin<Team, number>;
    public setCountry: BelongsToSetAssociationMixin<Country, number>;
  }


  export class Profile extends BaseModel {
    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    public setTeam: BelongsToSetAssociationMixin<Team, number>;
    public setPlayer: BelongsToSetAssociationMixin<Player, number>;
  }


}
