import express from 'express'
import {
  acceptFriendRequest,
  getMyFriends,
  getMyNotifications,
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendFriendRequest,
} from '../controllers/user.js'
import {
  acceptRequestValidator,
  registerValidator,
  sendRequestValidator,
  validateHandler,
  validateLogin,
} from '../lib/validators.js'
import { isAuthenticated } from '../middlewares/auth.js'
import { singleAvatar } from '../middlewares/multer.js'

const app = express.Router()

app.post('/new', singleAvatar, registerValidator(), validateHandler, newUser)
app.post('/login', validateLogin(), validateHandler, login)

//Afetr here user must be logged in to access the routes
app.use(isAuthenticated)
app.get('/me', getMyProfile)
app.get('/logout', logout)
app.get('/search', searchUser)
app.put(
  '/sendrequest',
  sendRequestValidator(),
  validateHandler,
  sendFriendRequest
)
app.put(
  '/acceptrequest',
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest
)
app.get('/notifications', getMyNotifications)
app.get('/friends', getMyFriends)

export default app
