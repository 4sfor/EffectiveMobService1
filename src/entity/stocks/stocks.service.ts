import { CreateStocksDto } from "./dto/createStocks.dto";
import { Stocks } from "../../models/stock.model";
import { BadRequest } from "../../apiExeption/exeprion";
import { UpdateStocks } from "./dto/updateStocks.dto";
import { FilterStocks } from "./interface/filter";
import { Op } from "sequelize";
import { Products } from "../../models/product.model";
import emitter from "../../emitter/emitter";

export class StocksService {
  private stocksModel: typeof Stocks;
  private productModel: typeof Products;
  constructor() {
    this.stocksModel = Stocks;
    this.productModel = Products;
  }

  async createStocks(stocks: CreateStocksDto): Promise<Stocks> {
    try {
      const data = {
        shopUid: stocks.shopUid,
        productUid: stocks.productUid,
        quantityShelf: stocks.quantityShelf,
        quantityOrder: stocks.quantityOrder,
      };
      const result = await this.stocksModel.create(data);
      const product = await this.productModel.findByPk(result.productUid);
      emitter.emit("History", {
        plu: product.plu,
        shopUid: result.shopUid,
        action: "Created stocks",
      });
      return result;
    } catch (er) {
      throw new BadRequest(er);
    }
  }

  async stocksReduce(
    value: UpdateStocks,
    uuid: string,
  ): Promise<{
    shopUid: string;
    productUid: string;
    quantityShelf: number;
    quantityOrder: number;
  }> {
    try {
      const data = await this.stocksModel.findByPk(uuid);
      const newData = {
        shopUid: data.shopUid,
        productUid: data.productUid,
        quantityShelf: data.quantityShelf - value.amount,
        quantityOrder: data.quantityOrder,
      };
      const [, product] = await Promise.all([
        this.stocksModel.update(newData, {
          where: { uuid: uuid },
        }),
        this.productModel.findByPk(newData.productUid),
      ]);
      emitter.emit("History", {
        plu: product.plu,
        shopUid: newData.shopUid,
        action: "Reduce stocks",
      });
      return newData;
    } catch (err) {
      throw new BadRequest(err);
    }
  }
  async stocksIncrease(
    value: UpdateStocks,
    uuid: string,
  ): Promise<{
    shopUid: string;
    productUid: string;
    quantityShelf: number;
    quantityOrder: number;
  }> {
    try {
      const data = await this.stocksModel.findByPk(uuid);
      const newData = {
        shopUid: data.shopUid,
        productUid: data.productUid,
        quantityShelf: data.quantityShelf + value.amount,
        quantityOrder: data.quantityOrder,
      };
      const [, product] = await Promise.all([
        this.stocksModel.update(newData, {
          where: { uuid: uuid },
        }),
        this.productModel.findByPk(newData.productUid),
      ]);
      emitter.emit("History", {
        plu: product.plu,
        shopUid: newData.shopUid,
        action: "Increase stocks",
      });
      return newData;
    } catch (err) {
      throw new BadRequest(err);
    }
  }

  async gelAll(filter: FilterStocks): Promise<Stocks[]> {
    try {
      const searchObj = {
        where: {
          [Op.and]: [],
        },
      };
      const singleFilter = ["shopUid"];
      const diapasonFilter = ["quantityOrder", "quantityShelf"];
      for (const key in filter) {
        if (diapasonFilter.includes(key)) {
          searchObj["where"][Op.and].push({
            [key]: { [Op.between]: filter[key] },
          });
        } else if (singleFilter.includes(key)) {
          searchObj["where"][Op.and].push({
            [key]: filter[key],
          });
        }
      }
      if (filter["plu"]) {
        searchObj["include"] = [
          {
            model: Products,
            attributes: [],
            where: { plu: filter["plu"] },
          },
        ];
      }
      return await this.stocksModel.findAll(searchObj);
    } catch (er) {
      throw new BadRequest(er);
    }
  }
}
