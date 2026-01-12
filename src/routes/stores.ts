import {Router} from 'express'

import {
  createStore,
  deleteStoreById,
  getAllStores,
  getStoreById,
  updateStore
} from '../controllers/storesController'

const storeRouter = Router();

storeRouter.post("/store", createStore);
storeRouter.put("/store/:id", updateStore);
storeRouter.get("/store", getAllStores);
storeRouter.get("/store/:id", getStoreById);
storeRouter.delete("/store/:id", deleteStoreById);

export default storeRouter;
