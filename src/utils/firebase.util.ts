import { initializeApp } from 'firebase/app'
import dotenv from 'dotenv'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

dotenv.config({ path: './config.env' })

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  appId: process.env.FIREBASE_APP_ID
}

const firebaseapp = initializeApp(firebaseConfig)

// Storage firebase service
export const storage = getStorage(firebaseapp)

export const uploadProfileImg = async (img: Express.Multer.File, userId: number): Promise<string> => {
  const [originalname, ext]: string[] = img.originalname.split('.')

  const filename = `profiles/${userId}/${originalname}-${Date.now()}.${ext}`
  const imgRef = ref(storage, filename)

  await uploadBytes(imgRef, img.buffer)

  const imgUrl = await getDownloadURL(imgRef)

  return imgUrl
}
