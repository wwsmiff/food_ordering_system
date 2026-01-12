import {
  getEntityAudits,
  getItemAudits,
  getVariantHistory,
  listAudits
} from '@/controllers/auditController';
import {Router} from 'express';

const auditRouter = Router();

auditRouter.get('/audit', listAudits);
auditRouter.get('/audit/entity/:entityType/:entityId', getEntityAudits);

// filter log by item
auditRouter.get('/audit/item/:itemId', getItemAudits);

// get variant history
auditRouter.get('/audit/variant/:variantId', getVariantHistory);

export default auditRouter;
