import { Router } from 'express'
import {
  deleteUser,
  getUser,
  getUsers,
  refresh,
  signIn,
  signUp,
  updateUser,
} from '../controllers/user.controller'

const router = Router()

router.get('/users', getUsers)
router.get('/users/:id', getUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/token', refresh)

export default router
