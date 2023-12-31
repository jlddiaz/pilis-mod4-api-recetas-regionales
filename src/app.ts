import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'reflect-metadata'

import userRouter from './routes/user.router'
import recipeRouter from './routes/recipe.router'

import passportMiddleware from './middewares/passport'
import passport from 'passport'
import passportLocal from 'passport-local'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

//Agregar para jwt
app.use(passport.initialize())
passport.use(passportMiddleware)

app.use('/api', userRouter)
app.use('/api',recipeRouter)

export default app