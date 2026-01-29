#!/bin/bash

echo "🚀 Indigo Tasks - Deployment Preparation"
echo "========================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
else
    echo "✅ Git repository already initialized"
fi

# Add all files
echo "📝 Adding files to git..."
git add .

# Commit
echo "💾 Creating commit..."
git commit -m "Ready for deployment - $(date +%Y-%m-%d)"

echo ""
echo "✅ Preparation complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Create a GitHub repository"
echo "2. Run: git remote add origin YOUR_GITHUB_REPO_URL"
echo "3. Run: git push -u origin main"
echo "4. Follow DEPLOYMENT.md for Render.com setup"
echo ""
echo "🌐 MongoDB Atlas: https://www.mongodb.com/cloud/atlas"
echo "🚀 Render.com: https://render.com"
echo ""
