import { Request, Response, NextFunction } from "express";

export function filterMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const plu = req.query.plu as string;
  const name = req.query.name as string;
  const shopUid = req.query.shopUid as string;
  const quantityOrder = req.query.quantityOrder as string;
  const quantityShelf = req.query.quantityShelf as string;
  const filterObj: {
    [key: string]: string | number[];
  } = {};

  if (plu) filterObj.plu = plu;
  if (name) filterObj.name = name;
  if (shopUid) filterObj.shopUid = shopUid;
  if (quantityOrder)
    filterObj.quantityOrder = quantityOrder.split("-").map((i) => Number(i));
  if (quantityShelf)
    filterObj.quantityShelf = quantityShelf.split("-").map((i) => Number(i));
  req["filterParams"] = filterObj;
  next();
}
