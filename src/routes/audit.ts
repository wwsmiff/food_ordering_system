import {
  getEntityAudits,
  getItemAudits,
  getVariantHistory,
  listAudits
} from '@/controllers/auditController';
import {Router} from 'express';

const auditRouter = Router();

auditRouter.get('/audits', listAudits);
auditRouter.get('/audits/entity/:entityType/:entityId', getEntityAudits);

// filter log by item
auditRouter.get('/audits/item/:itemId', getItemAudits);

// get variant history
auditRouter.get('/audits/variant/:variantId', getVariantHistory);

export default auditRouter;
