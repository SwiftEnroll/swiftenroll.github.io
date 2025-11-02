# Installation Guide

Complete guide to installing and setting up the Hugo Saasify Theme for your SaaS website.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
  - [Method 1: New Site](#method-1-new-site)
  - [Method 2: Existing Site](#method-2-existing-site)
  - [Method 3: Manual Installation](#method-3-manual-installation)
- [Initial Configuration](#initial-configuration)
- [Verifying Installation](#verifying-installation)
- [Next Steps](#next-steps)
- [Updating the Theme](#updating-the-theme)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before installing the Hugo Saasify Theme, ensure you have the following installed on your system:

### Required Software

1. **Hugo Extended** (v0.80.0 or later)
   - The theme requires Hugo Extended edition for Tailwind CSS processing
   - Download from [Hugo Releases](https://github.com/gohugoio/hugo/releases)
   - Verify installation: `hugo version`
   - Expected output should include "extended"

2. **Git** (latest version recommended)
   - Required for theme installation and updates
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify installation: `git --version`

3. **Node.js and npm** (v14.0.0 or later)
   - Required for Tailwind CSS compilation
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` and `npm --version`

### System Requirements

- Operating System: Windows, macOS, or Linux
- Disk Space: At least 100MB free
- Internet Connection: Required for initial setup and dependencies

### Recommended Tools

- Code editor (VS Code, Sublime Text, or similar)
- Terminal/Command line familiarity
- Basic understanding of Hugo and Markdown

## Installation Methods

Choose the installation method that best fits your use case.

### Method 1: New Site

This is the recommended method if you're starting a new project from scratch.

#### Step 1: Create a New Hugo Site

```bash
# Create a new Hugo site
hugo new site my-saas-website

# Navigate into the new site directory
cd my-saas-website
```

#### Step 2: Initialize Git Repository

```bash
# Initialize git repository
git init

# Create initial commit
git add .
git commit -m "Initial commit"
```

#### Step 3: Add the Theme as a Git Submodule

```bash
# Add theme as submodule
git submodule add https://github.com/chaoming/hugo-saasify-theme.git themes/hugo-saasify-theme

# Update submodule
git submodule update --init --recursive
```

#### Step 4: Example Site (Optional)

The theme comes with a fully functional example site that demonstrates its features and capabilities. You can use this as a reference when building your own site.

##### Using the Example Site

The example site provides a great starting point to understand how to:

- Structure your content
- Use different page layouts
- Configure navigation menus
- Set up site parameters
- Implement common SaaS website features

1. Copy the example site content:

```bash
cp -r themes/hugo-saasify-theme/exampleSite/* .
```

The example site includes:

- Complete content structure with sample pages
- Blog posts with various layouts
- Feature pages
- Career/Jobs section
- Pricing page
- Company information page
- Properly configured hugo.toml

#### Step 5: Install Dependencies

```bash
# Copy package.json and other config files to your site root
cp themes/hugo-saasify-theme/package.json .
cp themes/hugo-saasify-theme/postcss.config.js .
cp themes/hugo-saasify-theme/tailwind.config.copy.js ./tailwind.config.js
```

```bash
# Install dependencies
npm install
```

#### Step 6: Set the theme in hugo.toml

Open your `hugo.toml` and check that the theme is correctly set:

```toml
# Theme Configuration
theme = "hugo-saasify-theme"
```

#### Step 7: Start Development Server

```bash
# Start development server (builds TailwindCSS and runs Hugo server)
npm run start

# Your site will be available at http://localhost:1313
```

### Method 2: Existing Site

If you already have a Hugo site and want to add the Saasify theme.

#### Step 1: Add Theme as Submodule

```bash
# From your site root directory
git submodule add https://github.com/chaoming/hugo-saasify-theme.git themes/hugo-saasify-theme

# Update submodule
git submodule update --init --recursive
```

#### Step 2: Update Configuration

Add or update the following in your `hugo.toml`:

```toml
theme = "hugo-saasify-theme"

# Required Features
pygmentsCodeFences = true
pygmentsUseClasses = true
enableEmoji = true
enableGitInfo = true

# Required Module Configuration
[module]
  [module.hugoVersion]
    extended = true
    min = "0.80.0"

# Required Build Configuration
[build]
  writeStats = true

# Required Markup Configuration
[markup]
  [markup.highlight]
    noClasses = false
    lineNos = true
    codeFences = true
  [markup.goldmark.renderer]
    unsafe = true
  [markup.tableOfContents]
    endLevel = 3
    ordered = false
    startLevel = 2
```

#### Step 3: Install Theme Dependencies

```bash
# Copy package.json and other config files to your site root
cp themes/hugo-saasify-theme/package.json .
cp themes/hugo-saasify-theme/postcss.config.js .
cp themes/hugo-saasify-theme/tailwind.config.copy.js ./tailwind.config.js

# Install dependencies
npm install
```

#### Step 4: Configure Theme Settings

Copy relevant configuration from the example site:

```bash
# View example configuration for reference
cat themes/hugo-saasify-theme/exampleSite/hugo.toml
```

Merge the configuration settings into your existing `hugo.toml`. See [CONFIGURATION.md](CONFIGURATION.md) for detailed options.

#### Step 5: Test the Theme

```bash
# Start development server
npm run start
```

### Method 3: Manual Installation

For users who prefer not to use Git submodules or need more control over the installation.

#### Step 1: Download Theme

```bash
# Download and extract theme
curl -L https://github.com/chaoming/hugo-saasify-theme/archive/refs/heads/main.zip -o theme.zip
unzip theme.zip
mv hugo-saasify-theme-main themes/hugo-saasify-theme
rm theme.zip
```

Alternatively, download the ZIP file from GitHub and extract it manually to `themes/hugo-saasify-theme`.

#### Step 2: Install Dependencies

```bash
# Copy package.json and other config files to your site root
cp themes/hugo-saasify-theme/package.json .
cp themes/hugo-saasify-theme/postcss.config.js .
cp themes/hugo-saasify-theme/tailwind.config.copy.js ./tailwind.config.js

# Install dependencies
npm install
```

#### Step 3: Configure Hugo

Update your `hugo.toml` to reference the theme:

```toml
theme = "hugo-saasify-theme"
```

Add all required configuration settings from the example site.

#### Step 4: Verify Installation

```bash
# Check theme is recognized
hugo config

# Start development server
npm run start
```

## Initial Configuration

After installing the theme, configure the essential settings.

### Basic Configuration

Edit your `hugo.toml` file:

```toml
# Basic Configuration
baseURL = "/"
languageCode = "en-us"
title = "Your Site Title"
theme = "hugo-saasify-theme"

# Required Features
pygmentsCodeFences = true  # Enable syntax highlighting
pygmentsUseClasses = true
enableEmoji = true        # Enable emoji support
enableGitInfo = true      # Enable Git info for lastmod

# Required Module Configuration
[module]
  [module.hugoVersion]
    extended = true
    min = "0.80.0"

# Required Build Configuration
[build]
  writeStats = true      # Required for TailwindCSS

# Required Markup Configuration
[markup]
  [markup.highlight]
    noClasses = false
    lineNos = true
    codeFences = true
  [markup.goldmark.renderer]
    unsafe = true       # Allow HTML in markdown
  [markup.tableOfContents]
    endLevel = 3
    ordered = false
    startLevel = 2

# Theme Parameters
[params]
  description = "Your site description"
  author = "Your Name"
  logo = "/images/logo.svg"
```

### Tailwind CSS Setup

The theme uses Tailwind CSS for styling. The build process is integrated into Hugo.

During installation, you should have copied the Tailwind configuration file:

- `tailwind.config.js` - Copied from `themes/hugo-saasify-theme/tailwind.config.copy.js` to your site root
- `postcss.config.js` - PostCSS configuration in your site root
- Dependencies installed via `npm install`

The `npm run start` command automatically watches and compiles Tailwind CSS during development.

### Menu Configuration

Add your navigation menu to `hugo.toml`:

```toml
[menu]
  [[menu.main]]
    name = "Features"
    weight = 1
    [menu.main.params]
      has_submenu = true
      submenu = [
        { name = "Feature 1", url = "/features/feature-1/" },
        { name = "Feature 2", url = "/features/feature-2/" }
      ]

  [[menu.main]]
    name = "Pricing"
    url = "/pricing"
    weight = 2

  [[menu.main]]
    name = "Blog"
    url = "/blog"
    weight = 3
```

See [CONFIGURATION.md](CONFIGURATION.md) for complete menu options.

## Verifying Installation

### Check Hugo Version

```bash
hugo version
```

Expected output should include "extended" and version 0.80.0 or higher.

### Check Theme Files

```bash
# Verify theme directory structure
ls -la themes/hugo-saasify-theme/

# Should show:
# - layouts/
# - assets/
# - static/
# - exampleSite/
# - package.json
# - tailwind.config.js
```

### Test Development Server

```bash
# Start server
npm run start

# Check for errors in terminal
# Visit http://localhost:1313 in browser
```

### Verify Build Output

```bash
# Build site
hugo

# Check public directory was created
ls public/

# Should contain:
# - index.html
# - css/
# - js/
# - images/
```

## Development Workflow

### Starting the Development Server

To start the development server with live reload and TailwindCSS compilation:

```bash
npm run start
```

This will:

- Watch for changes in your TailwindCSS styles
- Run the Hugo development server
- Automatically rebuild when changes are detected
- Serve your site at <http://localhost:1313>

### Building for Production

To build your site for production:

```bash
npm run build
```

This will:

- Build and minify your TailwindCSS styles
- Generate minified Hugo site in the `public` directory

## Next Steps

After successful installation:

1. **Customize Configuration**: Review [CONFIGURATION.md](CONFIGURATION.md) for all available options
2. **Create Content**: Learn about content creation in [CONTENT-CREATION.md](CONTENT-CREATION.md)
3. **Customize Styling**: See [STYLING.md](STYLING.md) for theme customization
4. **Add Pages**: Use available layouts documented in [LAYOUTS.md](LAYOUTS.md)
5. **Use Shortcodes**: Explore components in [SHORTCODES.md](SHORTCODES.md)
6. **Deploy**: Follow deployment guides in [DEPLOYMENT.md](DEPLOYMENT.md)

## Updating the Theme

### For Git Submodule Installations

```bash
# Update to latest version
git submodule update --remote themes/hugo-saasify-theme

# If there are npm dependency updates, copy the updated files
cp themes/hugo-saasify-theme/package.json .
cp themes/hugo-saasify-theme/postcss.config.js .
cp themes/hugo-saasify-theme/tailwind.config.copy.js ./tailwind.config.js
npm install

# Commit the update
git add themes/hugo-saasify-theme
git commit -m "Update hugo-saasify-theme"
```

### For Manual Installations

```bash
# Backup your current theme (if you made custom changes)
cp -r themes/hugo-saasify-theme themes/hugo-saasify-theme-backup

# Download latest version
curl -L https://github.com/chaoming/hugo-saasify-theme/archive/refs/heads/main.zip -o theme.zip
unzip theme.zip
rm -rf themes/hugo-saasify-theme
mv hugo-saasify-theme-main themes/hugo-saasify-theme
rm theme.zip

# Copy updated config files and install dependencies
cp themes/hugo-saasify-theme/package.json .
cp themes/hugo-saasify-theme/postcss.config.js .
cp themes/hugo-saasify-theme/tailwind.config.copy.js ./tailwind.config.js
npm install
```

### Update Best Practices

1. **Always backup** before updating
2. **Review changelog** for breaking changes
3. **Test locally** before deploying updates
4. **Check configuration** for new options
5. **Update dependencies** after theme updates

### Version Pinning

To pin to a specific version using Git submodule:

```bash
cd themes/hugo-saasify-theme
git checkout v1.0.0  # Replace with desired version tag
cd ../..
git add themes/hugo-saasify-theme
git commit -m "Pin theme to v1.0.0"
```

## Troubleshooting

### Theme Not Found

**Problem**: Hugo can't find the theme

**Solution**:
```bash
# Check theme directory exists
ls themes/

# Verify theme name in hugo.toml matches directory name
grep "^theme" hugo.toml

# Should output: theme = "hugo-saasify-theme"
```

### Extended Version Error

**Problem**: Error about Hugo Extended being required

**Solution**:
```bash
# Check Hugo version includes "extended"
hugo version

# If not extended, download extended version from:
# https://github.com/gohugoio/hugo/releases
```

### CSS Not Loading

**Problem**: Site loads without styling

**Solution**:
```bash
# Ensure build stats are enabled in hugo.toml
[build]
  writeStats = true

# Ensure theme dependencies are installed in site root
cp themes/hugo-saasify-theme/package.json .
cp themes/hugo-saasify-theme/postcss.config.js .
cp themes/hugo-saasify-theme/tailwind.config.copy.js ./tailwind.config.js
npm install

# Clear Hugo cache
hugo --gc

# Rebuild and start server
npm run start
```

### Submodule Empty

**Problem**: Theme directory exists but is empty

**Solution**:
```bash
# Initialize and update submodules
git submodule init
git submodule update --recursive

# If still empty, remove and re-add
git submodule deinit -f themes/hugo-saasify-theme
rm -rf .git/modules/themes/hugo-saasify-theme
git rm -f themes/hugo-saasify-theme
git submodule add https://github.com/chaoming/hugo-saasify-theme.git themes/hugo-saasify-theme
```

### npm Dependencies Error

**Problem**: npm install fails

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall in site root
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

**Problem**: Hugo server won't start due to port conflict

**Solution**:
```bash
# Use different port (modify package.json start script to add --port flag)
# Or find and kill process using port 1313
lsof -ti:1313 | xargs kill -9  # macOS/Linux
# For Windows, use: netstat -ano | findstr :1313

# Then restart
npm run start
```

For more troubleshooting help, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or visit the [GitHub Issues](https://github.com/chaoming/hugo-saasify-theme/issues) page.

## Getting Help

If you encounter issues not covered in this guide:

1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Review [example site configuration](../exampleSite/)
3. Search [GitHub Issues](https://github.com/chaoming/hugo-saasify-theme/issues)
4. Create a new issue with:
   - Hugo version (`hugo version`)
   - Operating system
   - Error messages
   - Steps to reproduce

## Additional Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Theme Repository](https://github.com/chaoming/hugo-saasify-theme)
- [Demo Site](https://saasify-demo.chaoming.li)
