# Deployment Guide

Complete guide to deploying your Hugo Saasify Theme site to production. Learn how to deploy to popular platforms and optimize for performance.

## Table of Contents

- [Building for Production](#building-for-production)
- [Platform Deployment Guides](#platform-deployment-guides)
  - [Netlify](#netlify)
  - [Vercel](#vercel)
  - [GitHub Pages](#github-pages)
  - [Cloudflare Pages](#cloudflare-pages)
  - [AWS S3 + CloudFront](#aws-s3--cloudfront)
- [Custom Server Deployment](#custom-server-deployment)
- [Environment Variables](#environment-variables)
- [Performance Optimization](#performance-optimization)
- [CI/CD Setup](#cicd-setup)
- [Post-Deployment](#post-deployment)

## Building for Production

Before deploying, build your site for production.

### Build Command

```bash
# Basic build
hugo

# Build with minification
hugo --minify

# Build with specific environment
hugo --environment production
```

### Build Output

The build creates a `public/` directory containing:
```
public/
├── index.html
├── css/
│   └── main.min.[hash].css
├── js/
│   └── main.min.[hash].js
├── images/
├── blog/
├── docs/
└── ...
```

### Pre-Deployment Checklist

- [ ] Update `baseURL` in `hugo.toml` to production URL
- [ ] Remove draft posts (`draft: false` or remove drafts)
- [ ] Test build locally: `hugo && hugo server -s public`
- [ ] Verify all links work
- [ ] Check image paths and assets
- [ ] Test responsive design
- [ ] Validate HTML/CSS
- [ ] Check analytics integration
- [ ] Review SEO meta tags
- [ ] Test performance with Lighthouse

### Environment Configuration

**Development**:
```toml
# hugo.toml
baseURL = "http://localhost:1313/"
```

**Production** (update before deploying):
```toml
# hugo.toml
baseURL = "https://yourdomain.com/"
```

## Platform Deployment Guides

### Netlify

Netlify offers automatic deployments from Git with continuous deployment.

#### Quick Deploy

1. **Push to Git**:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Connect to Netlify**:
   - Visit [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose Git provider (GitHub, GitLab, Bitbucket)
   - Select your repository

3. **Configure Build Settings**:
   - **Build command**: `hugo --minify`
   - **Publish directory**: `public`
   - **Production branch**: `main`

4. **Environment Variables** (click "Show advanced"):
   ```
   HUGO_VERSION = 0.120.0
   HUGO_ENV = production
   ```

5. **Deploy**: Click "Deploy site"

#### Netlify Configuration File

Create `netlify.toml` in project root:

```toml
[build]
  publish = "public"
  command = "hugo --minify"

[build.environment]
  HUGO_VERSION = "0.120.0"
  HUGO_ENV = "production"
  HUGO_ENABLEGITINFO = "true"

[context.production.environment]
  HUGO_ENV = "production"

[context.deploy-preview]
  command = "hugo --minify --buildFuture -b $DEPLOY_PRIME_URL"

[context.branch-deploy]
  command = "hugo --minify -b $DEPLOY_PRIME_URL"

[[redirects]]
  from = "/old-page"
  to = "/new-page"
  status = 301

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

#### Custom Domain

1. Go to **Site settings** → **Domain management**
2. Click "Add custom domain"
3. Enter your domain: `yourdomain.com`
4. Configure DNS:
   - **A Record**: Point to Netlify's load balancer IP
   - **CNAME**: Point `www` to `[your-site].netlify.app`
5. Enable HTTPS (automatic with Let's Encrypt)

### Vercel

Vercel provides zero-configuration deployments with global CDN.

#### Deploy to Vercel

1. **Install Vercel CLI** (optional):
```bash
npm install -g vercel
```

2. **Deploy via CLI**:
```bash
vercel
```

Or deploy via web interface:

3. **Connect Repository**:
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your Git repository

4. **Configure Project**:
   - **Framework Preset**: Hugo
   - **Build Command**: `hugo --minify`
   - **Output Directory**: `public`
   - **Install Command**: Leave empty

5. **Environment Variables**:
```
HUGO_VERSION=0.120.0
```

6. **Deploy**: Click "Deploy"

#### Vercel Configuration

Create `vercel.json`:

```json
{
  "build": {
    "env": {
      "HUGO_VERSION": "0.120.0"
    }
  },
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

### GitHub Pages

Free hosting directly from your GitHub repository.

#### Setup GitHub Pages

1. **Create Repository**:
   - Name: `username.github.io` (user site)
   - Or: `repository-name` (project site)

2. **Update Base URL**:
```toml
# hugo.toml
baseURL = "https://username.github.io/"
# or for project site:
baseURL = "https://username.github.io/repository-name/"
```

3. **Create GitHub Action**:

`.github/workflows/hugo.yml`:

```yaml
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.120.0
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb

      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v4

      - name: Install Node.js dependencies
        run: |
          cp themes/hugo-saasify-theme/package.json .
          cp themes/hugo-saasify-theme/postcss.config.js .
          cp themes/hugo-saasify-theme/tailwind.config.copy.js ./tailwind.config.js
          npm install

      - name: Build with Hugo
        env:
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: |
          hugo \
            --minify \
            --baseURL "${{ steps.pages.outputs.base_url }}/"

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v3
```

4. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - **Source**: GitHub Actions
   - Save

5. **Push and Deploy**:
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### Cloudflare Pages

Fast, global CDN with automatic deployments.

#### Deploy to Cloudflare Pages

1. **Connect Repository**:
   - Visit [pages.cloudflare.com](https://pages.cloudflare.com)
   - Click "Create a project"
   - Connect your Git account
   - Select repository

2. **Configure Build**:
   - **Framework preset**: Hugo
   - **Build command**: `hugo --minify`
   - **Build output directory**: `public`
   - **Root directory**: Leave blank

3. **Environment Variables**:
```
HUGO_VERSION=0.120.0
```

4. **Deploy**: Click "Save and Deploy"

#### Custom Domain

1. Go to project → **Custom domains**
2. Add your domain
3. Configure DNS (Cloudflare handles this automatically)
4. SSL/TLS is automatic

### AWS S3 + CloudFront

Enterprise-grade hosting with AWS infrastructure.

#### S3 Setup

1. **Create S3 Bucket**:
```bash
aws s3 mb s3://your-bucket-name --region us-east-1
```

2. **Enable Static Website Hosting**:
```bash
aws s3 website s3://your-bucket-name \
  --index-document index.html \
  --error-document 404.html
```

3. **Set Bucket Policy**:

Create `bucket-policy.json`:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

Apply:
```bash
aws s3api put-bucket-policy \
  --bucket your-bucket-name \
  --policy file://bucket-policy.json
```

4. **Deploy Site**:
```bash
hugo --minify
aws s3 sync public/ s3://your-bucket-name --delete
```

#### CloudFront Setup

1. **Create Distribution**:
   - Origin: Your S3 bucket
   - Viewer protocol: Redirect HTTP to HTTPS
   - Price class: Choose based on needs
   - Alternate domain names: your-domain.com
   - SSL certificate: Request from ACM

2. **Configure DNS**:
   - Add CNAME record pointing to CloudFront distribution

3. **Invalidate Cache After Deployment**:
```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

#### Deployment Script

Create `deploy.sh`:

```bash
#!/bin/bash

# Build site
echo "Building site..."
hugo --minify

# Sync to S3
echo "Uploading to S3..."
aws s3 sync public/ s3://your-bucket-name \
  --delete \
  --cache-control "max-age=3600"

# Invalidate CloudFront cache
echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"

echo "Deployment complete!"
```

Make executable:
```bash
chmod +x deploy.sh
./deploy.sh
```

## Custom Server Deployment

### Nginx

1. **Build Site**:
```bash
hugo --minify
```

2. **Upload to Server**:
```bash
rsync -avz --delete public/ user@server:/var/www/html/
```

3. **Nginx Configuration**:

`/etc/nginx/sites-available/yoursite`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

4. **Enable Site**:
```bash
sudo ln -s /etc/nginx/sites-available/yoursite /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Apache

**Apache Configuration**:

`/etc/apache2/sites-available/yoursite.conf`:

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    Redirect permanent / https://yourdomain.com/
</VirtualHost>

<VirtualHost *:443>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com

    DocumentRoot /var/www/html

    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/key.pem

    <Directory /var/www/html>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Cache static files
    <FilesMatch "\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$">
        Header set Cache-Control "max-age=31536000, public, immutable"
    </FilesMatch>

    # Compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript
    </IfModule>
</VirtualHost>
```

## Environment Variables

### Common Variables

```bash
# Hugo version
HUGO_VERSION=0.120.0

# Environment
HUGO_ENV=production

# Enable Git info
HUGO_ENABLEGITINFO=true

# Google Analytics
HUGO_GOOGLE_ANALYTICS=G-XXXXXXXXXX

# Google Tag Manager
HUGO_GOOGLE_TAG_MANAGER=GTM-XXXXXXX
```

### Platform-Specific

**Netlify** - Set in UI or `netlify.toml`
**Vercel** - Set in UI or `vercel.json`
**GitHub Actions** - Use secrets
**AWS** - Use Parameter Store or Secrets Manager

## Performance Optimization

### Build Optimization

1. **Minify Output**:
```bash
hugo --minify
```

2. **Enable Caching**:
```toml
[caches]
  [caches.images]
    dir = ":resourceDir/_gen"
    maxAge = "1440h"
```

3. **Optimize Images**:
   - Compress before uploading
   - Use WebP format
   - Implement lazy loading

### CDN Configuration

**Cache Headers**:
```nginx
# Static assets - 1 year
location ~* \.(jpg|png|css|js|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# HTML - short cache
location ~* \.html$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

### Compression

Enable gzip/brotli compression on server or CDN.

**Nginx**:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

### Performance Checklist

- [ ] Enable minification
- [ ] Optimize images (compress, WebP)
- [ ] Use CDN for static assets
- [ ] Enable HTTP/2
- [ ] Configure caching headers
- [ ] Enable gzip/brotli compression
- [ ] Lazy load images
- [ ] Minimize CSS/JS
- [ ] Use resource hints (preload, prefetch)
- [ ] Test with Lighthouse/PageSpeed

## CI/CD Setup

### GitHub Actions

Already covered in [GitHub Pages](#github-pages) section.

### GitLab CI/CD

`.gitlab-ci.yml`:

```yaml
image: registry.gitlab.com/pages/hugo/hugo_extended:latest

variables:
  GIT_SUBMODULE_STRATEGY: recursive

pages:
  script:
    - cp themes/hugo-saasify-theme/package.json .
    - cp themes/hugo-saasify-theme/postcss.config.js .
    - cp themes/hugo-saasify-theme/tailwind.config.copy.js ./tailwind.config.js
    - npm install
    - hugo --minify
  artifacts:
    paths:
      - public
  only:
    - main
```

### CircleCI

`.circleci/config.yml`:

```yaml
version: 2.1

jobs:
  build:
    docker:
      - image: cibuilds/hugo:latest
    steps:
      - checkout
      - run:
          name: Install theme dependencies
          command: |
            cp themes/hugo-saasify-theme/package.json .
            cp themes/hugo-saasify-theme/postcss.config.js .
            cp themes/hugo-saasify-theme/tailwind.config.copy.js ./tailwind.config.js
            npm install
      - run:
          name: Build site
          command: hugo --minify
      - run:
          name: Deploy
          command: |
            # Your deployment command
```

## Post-Deployment

### Verification

1. **Check Site Loads**: Visit your domain
2. **Test Navigation**: Click through all pages
3. **Verify Assets**: Images, CSS, JS loading
4. **Check Forms**: Test contact/signup forms
5. **Test Mobile**: Responsive design working
6. **Check Analytics**: Tracking installed correctly
7. **SSL Certificate**: HTTPS working
8. **Performance**: Run Lighthouse audit

### Monitoring

- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Analytics**: Google Analytics, Plausible
- **Error Tracking**: Sentry, Rollbar
- **Performance**: Lighthouse CI, SpeedCurve

### Maintenance

1. **Regular Updates**: Keep Hugo and dependencies updated
2. **Content Review**: Update outdated content
3. **Backup**: Regular backups of content and config
4. **Security**: Monitor for vulnerabilities
5. **Performance**: Regular performance audits

## Troubleshooting Deployment

### Build Fails

**Problem**: Build fails with errors

**Solutions**:
- Check Hugo version matches local
- Verify all dependencies installed
- Check for syntax errors in config
- Review build logs for specific errors

### Assets Not Loading

**Problem**: CSS/JS/Images not loading

**Solutions**:
- Verify `baseURL` is correct
- Check asset paths are absolute (`/images/...`)
- Clear browser cache
- Check CDN/server configuration

### 404 Errors

**Problem**: Pages return 404

**Solutions**:
- Verify content files exist
- Check front matter is correct
- Ensure `draft: false`
- Check URL structure

### Slow Build Times

**Problem**: Builds taking too long

**Solutions**:
- Enable caching
- Optimize images before build
- Remove unused content
- Check for infinite loops in templates

## Related Documentation

- [INSTALLATION.md](INSTALLATION.md) - Installation guide
- [CONFIGURATION.md](CONFIGURATION.md) - Configuration options
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues
- [Performance Optimization](https://gohugo.io/troubleshooting/build-performance/)

## Additional Resources

- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)
- [AWS S3 Static Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
