import { Router, Request, Response, NextFunction } from "express";
import { StocksService } from "./stocks.service";
import { CreateStocksDto } from "./dto/createStocks.dto";
import { UpdateStocks } from "./dto/updateStocks.dto";
import { FilterStocks } from "./interface/filter";

export class StocksRouter {
  private router = Router();
  private stocksService = new StocksService();
  constructor() {
    this.initialize();
  }

  private initialize() {
    this.router.post("/", (req: Request, res: Response, next: NextFunction) =>
      this.create(req, res, next),
    );
    this.router.patch(
      "/increase",
      (req: Request, res: Response, next: NextFunction) =>
        this.increase(req, res, next),
    );
    this.router.patch(
      "/reduce",
      (req: Request, res: Response, next: NextFunction) =>
        this.reduce(req, res, next),
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
      const data: CreateStocksDto = req.body;
      const result = await this.stocksService.createStocks(data);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  async increase(req: Request, res: Response, next: NextFunction) {
    try {
      const uuid = req.params.uuid;
      const data: UpdateStocks = req.body;
      const result = await this.stocksService.stocksIncrease(data, uuid);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async reduce(req: Request, res: Response, next: NextFunction) {
    try {
      const uuid = req.params.uuid;
      const data: UpdateStocks = req.body;
      const result = await this.stocksService.stocksReduce(data, uuid);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filter: FilterStocks = req["filterParams"];
      const result = await this.stocksService.gelAll(filter);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
