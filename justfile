# List available recipes
default:
    @just --list

# Install dependencies
install:
    npm install

# Run the development server
run:
    npm start

# Build the site for production
build:
    npm run build

# Check the project (builds the site to verify integrity)
check: build

# Run Lighthouse CI (requires build first)
lighthouse: build
    npx @lhci/cli autorun

# Check links using lychee (requires build first)
lychee: build
    lychee --verbose --no-progress --root-dir ./public --exclude 'http://localhost' --exclude 'https://linkedin.com' --remap 'https://swiftenroll.github.io file://{{justfile_directory()}}/public' './public/**/*.html'

# Clean build artifacts
clean:
    rm -rf public resources
