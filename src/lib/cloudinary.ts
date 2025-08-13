import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadToCloudinary(file: Buffer, fileName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw',
        public_id: `resumes/${Date.now()}-${fileName}`,
        use_filename: true,
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result!.secure_url)
        }
      }
    ).end(file)
  })
}

export async function downloadFromCloudinary(url: string): Promise<Buffer> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to download file from Cloudinary')
  }
  const arrayBuffer = await response.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

export default cloudinary