# Development Workflow

## Standard Workflow

### 1. Analysis Phase
**Before making any changes:**
- Read `hugo.toml` to understand current configuration
- Review existing `layouts/` to understand patterns
- Check `/docs` for relevant documentation
- Identify files that will be affected

### 2. Content-First Approach

**Adding a new page:**
1. Create `content/path/to/page.md`
2. Add Front Matter (copy from similar page)
3. Write content in Markdown
4. Choose or create appropriate layout

**Editing existing page:**
1. Locate Markdown file in `content/`
2. Edit Front Matter or content
3. Verify changes in dev server

### 3. Layout/Template Changes

**Assigning a layout:**
- Set `type` or `layout` in Front Matter
- Hugo will use layout from `layouts/{type}/` or `layouts/_default/`

**Creating new layout:**
1. Determine if it's a page type or component
2. Place in `layouts/{type}/` or `layouts/partials/components/`
3. Follow existing template patterns
4. Use semantic HTML

### 4. Styling

**Applying Tailwind:**
1. Use utility classes in HTML/templates
2. Follow mobile-first approach (start small, add breakpoints)
3. Use semantic color names from config

**Custom CSS (rare):**
1. Only if truly necessary (e.g., unique animations)
2. Add to `assets/css/main.css`
3. Document why custom CSS is needed

### 5. Verification

**Local testing:**
```bash
npm start  # Runs dev server at http://localhost:1313
```

**Check both:**
- Mobile view (< 450px width)
- Desktop view (> 1280px width)

**Verify:**
- Layout works at all breakpoints
- Images load and have alt text
- Links work
- Forms function correctly

### 6. Build & Test

```bash
npm run build        # Production build
just lychee          # Link checking
just lighthouse      # Performance testing
```

### 7. Commit

**Message format:**
```
type: short description

Optional longer explanation if needed
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Maintenance tasks

## Local Development Setup

### First Time Setup
```bash
# 1. Install dependencies
npm install

# 2. (Optional) Configure local environment
cp .env.example .env
# Edit .env to disable form submissions locally
```

### Daily Development
```bash
# Start dev server (auto-reload)
npm start
```

Server runs at `http://localhost:1313` with:
- Hugo in watch mode (rebuilds on file changes)
- Tailwind in watch mode (recompiles CSS on changes)

## Common Development Tasks

### Update Site Configuration
1. Edit `hugo.toml`
2. Restart dev server (`npm start`)
3. Verify changes

### Add Menu Item
1. Edit `hugo.toml` -> `[[menu.main]]`
2. Add new menu entry
3. Restart dev server

### Change Company Info
1. Edit `hugo.toml` -> `[params.company]`
2. Changes apply site-wide
3. No template editing needed

### Add Form Endpoint
1. Edit `hugo.toml` -> `[params.forms]`
2. Add new endpoint URL
3. Update form partial to use new endpoint

## Environment Variables

### Supported Overrides
Hugo allows environment variable overrides with `HUGO_PARAMS_` prefix:

```bash
# Disable form submissions locally
export HUGO_PARAMS_FORMS_CONTACTENDPOINT=""
export HUGO_PARAMS_FORMS_DEMOENDPOINT=""
export HUGO_PARAMS_FORMS_SUBSCRIBEENDPOINT=""
```

### Using .env File
1. Copy `.env.example` to `.env`
2. Set variables in `.env`
3. `.env` is git-ignored (never commit)

## Debugging

### Build Issues
```bash
# Verbose build output
hugo --verbose

# Check Hugo version
hugo version
```

### Styling Issues
```bash
# Rebuild Tailwind CSS
npm run build

# Check generated CSS
ls -lh static/css/style.css
```

### Template Issues
```bash
# Check template syntax
hugo --verbose
```

Look for template error messages in output.

### Performance Issues
```bash
# Run Lighthouse
just lighthouse

# Check image sizes
find static/images -type f -size +500k
```

## Branch Strategy

### Working Branch
- Create feature branch from `main`
- Name: `feature/descriptive-name` or `fix/issue-description`

### Before PR
- [ ] All tests pass (`npm run build`, `just lychee`, `just lighthouse`)
- [ ] Code is formatted
- [ ] Commits are clean
- [ ] Documentation updated if needed

### PR Review
- Explain **why** change was made
- Include screenshots for UI changes
- Confirm testing completed

## IDE Setup

### Recommended Extensions
- **Hugo Language and Syntax Support**
- **Tailwind CSS IntelliSense**
- **Markdown All in One**
- **EditorConfig** (respects `.editorconfig`)

### Workspace Settings
```json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "files.associations": {
    "*.html": "html",
    "*.toml": "toml"
  }
}
```

---

**Last Updated:** 2026-02-15
