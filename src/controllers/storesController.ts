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
      return res.status(400).json({errors : error.errors});
    }
    res.status(500).json({message : "Internal server error"});
  }
}

async function updateStore(req: Request, res: Response) {
  const id = req.params.id;
  let store = await Store.findById(id);
  const {name, branch_id, location, owner_id, status} = req.body;

  if (!store) {
    return res.status(404).json({error : `Store '${id}' not found`});
  }

  if (name) {
    store.name = name;
  }
  if (branch_id) {
    store.branch_id = branch_id;
  }
  if (location) {
    store.location = location;
  }
  if (owner_id) {
    store.owner_id = owner_id;
  }
  if (status) {
    store.status = status;
  }

  const saved = await store.save();
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
  const store = await Store.findByIdAndDelete(req.params.id);
  if (!store) {
    return res.status(404).json({error : `Store '${req.params.id}' not found`});
  }
  res.json({message : 'Deleted', store});
}

export {createStore, updateStore, getAllStores, getStoreById, deleteStoreById};
