# Video Upload Guide for Sugan Products

## Overview

You can add product videos to showcase your items. Videos will appear in the product image gallery.

---

## Step 1: Prepare Your Video

### Recommended Specifications
| Property | Recommendation |
|----------|---------------|
| **Format** | MP4 (H.264 codec) |
| **Resolution** | 1080p (1920x1080) or 720p (1280x720) |
| **Aspect Ratio** | 16:9 or 1:1 (square) |
| **Duration** | 10-60 seconds ideal |
| **File Size** | Max 50MB for fast loading |
| **Frame Rate** | 30fps |

### Video Content Tips
- Show the product from multiple angles
- Demonstrate key features (e.g., detachable bowls for pet feeders)
- Show the product in use (pet eating from feeder)
- Keep background clean and well-lit
- Use natural lighting when possible

---

## Step 2: Name Your Video File

Use the same naming convention as images:

```
{SKU}_video.mp4

Examples:
- SAC048S_video.mp4    (for small size)
- SAC048M_video.mp4    (for medium size)
- SAC048L_video.mp4    (for large size)
```

Or for multiple videos:
```
{SKU}_video1.mp4
{SKU}_video2.mp4
```

---

## Step 3: Upload Video

### Option A: Drag & Drop (Easiest)
1. Open Finder/Explorer
2. Navigate to: `sugan.github.io/public/videos/`
3. Drag your video file into this folder

### Option B: Command Line
```bash
# Copy video to the project
cp /path/to/your/video.mp4 /Users/devangsankhla/Documents/sugan.github.io/public/videos/SAC048S_video.mp4
```

---

## Step 4: Update Product Data

Edit `src/data/rooms.ts` to add video to your product:

Find the product (e.g., SAC048S) and add the `videos` array in `details`:

```typescript
{
  id: 'SAC048S',
  name: 'Marble-Top Mango Wood Pet Feeder with Stainless Steel Bowls',
  price: 1999,
  // ... other fields ...
  details: {
    materials: 'Mango wood',
    finish: 'Natural marble top, mineral oil finish',
    // ... other details ...
    
    // ADD VIDEOS HERE
    videos: [
      '/videos/SAC048S_video.mp4'
    ],
    photos: [
      '/images/SAC048S_02.png',
      '/images/SAC048S_03.png'
    ]
  }
}
```

For multiple videos:
```typescript
videos: [
  '/videos/SAC048S_video1.mp4',
  '/videos/SAC048S_video2.mp4'
]
```

---

## Step 5: Commit & Push

```bash
# Add the video file
git add public/videos/SAC048S_video.mp4

# Add the updated product data
git add src/data/rooms.ts

# Commit
git commit -m "Add product video for SAC048 (Marble-Top Pet Feeder)

- Add showcase video for Small, Medium, Large variants
- Video demonstrates marble top quality and detachable bowls"

# Push to deploy
git push
```

---

## Example: Complete SAC048 Series

Here's how to add videos for all three sizes:

### 1. Upload Videos
```bash
# Copy all three videos
cp SAC048S_video.mp4 public/videos/
cp SAC048M_video.mp4 public/videos/
cp SAC048L_video.mp4 public/videos/
```

### 2. Update Each Product in rooms.ts

**For SAC048S (Small):**
```typescript
details: {
  // ... existing fields ...
  videos: ['/videos/SAC048S_video.mp4']
}
```

**For SAC048M (Medium):**
```typescript
details: {
  // ... existing fields ...
  videos: ['/videos/SAC048M_video.mp4']
}
```

**For SAC048L (Large):**
```typescript
details: {
  // ... existing fields ...
  videos: ['/videos/SAC048L_video.mp4']
}
```

---

## Video Compression (If File is Too Large)

If your video is larger than 50MB, compress it:

### Using FFmpeg (Command Line)
```bash
# Install ffmpeg first: brew install ffmpeg (Mac) or apt-get install ffmpeg (Linux)

# Compress video
ffmpeg -i input.mp4 -vcodec h264 -acodec mp2 -b:v 2000k -bufsize 2000k output.mp4
```

### Online Tools (No Installation)
- **Veed.io**: https://www.veed.io/tools/video-compressor
- **Clideo**: https://clideo.com/compress-video
- **FreeConvert**: https://www.freeconvert.com/compress-mp4

---

## Testing

After pushing, verify the video works:

1. Go to: `https://sugan.shop/product/SAC048S`
2. Look for video thumbnail in the gallery
3. Click to play
4. Video should play smoothly

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Video not showing | Check file path - must start with `/videos/` |
| Video not playing | Ensure MP4 format with H.264 codec |
| Slow loading | Compress video to under 20MB |
| Wrong aspect ratio | Use 16:9 or 1:1 aspect ratio |
| No thumbnail | First frame will be used as thumbnail |

---

## Quick Checklist

- [ ] Video is MP4 format
- [ ] File size under 50MB (ideally under 20MB)
- [ ] Named correctly: `{SKU}_video.mp4`
- [ ] Placed in `public/videos/` folder
- [ ] Added to product `details.videos` array
- [ ] Committed and pushed

---

## Need Help?

If you need me to:
1. Compress your video
2. Update the product data
3. Add video support to the gallery component

Just share the video file and I'll handle it!
