# Foodo take-home assignment for Inventory management

## Setup:
Ensure mongodb server is running.
```
npm install
npm run dev
```

# API Documentation
Controllers implement Items, Variants, Stores, Branches with field-level audit logging via direct Audit model writes. Mount routes under `/api`.

## Audit Endpoints

- `GET /api/audits` - List 50 recent audits
- `GET /api/audits/entity/:entityType/:entityId` - Entity change history (Item/Variant/Store/Branch)
- `GET /api/audits/item/:itemId` - Item-specific audits with change count
- `GET /api/audits/variant/:variantId` - Variant history with field summary

## Items Endpoints

- `POST /api/items` - Create item
- `PUT /api/items/:id` - Update item fields (name, brand, category, product_code, branch_id), audits changes
- `GET /api/items` - List items
- `GET /api/items/:id` - Get item by ID
- `DELETE /api/items/:id` - Delete item, audits deletion

## Variants Endpoints

- `POST /api/variants` - Create variant
- `PUT /api/variants/:id` - Update variant (name, selling_price, cost_price, quantity, properties), audits changes
- `GET /api/variants` - List variants
- `GET /api/variants/:id` - Get variant by ID
- `DELETE /api/variants/:id` - Delete variant, audits deletion

## Stores Endpoints

- `POST /api/stores` - Create store
- `PUT /api/stores/:id` - Update store (name, branch_id, location, owner_id, status), audits changes
- `GET /api/stores` - List stores
- `GET /api/stores/:id` - Get store by ID
- `DELETE /api/stores/:id` - Delete store, audits deletion

## Branches Endpoints

- `POST /api/branches` - Create branch
- `PUT /api/branches/:id` - Update branch (name, store_id, location, manager_id), audits changes
- `GET /api/branches` - List branches
- `GET /api/branches/:id` - Get branch by ID
- `DELETE /api/branches/:id` - Delete branch, audits deletion

**Audit Logging**: Updates/deletes create Audit records (entityType, entityId, field, oldValue, newValue, timestamp). Query via audit endpoints.
