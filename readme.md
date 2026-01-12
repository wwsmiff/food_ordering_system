# Foodo take-home assignment for Inventory management

## Setup:
Ensure mongodb server is running.
```
npm install
npm run dev
```

## Correct API Endpoints

Mount all routers under `/api` (e.g., `app.use('/api', itemRouter)`).

### Audit Routes (audit.ts)
- `GET /api/audit` - List recent audits
- `GET /api/audit/entity/:entityType/:entityId` - Filter by entity (Item/Variant/Store/Branch)
- `GET /api/audit/item/:itemId` - Item-specific audit history
- `GET /api/audit/variant/:variantId` - Variant change history with summary

### Items Routes (items.ts)
- `POST /api/item` - Create item
- `PUT /api/item/:id` - Update item (audits changes)
- `GET /api/item` - List items
- `GET /api/item/:id` - Get item by ID
- `DELETE /api/item/:id` - Delete item (audits deletion)

### Variants Routes (variants.ts)
- `POST /api/variant` - Create variant
- `PUT /api/variant/:id` - Update variant (audits changes)
- `GET /api/variant` - List variants
- `GET /api/variant/:id` - Get variant by ID
- `DELETE /api/variant/:id` - Delete variant (audits deletion)

### Stores Routes (stores.ts)
- `POST /api/store` - Create store
- `PUT /api/store/:id` - Update store (audits changes)
- `GET /api/store` - List stores
- `GET /api/store/:id` - Get store by ID
- `DELETE /api/store/:id` - Delete store (audits deletion)

### Branches Routes (branches.ts)
- `POST /api/branch` - Create branch
- `PUT /api/branch/:id` - Update branch (audits changes)
- `GET /api/branch` - List branches
- `GET /api/branch/:id` - Get branch by ID
- `DELETE /api/branch/:id` - Delete branch (audits deletion)
