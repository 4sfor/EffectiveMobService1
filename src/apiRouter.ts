import { Router } from "express";
import { ProductRouter } from "./entity/product/product.router";
import { StocksRouter } from "./entity/stocks/stocks.router";

const apiRouter = Router();

const productRouter = new ProductRouter();
const stocksRouter = new StocksRouter();

apiRouter.use("/product", productRouter.getRouter());
apiRouter.use("/stocks", stocksRouter.getRouter());

export default apiRouter;
