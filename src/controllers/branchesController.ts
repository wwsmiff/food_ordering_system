import Audit from '@/models/Audit';
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
      return res.status(400).json(
          {errors : (error as mongoose.Error.ValidationError).errors});
    }
    res.status(500).json({message : "Internal server error"});
  }
}

async function updateBranch(req: Request, res: Response) {
  const id = req.params.id;
  const originalBranch = await Branch.findById(id);

  if (!originalBranch) {
    return res.status(404).json({error : `Branch '${id}' not found`});
  }

  const {name, store_id, location, manager_id} = req.body;

  if (name !== undefined && name !== originalBranch.name) {
    await Audit.create({
      entityType : 'Branch',
      entityId : id,
      field : 'name',
      oldValue : originalBranch.name,
      newValue : name
    });
    originalBranch.name = name;
  }
  if (store_id !== undefined &&
      store_id !== originalBranch.store_id?.toString()) {
    await Audit.create({
      entityType : 'Branch',
      entityId : id,
      field : 'store_id',
      oldValue : originalBranch.store_id,
      newValue : store_id
    });
    originalBranch.store_id = store_id;
  }
  if (location !== undefined &&
      JSON.stringify(location) !== JSON.stringify(originalBranch.location)) {
    await Audit.create({
      entityType : 'Branch',
      entityId : id,
      field : 'location',
      oldValue : originalBranch.location,
      newValue : location
    });
    originalBranch.location = location;
  }
  if (manager_id !== undefined &&
      manager_id !== originalBranch.manager_id?.toString()) {
    await Audit.create({
      entityType : 'Branch',
      entityId : id,
      field : 'manager_id',
      oldValue : originalBranch.manager_id,
      newValue : manager_id
    });
    originalBranch.manager_id = manager_id;
  }

  const saved = await originalBranch.save();
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
  const id = req.params.id;
  const branch = await Branch.findById(id);

  if (!branch) {
    return res.status(404).json({error : `Branch '${id}' not found`});
  }

  await Audit.create({
    entityType : 'Branch',
    entityId : id,
    field : 'deleted',
    oldValue : {
      name : branch.name,
      store_id : branch.store_id,
      location : branch.location,
      manager_id : branch.manager_id
    },
    newValue : null
  });

  await Branch.findByIdAndDelete(id);
  res.json({message : 'Deleted', branch});
}

export {
  createBranch,
  updateBranch,
  getAllBranches,
  getBranchById,
  deleteBranchById
};
