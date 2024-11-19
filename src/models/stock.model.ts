import {
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  Model,
} from "sequelize-typescript";
import { Shops } from "./shop.model";
import { Products } from "./product.model";

@Table({ timestamps: true })
export class Stocks extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  uuid: string;

  @ForeignKey(() => Shops)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  shopUid: string;

  @BelongsTo(() => Shops)
  shop: Shops;

  @ForeignKey(() => Products)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  productUid: string;

  @BelongsTo(() => Products)
  product: Shops;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  quantityShelf: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  quantityOrder: number;

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
}
