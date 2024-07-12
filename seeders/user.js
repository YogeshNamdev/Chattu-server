import { faker } from '@faker-js/faker'
import User from '../models/user.js'

const createUser = async (numUsers) => {
  try {
    const userPromise = []
    for (let i = 0; i < numUsers; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: 'password',
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      })
      userPromise.push(tempUser)
      console.log('user created', numUsers)
    }
    await Promise.all(userPromise)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export { createUser }
