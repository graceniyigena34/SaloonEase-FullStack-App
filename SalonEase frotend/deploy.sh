#!/bin/bash

echo "🚀 SalonEase Deployment Script"
echo "=============================="

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "Installing EAS CLI..."
    npm install -g @expo/eas-cli
fi

# Login to Expo (if not already logged in)
echo "Checking Expo authentication..."
eas whoami || eas login

# Build for Android
echo "Building Android APK..."
eas build --platform android --profile preview

# Build for iOS (uncomment if you have Apple Developer account)
# echo "Building iOS app..."
# eas build --platform ios --profile production

echo "✅ Build complete! Check your Expo dashboard for download links."
echo "📱 Install the APK on Android devices or distribute via app stores."