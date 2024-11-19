import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { Stocks } from "./stock.model";

@Table({ timestamps: true })
export class Shops extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  uuid: string;
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @HasMany(() => Stocks, {
    sourceKey: "uuid",
    foreignKey: "shopUid",
    onDelete: "CASCADE",
  })
  stocks: Shops[];
}
