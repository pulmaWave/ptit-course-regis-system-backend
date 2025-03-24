import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './user'

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ unique: true })
  token?: string

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user?: User

  @Column({ type: 'timestamp' })
  expires_at?: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date
}
