# Strapi Production Environment Variables Checklist (Render)

## Database (Use Render's internal connection string or create a separate PostgreSQL)
DATABASE_CLIENT=postgres
DATABASE_URL=
NODE_ENV=production

## Security (Generate these with 'openssl rand -base64 32')
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=
JWT_SECRET=
