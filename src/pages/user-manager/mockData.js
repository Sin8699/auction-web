import sample from 'lodash/sample'
import dayjs from 'dayjs'

export const userData = [...Array(24)].map((_, index) => ({
  id: index,
  username: `username${index}`,
  dateOfBirth: dayjs().format('DD/MM/YYYY'),
  email: `email${index}@email.com`,
  fullName: `fullname${index}`,
  role: sample(['ADMIN', 'SELLER', 'BIDDER']),
  status: sample(['VERIFIED', 'NOT_VERIFIED', 'DISABLED'])
}))
