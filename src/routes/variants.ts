import {Router} from 'express'

import {
  createVariant,
  deleteVariantById,
  getAllVariants,
  getVariantById,
  updateVariant
} from '../controllers/variantsController';

const variantRouter = Router();

variantRouter.post("/variant", createVariant);
variantRouter.put("/variant/:id", updateVariant);
variantRouter.get("/variant", getAllVariants);
variantRouter.get("/variant/:id", getVariantById);
variantRouter.delete("/variant/:id", deleteVariantById);

export default variantRouter;
