import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Registration } from './registration'
import { RefreshToken } from './refreshToken'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @Column({ type: 'enum', enum: ['student', 'admin'] })
  role: string

  @Column()
  name: string

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  academicYear: string

  @Column({ nullable: true })
  major: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updated_at: Date

  @OneToMany(() => Registration, (registration) => registration.user)
  registrations: Registration[]

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[]
}
