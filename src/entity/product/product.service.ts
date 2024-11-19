import { Products } from "../../models/product.model";
import { CreateProductDto } from "./dto/createProduct.dto";
import { BadRequest } from "../../apiExeption/exeprion";
import { FilterProduct } from "./interface/filter";
import { Op } from "sequelize";
import emitter from "../../emitter/emitter";

export class ProductService {
  private productModel: typeof Products;
  constructor() {
    this.productModel = Products;
  }

  async createProduct(product: CreateProductDto): Promise<Products> {
    try {
      const data = {
        plu: product.plu,
        name: product.name,
      };
      const result = await this.productModel.create(data);
      emitter.emit("History", {
        plu: result.plu,
        action: "Added product",
      });
      return result;
    } catch (er) {
      throw new BadRequest(er);
    }
  }

  async getAll(filter: FilterProduct): Promise<Products[]> {
    try {
      const searchObj = {
        where: {
          [Op.and]: [],
        },
      };
      const singleFilter = ["plu", "name"];
      for (const key in filter) {
        if (singleFilter.includes(key)) {
          searchObj["where"][Op.and].push({ [key]: filter[key] });
        }
      }
      return await this.productModel.findAll(searchObj);
    } catch (er) {
      throw new BadRequest(er);
    }
  }
}
