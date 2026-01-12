import {Router} from 'express'

import {
  createItem,
  deleteItemById,
  getAllItems,
  getItemById,
  updateItem
} from '../controllers/itemsController';

const itemRouter = Router();

itemRouter.post("/item", createItem);
itemRouter.put("/item/:id", updateItem);
itemRouter.get("/item", getAllItems);
itemRouter.get("/item/:id", getItemById);
itemRouter.delete("/item/:id", deleteItemById);

export default itemRouter;
