export const authConfig = {
  secret: process.env.JWT_SECRET || 'your_jwt_secret',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'your_jwt_refresh_secret'
}
