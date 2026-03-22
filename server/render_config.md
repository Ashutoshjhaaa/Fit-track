# Strapi Production Environment Variables (Render)

Copy these exactly into Render's Environment Variable settings.

| Key | Value |
| :--- | :--- |
| **DATABASE_CLIENT** | `postgres` |
| **DATABASE_URL** | `postgresql://neondb_owner:npg_Vyzt94TFGmSw@ep-dry-mouse-adih3vei-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` |
| **NODE_ENV** | `production` |
| **APP_KEYS** | `j8H5n2K9L4m1P7q3,z6X4v2B1N9M0K8L7` |
| **API_TOKEN_SALT** | `y3R6t9W2e5Q1iP0o` |
| **ADMIN_JWT_SECRET** | `L9k2J5h8G1f4S7d3` |
| **TRANSFER_TOKEN_SALT** | `V6c3X9z2B7n5M1m0` |
| **JWT_SECRET** | `A8s5D2f1G4h7J9k3` |

---

### Step-by-Step for Render Backend:
1. Go to [Render Dashboard](https://dashboard.render.com).
2. Click **New** > **Web Service**.
3. Select your GitHub repository.
4. Set **Root Directory** to `server`.
5. Set **Build Command**: `npm install && npm run build`.
6. Set **Start Command**: `npm run start`.
7. Paste the environment variables above into the **Environment** section.
8. Click **Create Web Service**.
