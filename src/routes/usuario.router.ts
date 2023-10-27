import { Router } from 'express'
import { getUsuario, getUsuarios, refresh, signIn, signUp } from '../controllers/usuario.controller'

const router = Router()

router.get('/usuarios',getUsuarios)
router.get('/usuarios/:id',getUsuario)
router.post('/signup',signUp)
router.post('/signin',signIn)
router.post('/token',refresh)

export default router