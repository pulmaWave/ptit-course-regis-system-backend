import { DataSource } from 'typeorm'
import { Registration } from '../entities/registration'
import { RegistrationPeriod } from '../entities/registrationPeriod'
import { RefreshToken } from '../entities/refreshToken'
import { Course } from '../entities/course'
import { User } from '../entities/user'

export const AppDataSource = new DataSource({
  type: 'postgres',

  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'test@123',
  database: process.env.DB_NAME || 'ptit_course_system',
  synchronize: true, // Set to false in production
  logging: false,
  entities: [User, Course, Registration, RegistrationPeriod, RefreshToken],
  migrations: [],
  subscribers: []
})
