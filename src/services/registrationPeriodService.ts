import { AppDataSource } from './../config/database'
import { RegistrationPeriod } from '../entities/registrationPeriod'

export const registrationPeriodService = {
  async updateRegistrationPeriod(data: { start_time: Date; end_time: Date }) {
    const periodRepo = AppDataSource.getRepository(RegistrationPeriod)
    let period = await periodRepo.findOne({})
    if (!period) {
      period = periodRepo.create(data)
    } else {
      period.start_time = data.start_time
      period.end_time = data.end_time
    }
    return await periodRepo.save(period)
  },

  async getRegistrationPeriod() {
    const periodRepo = AppDataSource.getRepository(RegistrationPeriod)
    return await periodRepo.findOne({})
  }
}
