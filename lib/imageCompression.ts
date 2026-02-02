import imageCompression from 'browser-image-compression';

export async function compressImage(file: File): Promise<string> {
  console.log('🗜️ Starting compression for:', file.name);
  console.log('📊 Original size:', (file.size / 1024 / 1024).toFixed(2), 'MB');

  try {
    const options = {
      maxSizeMB: 0.3, // Reduce to 300KB (was 1MB)
      maxWidthOrHeight: 1200, // Reduce to 1200px (was 1920px)
      useWebWorker: true,
      fileType: file.type,
      initialQuality: 0.7, // Lower quality for faster upload
    };

    const compressedFile = await imageCompression(file, options);

    console.log('✅ Compressed to:', (compressedFile.size / 1024 / 1024).toFixed(2), 'MB');

    // Convert to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        console.log('📦 Base64 generated, length:', result.length);
        resolve(result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(compressedFile);
    });
  } catch (error) {
    console.error('❌ Compression error:', error);
    throw new Error('Failed to compress image');
  }
}
