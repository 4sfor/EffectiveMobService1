import { Router, Request, Response, NextFunction } from "express";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/createProduct.dto";
import { FilterProduct } from "./interface/filter";

export class ProductRouter {
  private router = Router();
  private productService = new ProductService();
  constructor() {
    this.initialize();
  }

  private initialize() {
    this.router.post("/", (req: Request, res: Response, next: NextFunction) =>
      this.create(req, res, next),
    );
    this.router.get("/", (req: Request, res: Response, next: NextFunction) =>
      this.getAll(req, res, next),
    );
  }

  public getRouter() {
    return this.router;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateProductDto = req.body;
      const result = await this.productService.createProduct(data);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filter: FilterProduct = req["filterParams"];
      const result = await this.productService.getAll(filter);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
