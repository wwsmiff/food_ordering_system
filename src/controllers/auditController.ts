import Audit from '@/models/Audit';
import {Request, Response} from 'express';

export async function listAudits(req: Request, res: Response) {
  try {
    const audits = await Audit.find().sort({timestamp : -1}).limit(50);
    res.json(audits);
  } catch (err) {
    res.status(500).json({error : (err as Error).message});
  }
}

export async function getEntityAudits(req: Request, res: Response) {
  try {
    const {entityType, entityId} = req.params;
    const audits =
        await Audit.find({entityType, entityId}).sort({timestamp : -1});
    res.json(audits);
  } catch (err) {
    res.status(500).json({error : (err as Error).message});
  }
}

export async function getItemAudits(req: Request, res: Response) {
  try {
    const {itemId} = req.params;
    const audits = await Audit.find({entityType : 'Item', entityId : itemId})
                       .sort({timestamp : -1})
                       .lean();
    res.json({itemId, totalChanges : audits.length, audits});
  } catch (err) {
    res.status(500).json({error : (err as Error).message});
  }
}

export async function getVariantHistory(req: Request, res: Response) {
  try {
    const {variantId} = req.params;
    const history =
        await Audit.find({entityType : 'Variant', entityId : variantId})
            .sort({timestamp : -1})
            .lean();

    const summary = history.reduce((acc: any, audit: any) => {
      const field = audit.field;
      acc[field] = acc[field] || {changes : 0, lastChange : null};
      acc[field].changes++;
      acc[field].lastChange = audit.timestamp;
      return acc;
    }, {});

    res.json({
      variantId,
      totalChanges : history.length,
      fieldSummary : summary,
      history
    });
  } catch (err) {
    res.status(500).json({error : (err as Error).message});
  }
}
