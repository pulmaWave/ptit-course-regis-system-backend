import express, { Application } from 'express'
import { AppDataSource } from './config/database'
import authRoutes from './routes/authRoutes'
import courseRoutes from './routes/courseRoutes'
import registrationRoutes from './routes/registrationRoutes'
import statsRoutes from './routes/statsRoutes'
import { errorHandler } from './utils/errorHandler'
import cors from 'cors'

const app: Application = express()
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Cho phép các nguồn gốc này
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Các phương thức được phép
  allowedHeaders: ['Content-Type', 'Authorization'], // Các header được phép
  credentials: true // Cho phép gửi cookie hoặc token (nếu cần)
}

app.use(cors(corsOptions)) // Áp dụng middleware CORS
app.use(express.json())

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected')
  })
  .catch((error) => {
    console.error('Database connection error:', error)
  })

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/registrations', registrationRoutes)
app.use('/api/stats', statsRoutes)

// Error handling
app.use(errorHandler)

export default app
