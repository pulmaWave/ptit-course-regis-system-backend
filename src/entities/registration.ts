import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Course } from './Course'
import { User } from './user'

@Entity()
export class Registration {
  @PrimaryGeneratedColumn()
  id?: number

  @ManyToOne(() => User, (user) => user.registrations)
  user?: User

  @ManyToOne(() => Course, (course) => course.registrations)
  course?: Course

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registered_at?: Date
}
