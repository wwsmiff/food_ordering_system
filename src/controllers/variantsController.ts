import Variant from '@/models/Variant';
import {Request, Response} from 'express'
import {Types} from 'mongoose';
import mongoose from 'mongoose';

async function createVariant(req: Request, res: Response) {
  try {
    const variant = new Variant(req.body);
    const saved = await variant.save();
    res.status(200).json(saved);
    console.log(req.body)
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({errors : (err as Error).message});
    }
    res.status(500).json({message : "Internal server error"});
  }
}

async function updateVariant(req: Request, res: Response) {
  const id = req.params.id;
  let variant = await Variant.findById(id);
  const {name, selling_price, cost_price, quantity, properties} = req.body;

  if (!variant) {
    return res.status(404).json({error : `Variant '${id}' not found`});
  }
  if (name) {
    variant.name = name;
  }
  if (selling_price) {
    variant.selling_price = selling_price;
  }
  if (cost_price) {
    variant.cost_price = cost_price;
  }
  if (quantity) {
    variant.quantity = quantity;
  }
  if (properties) {
    variant.properties = properties;
  }

  const saved = await variant.save();
  res.status(200).json(saved);
}

async function getAllVariants(req: Request, res: Response) {
  try {
    const variants = await Variant.find({});
    res.json(variants);
  } catch (err) {
    res.status(500).json({error : (err as Error).message});
  }
}

async function getVariantById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const variant = await Variant.findById(id);
    res.json(variant);
  } catch (err) {
    res.status(500).json({error : (err as Error).message});
  }
}

async function deleteVariantById(req: Request, res: Response) {
  const id = req.params.id;
  const variant = await Variant.findByIdAndDelete(id);
  if (!variant) {
    return res.status(404).json({error : `Variant '${id}' not found.`});
  }
  res.json({message : 'Deleted', variant});
}

export {
  createVariant,
  updateVariant,
  getAllVariants,
  getVariantById,
  deleteVariantById
};
