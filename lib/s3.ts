import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

/* ---------------------------
   S3 CLIENT SETUP
--------------------------- */
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  requestHandler: {
    connectionTimeout: 30000, // 30 seconds
    requestTimeout: 60000, // 60 seconds
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

/* ---------------------------
   UPLOAD IMAGE TO S3
--------------------------- */
export async function uploadImageToS3(
  base64Data: string,
  fileName: string
): Promise<string> {
  console.log('📤 Starting S3 upload for:', fileName);
  
  try {
    // Extract base64 data and mime type
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
    }

    const contentType = matches[1];
    const base64Content = matches[2];
    
    console.log('📊 Base64 length:', base64Content.length);
    console.log('📊 Estimated size:', (base64Content.length * 0.75 / 1024 / 1024).toFixed(2), 'MB');
    
    const buffer = Buffer.from(base64Content, 'base64');
    
    console.log('📦 Buffer size:', (buffer.length / 1024 / 1024).toFixed(2), 'MB');

    // Generate unique filename
    const timestamp = Date.now();
    const extension = contentType.split('/')[1];
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9]/g, '-');
    const key = `blog-images/${timestamp}-${sanitizedFileName}.${extension}`;

    // Upload to S3
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    };

    console.log('☁️ Uploading to S3...');
    const command = new PutObjectCommand(uploadParams);
    
    const startTime = Date.now();
    await s3Client.send(command);
    const endTime = Date.now();
    
    console.log('✅ S3 upload complete in', (endTime - startTime) / 1000, 'seconds');

    // Return the public URL
    const imageUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return imageUrl;
  } catch (error: any) {
    console.error('❌ S3 upload error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    throw new Error(`Failed to upload image to S3: ${error.message}`);
  }
}

/* ---------------------------
   DELETE IMAGE FROM S3
--------------------------- */
export async function deleteImageFromS3(imageUrl: string): Promise<void> {
  console.log('🗑️ Deleting from S3:', imageUrl);
  
  try {
    // Extract key from URL
    const key = imageUrl.split('.amazonaws.com/')[1];
    
    if (!key) {
      throw new Error('Invalid S3 URL');
    }

    const deleteParams = {
      Bucket: BUCKET_NAME,
      Key: key,
    };

    const command = new DeleteObjectCommand(deleteParams);
    await s3Client.send(command);
    
    console.log('✅ Image deleted from S3');
  } catch (error: any) {
    console.error('❌ S3 delete error:', error);
    throw new Error(`Failed to delete image from S3: ${error.message}`);
  }
}

/* ---------------------------
   GET S3 PUBLIC URL
--------------------------- */
export function getS3PublicUrl(key: string): string {
  return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}
