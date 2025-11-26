# Security Implementation

## 🔒 What Changed

Your Kitchen Buddy app has been secured with a backend API architecture. API keys are no longer exposed to the frontend!

## Architecture

```
Frontend (Browser)
    ↓
    POST /api/analyze-image
    POST /api/search-image
    ↓
Vercel Serverless Functions (Secure Backend)
    ↓
    Calls Gemini & Unsplash APIs
    (API keys are server-side only)
    ↓
    Returns results to frontend
```

## Security Features Implemented

### ✅ 1. Protected API Keys
- API keys moved from frontend (`VITE_*` vars) to backend (serverless functions)
- Keys are never exposed in the JavaScript bundle
- Keys stay on Vercel's secure servers

### ✅ 2. Rate Limiting
- **Gemini API**: 10 requests per minute per IP
- **Unsplash API**: 20 requests per minute per IP
- Prevents API abuse and runaway costs

### ✅ 3. Input Validation
- Image size limited to ~5MB
- User preferences limited to 500 characters
- Query strings sanitized
- Invalid requests rejected before hitting external APIs

### ✅ 4. Error Handling
- Internal errors don't expose sensitive details
- Graceful degradation for image fetching
- User-friendly error messages

## Local Development

The app requires **Vercel CLI** for local development because the `/api` routes are Vercel serverless functions:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Run the app locally with API routes
vercel dev

# Or just frontend only (API calls will fail):
npm run dev
```

**Why?** Vite doesn't have a built-in backend like Next.js. Vercel CLI simulates the serverless functions locally.

## Vercel Environment Variables Setup

**IMPORTANT:** Update your Vercel environment variables:

### Old (Insecure) Variables - REMOVE THESE:
```
❌ VITE_GEMINI_API_KEY
❌ VITE_UNSPLASH_ACCESS_KEY
```

### New (Secure) Variables - ADD THESE:
```
✅ GEMINI_API_KEY (no VITE_ prefix!)
✅ UNSPLASH_ACCESS_KEY (no VITE_ prefix!)
```

### How to Update on Vercel:

1. Go to your project on Vercel dashboard
2. Settings → Environment Variables
3. **Delete** the old `VITE_*` variables
4. **Add** new variables without the `VITE_` prefix:
   - Name: `GEMINI_API_KEY`, Value: `your_key_here`
   - Name: `UNSPLASH_ACCESS_KEY`, Value: `your_key_here`
5. Set scope to: **Production, Preview, and Development**
6. Redeploy your app

## Rate Limiting Details

Current limits (can be adjusted in API files):

- **analyze-image.ts**: 10 requests/minute per IP
- **search-image.ts**: 20 requests/minute per IP

To change limits, edit these constants in the API files:
```typescript
const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute in milliseconds
```

## Testing Security

After deploying:

1. ✅ Open DevTools → Network tab
2. ✅ Generate a recipe
3. ✅ Check the requests - you should see:
   - Calls to `/api/analyze-image` and `/api/search-image`
   - **NO** calls directly to `generativelanguage.googleapis.com`
   - **NO** API keys visible anywhere

4. ✅ View page source - search for "AIza" or "generativelanguage"
   - Should find **nothing**

## Cost Protection

With rate limiting enabled:
- Max 10 Gemini requests/minute per user
- Max 600 Gemini requests/hour per user
- Each user is tracked by IP address

This prevents:
- Accidental runaway costs
- Malicious API abuse
- Quota exhaustion

## Future Enhancements

For production at scale, consider adding:

- [ ] User authentication (Clerk, Auth0)
- [ ] Database-backed rate limiting (Redis, Upstash)
- [ ] Usage quotas per user
- [ ] API key rotation
- [ ] Request logging/monitoring
- [ ] CAPTCHA for additional bot protection
- [ ] Webhook security for Vercel Edge Config

## Questions?

If you encounter issues or need to adjust security settings, the API files are in:
- `api/analyze-image.ts` - Gemini API proxy
- `api/search-image.ts` - Unsplash API proxy

