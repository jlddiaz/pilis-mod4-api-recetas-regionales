import { Router } from 'express'
import {
  getUser,
  getUsers,
  refresh,
  signIn,
  signUp,
} from '../controllers/user.controller'

const router = Router()

router.get('/usuarios', getUsers)
router.get('/usuarios/:id', getUser)
router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/token', refresh)

export default router
