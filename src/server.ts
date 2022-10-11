import app from './app'
import * as dotenv from 'dotenv'
// Utils
import { db } from './utils/database.util'
import initModels from './models/initModels'

dotenv.config({ path: './config.env' })

const startServer = async (): Promise<void> => {
  try {
    await db.authenticate()
    // Establish the relations between models
    initModels()
    await db.sync({ force: true })
    // Set server to listen
    const PORT = process.env.PORT ?? 8000
    app.listen(PORT, () => {
      console.log('Express app running!', PORT)
    })
  } catch (error) {
    console.log(error)
  }
}
void startServer()
