import Audit from '@/models/Audit';
import Variant from '@/models/Variant';
import {Request, Response} from 'express';
import {Types} from 'mongoose';
import mongoose from 'mongoose';

async function createVariant(req: Request, res: Response) {
  try {
    const variant = new Variant(req.body);
    const saved = await variant.save();
    res.status(200).json(saved);
    console.log(req.body);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({errors : (err as Error).message});
    }
    res.status(500).json({message : "Internal server error"});
  }
}

async function updateVariant(req: Request, res: Response) {
  const id = req.params.id;
  const originalVariant = await Variant.findById(id);

  if (!originalVariant) {
    return res.status(404).json({error : `Variant '${id}' not found`});
  }

  const {name, item_id, selling_price, cost_price, quantity, properties} =
      req.body;
  if (name !== undefined && name !== originalVariant.name) {
    await Audit.create({
      entityType : 'Variant',
      entityId : id,
      field : 'name',
      oldValue : originalVariant.name,
      newValue : name
    });
    originalVariant.name = name;
  }
  if (selling_price !== undefined &&
      selling_price !== originalVariant.selling_price) {
    await Audit.create({
      entityType : 'Variant',
      entityId : id,
      field : 'selling_price',
      oldValue : originalVariant.selling_price,
      newValue : selling_price
    });
    originalVariant.selling_price = selling_price;
  }
  if (cost_price !== undefined && cost_price !== originalVariant.cost_price) {
    await Audit.create({
      entityType : 'Variant',
      entityId : id,
      field : 'cost_price',
      oldValue : originalVariant.cost_price,
      newValue : cost_price
    });
    originalVariant.cost_price = cost_price;
  }
  if (quantity !== undefined && quantity !== originalVariant.quantity) {
    await Audit.create({
      entityType : 'Variant',
      entityId : id,
      field : 'quantity',
      oldValue : originalVariant.quantity,
      newValue : quantity
    });
    originalVariant.quantity = quantity;
  }
  if (item_id !== undefined && item_id !== originalVariant.item_id) {
    await Audit.create({
      entityType : 'Variant',
      entityId : id,
      field : 'quantity',
      oldValue : originalVariant.item_id,
      newValue : item_id
    });
    originalVariant.item_id = item_id;
  }
  if (properties !== undefined &&
      JSON.stringify(properties) !==
          JSON.stringify(originalVariant.properties)) {
    await Audit.create({
      entityType : 'Variant',
      entityId : id,
      field : 'properties',
      oldValue : originalVariant.properties,
      newValue : properties
    });
    originalVariant.properties = properties;
  }

  const saved = await originalVariant.save();
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
  const variant = await Variant.findById(id);
  if (!variant) {
    return res.status(404).json({error : `Variant '${id}' not found.`});
  }

  await Audit.create({
    entityType : 'Variant',
    entityId : id,
    field : 'deleted',
    oldValue : {
      name : variant.name,
      item_id : variant.item_id,
      selling_price : variant.selling_price,
      cost_price : variant.cost_price,
      quantity : variant.quantity,
      properties : variant.properties
    },
    newValue : null
  });

  await Variant.findByIdAndDelete(id);
  res.json({message : 'Deleted', variant});
}

export {
  createVariant,
  updateVariant,
  getAllVariants,
  getVariantById,
  deleteVariantById
};
