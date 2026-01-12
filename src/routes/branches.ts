import {Router} from 'express'

import {
  createBranch,
  deleteBranchById,
  getAllBranches,
  getBranchById,
  updateBranch
} from '../controllers/branchesController'

const branchRouter = Router();

branchRouter.post("/branch", createBranch);
branchRouter.put("/branch/:id", updateBranch);
branchRouter.get("/branch", getAllBranches);
branchRouter.get("/branch/:id", getBranchById);
branchRouter.delete("/branch/:id", deleteBranchById);

export default branchRouter;
