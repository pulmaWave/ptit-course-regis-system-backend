import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Registration } from './Registration'

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ unique: true })
  code?: string

  @Column()
  name?: string

  @Column()
  credits?: number

  @Column()
  tuition_fee?: number

  @Column()
  instructor?: string

  @Column({ type: 'date' })
  start_time?: Date

  @Column()
  session_time?: string

  @Column()
  max_registrations?: number

  @Column()
  location?: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updated_at?: Date

  @OneToMany(() => Registration, (registration) => registration.course)
  registrations?: Registration[]
}
