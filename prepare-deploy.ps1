# 🚀 Indigo Tasks - Deployment Preparation
# ==========================================

Write-Host "🚀 Indigo Tasks - Deployment Preparation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path .git)) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
} else {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
}

# Add all files
Write-Host "📝 Adding files to git..." -ForegroundColor Yellow
git add .

# Commit
$date = Get-Date -Format "yyyy-MM-dd HH:mm"
Write-Host "💾 Creating commit..." -ForegroundColor Yellow
git commit -m "Ready for deployment - $date"

Write-Host ""
Write-Host "✅ Preparation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Create a GitHub repository" -ForegroundColor White
Write-Host "2. Run: git remote add origin YOUR_GITHUB_REPO_URL" -ForegroundColor White
Write-Host "3. Run: git push -u origin main" -ForegroundColor White
Write-Host "4. Follow DEPLOYMENT.md for Render.com setup" -ForegroundColor White
Write-Host ""
Write-Host "🌐 MongoDB Atlas: https://www.mongodb.com/cloud/atlas" -ForegroundColor Magenta
Write-Host "🚀 Render.com: https://render.com" -ForegroundColor Magenta
Write-Host ""
Write-Host "📱 PWA Features:" -ForegroundColor Cyan
Write-Host "- Install app on mobile/desktop" -ForegroundColor White
Write-Host "- Offline support" -ForegroundColor White
Write-Host "- Fast loading" -ForegroundColor White
Write-Host ""
