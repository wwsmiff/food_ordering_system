import Item from '@/models/Item';
import {Request, Response} from 'express';
import {Types} from 'mongoose';
import mongoose from 'mongoose';

async function createItem(req: Request, res: Response) {
  try {
    const item = new Item(req.body);
    const saved = await item.save();
    console.log(req.body.name);
    console.log(req.body.brand);
    console.log(req.body.category);
    console.log(req.body.product_code);
    console.log(req.body.branch_id);
    res.status(200).json(saved);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({errors : (err as Error).message});
    }
    res.status(500).json({message : "Internal server error"});
  }
}

async function updateItem(req: Request, res: Response) {
  const id = req.params.id;
  let item = await Item.findById(id);
  const {name, brand, category, product_code, branch_id} = req.body;

  if (!item) {
    return res.status(404).json({error : `Item '${id}' not found`});
  }
  if (name) {
    item.name = name;
  }
  if (brand) {
    item.brand = brand;
  }
  if (category) {
    item.category = category;
  }
  if (product_code) {
    item.product_code = product_code;
  }
  if (branch_id) {
    item.branch_id = branch_id;
  }

  const saved = await item.save();
  res.status(200).json(saved);
}

async function getAllItems(req: Request, res: Response) {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (err) {
    res.status(500).json({error : (err as Error).message});
  }
}

async function getItemById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const item = await Item.findById(id)
    res.json(item);
  } catch (err) {
    res.status(500).json({error : (err as Error).message});
  }
}

async function deleteItemById(req: Request, res: Response) {
  const id = req.params.id;
  const item = await Item.findByIdAndDelete(id);
  if (!item) {
    return res.status(404).json({error : `Item '{id}' not found.`});
  }
  res.json({message : 'Deleted', item});
}

export {createItem, updateItem, getAllItems, getItemById, deleteItemById};
