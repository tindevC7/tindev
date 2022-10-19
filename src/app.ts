import express from 'express'
import morgan from 'morgan'
import { globalErrorHandler } from './controllers/error.controller'
import routers from './routes'
import cors from 'cors'
// Init our Express app
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use('/api/v1', routers)
app.use(globalErrorHandler)

// Catch non-existing endpoints
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `${req.method} ${req.url} does not exists in our server`
  })
})

export default app
