#!/bin/bash

# GitHub Setup Script for Sugan Website
# Usage: ./setup-github.sh YOUR_GITHUB_USERNAME

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if username is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Please provide your GitHub username${NC}"
    echo "Usage: ./setup-github.sh YOUR_GITHUB_USERNAME"
    echo ""
    echo "Example: ./setup-github.sh johndoe"
    exit 1
fi

USERNAME=$1
REPO_NAME="sugan-website"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Sugan Website - GitHub Setup Script   ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: Please run this script from the project root directory${NC}"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}Initializing Git repository...${NC}"
    git init
    git branch -m main
fi

echo -e "${YELLOW}Step 1/5: Configuring Git remote...${NC}"
# Remove existing origin if present
git remote remove origin 2>/dev/null || true
# Add new origin
git remote add origin "https://github.com/$USERNAME/$REPO_NAME.git"
echo -e "${GREEN}✓ Remote configured: https://github.com/$USERNAME/$REPO_NAME.git${NC}"
echo ""

echo -e "${YELLOW}Step 2/5: Checking for uncommitted changes...${NC}"
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}Found uncommitted changes. Committing...${NC}"
    git add .
    git commit -m "Update configuration for GitHub deployment"
    echo -e "${GREEN}✓ Changes committed${NC}"
else
    echo -e "${GREEN}✓ No uncommitted changes${NC}"
fi
echo ""

echo -e "${YELLOW}Step 3/5: Pushing to GitHub...${NC}"
echo -e "${YELLOW}Note: You may be prompted for your GitHub credentials${NC}"
echo -e "${YELLOW}If using HTTPS, use your Personal Access Token as password${NC}"
echo ""

if git push -u origin main; then
    echo -e "${GREEN}✓ Code pushed successfully!${NC}"
else
    echo -e "${RED}✗ Push failed${NC}"
    echo ""
    echo "Common issues:"
    echo "1. Repository doesn't exist on GitHub yet"
    echo "2. Authentication failed - use Personal Access Token"
    echo "3. Repository name mismatch"
    echo ""
    echo "Please create the repository first at:"
    echo "https://github.com/new"
    echo ""
    exit 1
fi
echo ""

echo -e "${YELLOW}Step 4/5: Updating Vite config...${NC}"
# Update vite.config.ts with correct base URL
sed -i "s|base: './'|base: '/$REPO_NAME/'|" vite.config.ts
git add vite.config.ts
git commit -m "Update base URL for GitHub Pages"
git push
echo -e "${GREEN}✓ Vite config updated${NC}"
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Setup Complete!                      ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "Next steps:"
echo ""
echo -e "1. ${YELLOW}Enable GitHub Pages:${NC}"
echo "   Go to: https://github.com/$USERNAME/$REPO_NAME/settings/pages"
echo "   Set Source to: GitHub Actions"
echo ""
echo -e "2. ${YELLOW}Wait for deployment:${NC}"
echo "   Check status at: https://github.com/$USERNAME/$REPO_NAME/actions"
echo ""
echo -e "3. ${YELLOW}Your website will be live at:${NC}"
echo "   https://$USERNAME.github.io/$REPO_NAME/"
echo ""
echo -e "${GREEN}Happy hosting! 🚀${NC}"
