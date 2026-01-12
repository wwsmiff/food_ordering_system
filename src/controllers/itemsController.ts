import Audit from '@/models/Audit';
import Item from '@/models/Item';
import {Request, Response} from 'express';
import {Types} from 'mongoose';
import mongoose from 'mongoose';

async function createItem(req: Request, res: Response) {
  try {
    const item = new Item(req.body);
    const saved = await item.save();
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
  const originalItem = await Item.findById(id);

  if (!originalItem) {
    return res.status(404).json({error : `Item '${id}' not found`});
  }

  const {name, brand, category, product_code, branch_id} = req.body;

  if (name !== undefined && name !== originalItem.name) {
    await Audit.create({
      entityType : 'Item',
      entityId : id,
      field : 'name',
      oldValue : originalItem.name,
      newValue : name
    });
    originalItem.name = name;
  }
  if (brand !== undefined && brand !== originalItem.brand) {
    await Audit.create({
      entityType : 'Item',
      entityId : id,
      field : 'brand',
      oldValue : originalItem.brand,
      newValue : brand
    });
    originalItem.brand = brand;
  }
  if (category !== undefined && category !== originalItem.category) {
    await Audit.create({
      entityType : 'Item',
      entityId : id,
      field : 'category',
      oldValue : originalItem.category,
      newValue : category
    });
    originalItem.category = category;
  }
  if (product_code !== undefined &&
      product_code !== originalItem.product_code) {
    await Audit.create({
      entityType : 'Item',
      entityId : id,
      field : 'product_code',
      oldValue : originalItem.product_code,
      newValue : product_code
    });
    originalItem.product_code = product_code;
  }
  if (branch_id !== undefined &&
      branch_id !== originalItem.branch_id?.toString()) {
    await Audit.create({
      entityType : 'Item',
      entityId : id,
      field : 'branch_id',
      oldValue : originalItem.branch_id,
      newValue : branch_id
    });
    originalItem.branch_id = branch_id;
  }

  const saved = await originalItem.save();
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
    const item = await Item.findById(id);
    res.json(item);
  } catch (err) {
    res.status(500).json({error : (err as Error).message});
  }
}

async function deleteItemById(req: Request, res: Response) {
  const id = req.params.id;
  const item = await Item.findByIdAndDelete(id);
  if (!item) {
    return res.status(404).json({error : `Item '${id}' not found.`});
  }
  res.json({message : 'Deleted', item});
}

export {createItem, updateItem, getAllItems, getItemById, deleteItemById};
