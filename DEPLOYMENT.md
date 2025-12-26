# Deployment Instructions for GYST Website

## Security Notice
**IMPORTANT:** Your Retell API key is now secure! It's stored server-side and never exposed to the browser.

## Deploy to Vercel (Recommended)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add secure Retell API integration"
git push
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `robkloti/gyst-website-v2`
4. Vercel will auto-detect it's a Vite project
5. **Before deploying**, add environment variable:
   - Click "Environment Variables"
   - Add: `RETELL_API_KEY` = `key_fbab827c8478188ed676cf74892b`
   - Click "Add"
6. Click "Deploy"

### Step 3: That's it!

Vercel will:
- Build your Vite app
- Deploy the serverless API function at `/api/create-retell-call`
- Give you a live URL (e.g., `https://gyst-website-v2.vercel.app`)

## How It Works (Security)

### ❌ **Before (INSECURE)**
```
Browser → Retell API (with exposed API key)
```
Anyone could steal your API key from the browser!

### ✅ **After (SECURE)**
```
Browser → Your Vercel API → Retell API (with secret API key)
```
The API key never leaves your server!

## Local Development

To test locally:

1. Create `.env` file:
```bash
echo "RETELL_API_KEY=key_fbab827c8478188ed676cf74892b" > .env
```

2. Install Vercel CLI:
```bash
npm i -g vercel
```

3. Run locally:
```bash
vercel dev
```

This will run both your Vite app AND the API function locally.

## Troubleshooting

### Voice button doesn't work after deployment
- Check Vercel dashboard → Environment Variables
- Make sure `RETELL_API_KEY` is set
- Redeploy if you added it after first deployment

### API errors
- Check Vercel → Your Project → Functions → Logs
- Look for error messages

## Cost & Security

- ✅ Your API key is secure (never exposed to browsers)
- ✅ You control who can make calls (via your website only)
- ✅ Vercel serverless functions are free up to 100k requests/month
- ✅ You only pay Retell for actual voice calls made

## Need Help?
- Vercel Docs: https://vercel.com/docs
- Retell Docs: https://docs.retellai.com
