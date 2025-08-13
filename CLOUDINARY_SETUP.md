# Cloudinary Setup Guide

## Why Cloudinary?

Cloudinary provides reliable file upload and storage, which helps avoid issues with file processing in serverless environments like Vercel.

## Setup Steps

### 1. Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Go to your Dashboard

### 2. Get Your Credentials
From your Cloudinary Dashboard, copy:
- **Cloud Name**
- **API Key** 
- **API Secret**

### 3. Update Environment Variables
Add these to your `.env` file:

```env
# Cloudinary for file uploads
CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
CLOUDINARY_API_KEY=your-actual-api-key
CLOUDINARY_API_SECRET=your-actual-api-secret
```

### 4. Test the Upload
1. Start your development server: `npm run dev`
2. Go to the dashboard and try uploading a resume
3. The app will first try Cloudinary upload, then fallback to direct upload if needed

## Benefits of Using Cloudinary

1. **Reliable File Storage**: Files are stored securely in the cloud
2. **Better Error Handling**: Avoids file system issues in serverless environments
3. **Scalability**: Can handle large files and high traffic
4. **Backup**: Your uploaded files are safely stored

## Fallback System

The app is configured with a fallback system:
1. **Primary**: Tries Cloudinary upload first (`/api/upload-resume-cloudinary`)
2. **Fallback**: If Cloudinary fails, uses direct processing (`/api/upload-resume`)

This ensures your app works even if Cloudinary is not configured.

## File Limits

- **File Size**: 10MB maximum
- **File Types**: PDF and DOCX only
- **Storage**: Files are stored in the `resumes/` folder in your Cloudinary account

## Troubleshooting

### Common Issues:
1. **Invalid credentials**: Double-check your Cloud Name, API Key, and API Secret
2. **Upload fails**: Check your Cloudinary account limits and usage
3. **File too large**: Ensure files are under 10MB

### Debug Mode:
Check the browser console and server logs for detailed error messages during upload.