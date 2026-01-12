import Branch from '@/models/Branch';
import {Request, Response} from 'express';
import mongoose from 'mongoose';

async function createBranch(req: Request, res: Response) {
  try {
    const branch = new Branch(req.body);
    const saved = await branch.save();
    console.log(req.body.name);
    console.log(req.body.store_id);
    console.log(req.body.location);
    res.status(201).json(saved);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({errors : error.errors});
    }
    res.status(500).json({message : "Internal server error"});
  }
}

async function updateBranch(req: Request, res: Response) {
  const id = req.params.id;
  let branch = await Branch.findById(id);
  const {name, store_id, location, manager_id} = req.body;

  if (!branch) {
    return res.status(404).json({error : `Branch '${id}' not found`});
  }
  if (name) {
    branch.name = name;
  }
  if (store_id) {
    branch.store_id = store_id;
  }
  if (location) {
    branch.location = location;
  }
  if (manager_id) {
    branch.manager_id = manager_id;
  }

  const saved = await branch.save();
  res.status(200).json(saved);
}

async function getAllBranches(req: Request, res: Response) {
  try {
    const branches = await Branch.find({});
    res.json(branches);
  } catch (err) {
    res.status(500).json({error : (err as Error).message});
  }
}

async function getBranchById(req: Request, res: Response) {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      return res.status(404).json({error : 'Branch not found'});
    }
    res.json(branch);
  } catch (err) {
    res.status(500).json({error : (err as Error).message});
  }
}

async function deleteBranchById(req: Request, res: Response) {
  const branch = await Branch.findByIdAndDelete(req.params.id);
  if (!branch) {
    return res.status(404).json(
        {error : `Branch '${req.params.id}' not found`});
  }
  res.json({message : 'Deleted', branch});
}

export {
  createBranch,
  updateBranch,
  getAllBranches,
  getBranchById,
  deleteBranchById
};
