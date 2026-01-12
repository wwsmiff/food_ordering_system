import Audit from '@/models/Audit';
import Store from '@/models/Store';
import {Request, Response} from 'express';
import mongoose from 'mongoose';

async function createStore(req: Request, res: Response) {
  try {
    const store = new Store(req.body);
    const saved = await store.save();
    console.log(req.body.name);
    console.log(req.body.branch_id);
    console.log(req.body.location);
    console.log(req.body.owner_id);
    res.status(201).json(saved);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json(
          {errors : (error as mongoose.Error.ValidationError).errors});
    }
    res.status(500).json({message : "Internal server error"});
  }
}

async function updateStore(req: Request, res: Response) {
  const id = req.params.id;
  const originalStore = await Store.findById(id);

  if (!originalStore) {
    return res.status(404).json({error : `Store '${id}' not found`});
  }

  const {name, branch_id, location, owner_id, status} = req.body;

  if (name !== undefined && name !== originalStore.name) {
    await Audit.create({
      entityType : 'Store',
      entityId : id,
      field : 'name',
      oldValue : originalStore.name,
      newValue : name
    });
    originalStore.name = name;
  }
  if (branch_id !== undefined &&
      branch_id !== originalStore.branch_id?.toString()) {
    await Audit.create({
      entityType : 'Store',
      entityId : id,
      field : 'branch_id',
      oldValue : originalStore.branch_id,
      newValue : branch_id
    });
    originalStore.branch_id = branch_id;
  }
  if (location !== undefined &&
      JSON.stringify(location) !== JSON.stringify(originalStore.location)) {
    await Audit.create({
      entityType : 'Store',
      entityId : id,
      field : 'location',
      oldValue : originalStore.location,
      newValue : location
    });
    originalStore.location = location;
  }
  if (owner_id !== undefined &&
      owner_id !== originalStore.owner_id?.toString()) {
    await Audit.create({
      entityType : 'Store',
      entityId : id,
      field : 'owner_id',
      oldValue : originalStore.owner_id,
      newValue : owner_id
    });
    originalStore.owner_id = owner_id;
  }
  if (status !== undefined && status !== originalStore.status) {
    await Audit.create({
      entityType : 'Store',
      entityId : id,
      field : 'status',
      oldValue : originalStore.status,
      newValue : status
    });
    originalStore.status = status;
  }

  const saved = await originalStore.save();
  res.status(200).json(saved);
}

async function getAllStores(req: Request, res: Response) {
  try {
    const stores = await Store.find({});
    res.json(stores);
  } catch (err) {
    res.status(500).json({error : (err as Error).message});
  }
}

async function getStoreById(req: Request, res: Response) {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({error : 'Store not found'});
    }
    res.json(store);
  } catch (err) {
    res.status(500).json({error : (err as Error).message});
  }
}

async function deleteStoreById(req: Request, res: Response) {
  const id = req.params.id;
  const store = await Store.findById(id);

  if (!store) {
    return res.status(404).json({error : `Store '${id}' not found`});
  }

  await Audit.create({
    entityType : 'Store',
    entityId : id,
    field : 'deleted',
    oldValue : {
      name : store.name,
      branch_id : store.branch_id,
      location : store.location,
      owner_id : store.owner_id,
      status : store.status
    },
    newValue : null
  });

  await Store.findByIdAndDelete(id);
  res.json({message : 'Deleted', store});
}

export {createStore, updateStore, getAllStores, getStoreById, deleteStoreById};
