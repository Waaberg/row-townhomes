# ROW Townhomes — Website

Modern Next.js site for ROW Townhomes at Exposition Drive, Loveland CO.

## Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Email:** Resend (free tier — 3k emails/month)
- **Hosting:** Vercel (free hobby tier works fine)

---

## Local Development

```bash
npm install
cp .env.example .env.local
# Fill in RESEND_API_KEY in .env.local
npm run dev
```

Open http://localhost:3000

---

## Deploy to Vercel (Step by Step)

### 1. Push to GitHub
```bash
# In this folder:
git init
git add .
git commit -m "Initial ROW Townhomes site"
# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/row-townhomes.git
git push -u origin main
```

### 2. Set up Resend (free email service)
1. Go to **resend.com** → Sign Up (free)
2. Add & verify your domain: `row2534.com`
3. Go to API Keys → Create API Key
4. Copy the key (starts with `re_`)

### 3. Deploy on Vercel
1. Go to **vercel.com** → New Project
2. Import your GitHub repo
3. Under **Environment Variables**, add:
   - Key: `RESEND_API_KEY`
   - Value: your key from step 2
4. Click **Deploy**

### 4. Point your domain
In Vercel: Project → Settings → Domains → Add `row2534.com`
Follow Vercel's DNS instructions (usually just two CNAME records).

---

## Swapping Photos

All photos live in `/public/images/`. To swap or add:
- Replace any `.jpg` file with the same filename, OR
- Add new files and update the `PHOTOS` array in `app/page.tsx`

## Adding Floor Plan Images
Place your floor plan images in `/public/images/` named:
- `floor-addison-1.png` (First Floor)
- `floor-addison-2.png` (Second Floor)
- `floor-addison-3.png` (Third Floor)
- `floor-forge-1.png`
- `floor-forge-2.png`
- `floor-forge-3.png`

Then update the floor plan section in `app/page.tsx` to use `<Image>` instead of the placeholder.

## Updating Pricing
Search `$2,795` in `app/page.tsx` — appears in 2 places (hero + floor plan section).

## Updating Email Destination
The form sends to `hello@row2534.com`. To change: edit `app/api/contact/route.ts`, line with `to: ['hello@row2534.com']`.
