# Common Tasks & Playbooks

Quick reference for frequent development tasks.

## Adding a New Industry Page

**Purpose:** Create a landing page for a specific industry (e.g., dance studios, martial arts)

**Steps:**
1. Create `content/industries/new-industry.md`
2. Copy Front Matter structure from `content/industries/youth-sports-fitness.md`
3. Update Front Matter fields:
   - `title` - Industry name
   - `description` - SEO description
   - `hero_image` - Path to hero image
4. Write industry-specific content
5. Add to navigation (optional):
   ```toml
   # In hugo.toml
   [[menu.main]]
   name = "Industry Name"
   url = "/industries/new-industry/"
   weight = 40
   parent = "Solutions"
   ```

**Verify:**
- [ ] Page builds without errors
- [ ] Image loads correctly
- [ ] Navigation link works (if added)
- [ ] Mobile layout looks good

---

## Updating Pricing

**Purpose:** Change pricing tiers, features, or pricing structure

**Steps:**
1. Edit `content/pricing.md` Front Matter
2. Update pricing tier information:
   - Price amounts
   - Feature lists
   - CTA buttons
3. If changing structure, modify `layouts/partials/components/pricing-card.html`

**Verify:**
- [ ] All prices display correctly
- [ ] Feature lists are accurate
- [ ] CTA buttons link correctly
- [ ] Mobile layout works
- [ ] Lighthouse score remains above 70

---

## Changing Global Contact Info

**Purpose:** Update phone number, email, address site-wide

**Steps:**
1. Edit `hugo.toml` under `[params.company]`:
   ```toml
   [params.company]
   phone = "+1 (555) 123-4567"
   email = "hello@swiftenroll.com"
   address = "123 Main St, City, ST 12345"
   ```
2. **DO NOT** hunt-and-peck through HTML files
3. Restart dev server to see changes

**Why this works:**
- Templates reference `{{ .Site.Params.company.email }}`
- One change updates all instances

---

## Adding a New Form

**Purpose:** Create a contact form, signup form, or other input form

**Steps:**
1. Create endpoint at `submit-form.com`
2. Add endpoint to `hugo.toml`:
   ```toml
   [params.forms]
   newFormEndpoint = "https://submit-form.com/YOUR_ID"
   ```
3. Create form partial in `layouts/partials/components/form-new.html`
4. Copy structure from `layouts/partials/components/form-contact.html`
5. Update form fields and endpoint reference
6. Include Turnstile widget for anti-spam
7. Include honeypot field

**Verify:**
- [ ] Form displays correctly
- [ ] Turnstile loads
- [ ] Test submission works
- [ ] Validation functions (required fields)

---

## Updating Navigation Menu

**Purpose:** Add, remove, or reorder navigation items

**Steps:**
1. Edit `hugo.toml` -> `[[menu.main]]` sections
2. Menu item structure:
   ```toml
   [[menu.main]]
   name = "Display Name"
   url = "/path/to/page/"
   weight = 10  # Lower numbers appear first
   parent = ""  # Optional: for dropdown menus
   ```
3. Adjust `weight` values to reorder items
4. Restart dev server

**Dropdown menus:**
```toml
# Parent item
[[menu.main]]
name = "Solutions"
url = "#"
weight = 20

# Child items
[[menu.main]]
name = "Youth Sports"
url = "/industries/youth-sports/"
weight = 21
parent = "Solutions"
```

---

## Adding a New Page Type

**Purpose:** Create a new type of page with custom layout (e.g., case studies)

**Steps:**
1. Create layout directory: `layouts/case-studies/`
2. Create `layouts/case-studies/single.html` (for individual pages)
3. Create `layouts/case-studies/list.html` (for listing pages)
4. Create content: `content/case-studies/example.md`
5. Set `type` in Front Matter:
   ```yaml
   ---
   title: "Case Study Title"
   type: case-studies
   ---
   ```

**Verify:**
- [ ] Layout renders correctly
- [ ] Content displays properly
- [ ] Navigation works

---

## Optimizing Images

**Purpose:** Reduce image file sizes for better performance

**Steps:**
1. **For processed images:**
   - Place in `assets/images/`
   - Use Hugo image processing in templates:
     ```go
     {{ $image := resources.Get "images/hero.jpg" }}
     {{ $resized := $image.Resize "1200x webp q85" }}
     <img src="{{ $resized.RelPermalink }}" alt="Description">
     ```

2. **For static images:**
   - Manually optimize before adding to `static/images/`
   - Use tools: ImageOptim, Squoosh, TinyPNG
   - Target size: < 500KB per image

**Verify:**
- [ ] Image quality acceptable
- [ ] File size reduced
- [ ] Lighthouse performance score maintained

---

## Adding Analytics Events

**Purpose:** Track custom events in Google Analytics

**Steps:**
1. Add `data-` attributes to elements:
   ```html
   <button 
     data-event="click"
     data-category="CTA"
     data-label="Demo Request">
     Request Demo
   </button>
   ```
2. Event tracking is handled by GA4 configuration
3. No custom JavaScript needed for basic events

---

## Testing Form Submissions

**Purpose:** Verify forms work without spamming production endpoint

**Steps:**
1. Copy `.env.example` to `.env`
2. Set form endpoints to empty strings:
   ```bash
   HUGO_PARAMS_FORMS_CONTACTENDPOINT=""
   HUGO_PARAMS_FORMS_DEMOENDPOINT=""
   ```
3. Restart dev server
4. Forms will show "Development Mode" warning
5. Submission will be blocked (not sent)

**Production testing:**
1. Use a test email address
2. Submit through staging/preview deployment
3. Verify email arrives at endpoint service

---

## Changing Color Scheme

**Purpose:** Update brand colors site-wide

**Steps:**
1. Edit `tailwind.config.js`:
   ```js
   colors: {
     primary: {
       50: '#f0f0ff',
       // ... other shades
       900: '#1a1a40',
     },
   }
   ```
2. Rebuild CSS: `npm run build:css`
3. Restart dev server

**DO NOT:**
- Hardcode colors in HTML (`bg-[#1F1C4E]`)
- Use inline styles

**DO:**
- Use semantic names (`bg-primary-600`)
- Update config once, changes apply everywhere

---

## Adding Social Media Links

**Purpose:** Add or update social media profiles

**Steps:**
1. Edit `hugo.toml` -> `[params.social]`:
   ```toml
   [params.social]
   twitter = "SwiftEnroll"
   facebook = "SwiftEnroll"
   linkedin = "company/swiftenroll"
   instagram = "swiftenroll"
   ```
2. Footer automatically displays configured social links
3. Social meta tags automatically use Twitter handle

---

## Troubleshooting Build Failures

**Build fails with "executable file not found":**
```bash
# Install Hugo Extended
brew install hugo  # macOS
# or download from https://github.com/gohugoio/hugo/releases
```

**Styles not applying:**
```bash
# Rebuild CSS
npm run build:css

# Check if file exists
ls -lh static/css/style.css
```

**Template errors:**
```bash
# Run with verbose output
hugo --verbose

# Check for syntax errors in layouts/
```

**Image processing errors:**
```bash
# Ensure Hugo Extended is installed
hugo version  # Should show "extended"
```

---

**Last Updated:** 2026-02-15
