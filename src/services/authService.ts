import { AppDataSource } from './../config/database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../entities/user'
import { RefreshToken } from '../entities/refreshToken'
import { authConfig } from '../config/auth'

export const authService = {
  async login(username: string, password: string) {
    const userRepo = AppDataSource.getRepository(User)
    const tokenRepo = AppDataSource.getRepository(RefreshToken)
    const user = await userRepo.findOne({
      where: { username }
    })
    const userResponse = await userRepo.findOne({
      where: { username },
      select: [
        'id',
        'username',
        'role',
        'name',
        'email',
        'academicYear',
        'major'
      ]
    })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials')
    }
    await tokenRepo.delete({ user: { id: user.id } })
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      authConfig.secret,
      { expiresIn: '15m' }
    )
    const refreshToken = jwt.sign({ id: user.id }, authConfig.refreshSecret, {
      expiresIn: '7d'
    })
    const tokenEntity = new RefreshToken()
    tokenEntity.token = refreshToken
    tokenEntity.user = user
    tokenEntity.expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    await AppDataSource.getRepository(RefreshToken).save(tokenEntity)
    return { accessToken, refreshToken, userResponse }
  },
  async refreshToken(refreshToken: string) {
    const tokenRepo = AppDataSource.getRepository(RefreshToken)
    const token = await tokenRepo.findOne({
      where: { token: refreshToken },
      relations: ['user']
    })
    if (!token || token.expires_at < new Date())
      throw new Error('Invalid refresh token')
    const accessToken = jwt.sign(
      { id: token.user.id, role: token.user.role },
      authConfig.secret,
      { expiresIn: '15m' }
    )
    return accessToken
  },
  async logout(refreshToken: string) {
    await AppDataSource.getRepository(RefreshToken).delete({
      token: refreshToken
    })
  },
  async register(
    username: string,
    password: string,
    name: string,
    email?: string,
    academicYear?: string,
    major?: string
  ) {
    const userRepo = AppDataSource.getRepository(User)
    const existingUser = await userRepo.findOne({ where: { username } })
    if (existingUser) throw new Error('Username already exists')
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = userRepo.create({
      username,
      password: hashedPassword,
      role: 'student',
      name,
      email,
      academicYear,
      major
    })
    await userRepo.save(user)
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      authConfig.secret,
      { expiresIn: '15m' }
    )
    const refreshToken = jwt.sign({ id: user.id }, authConfig.refreshSecret, {
      expiresIn: '7d'
    })
    const tokenEntity = new RefreshToken()
    tokenEntity.token = refreshToken
    tokenEntity.user = user
    tokenEntity.expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    await AppDataSource.getRepository(RefreshToken).save(tokenEntity)

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name
      }
    }
  },
  async verifyToken(token: string): Promise<boolean> {
    try {
      jwt.verify(token, authConfig.secret) // Verify token với secret key
      return true
    } catch (error) {
      return false // Token không hợp lệ hoặc hết hạn
    }
  }
}
