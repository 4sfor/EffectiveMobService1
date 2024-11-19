import { Sequelize } from "sequelize-typescript";
import { Shops } from "./models/shop.model";
import { Stocks } from "./models/stock.model";
import { Products } from "./models/product.model";
const connectionDb = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOSTNAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: console.log,
  models: [Products, Shops, Stocks],
});

export default connectionDb;
