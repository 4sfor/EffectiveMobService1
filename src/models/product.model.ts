import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from "sequelize-typescript";
import { Stocks } from "./stock.model";

@Table({ timestamps: true })
export class Products extends Model {
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
  plu: string;

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
    foreignKey: "productUid",
    onDelete: "CASCADE",
  })
  stocks: Stocks[];
}
