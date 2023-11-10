import { AppDataSource } from '../db'
import { Request, Response } from 'express'

// -------- Agregar para jwt
import jwt from 'jsonwebtoken'
import { comparePassword, createHash } from '../helpers/bcryptHelper'
import { User } from '../entities/User'

const jwtSecret = 'somesecrettoken'
const jwtRefreshTokenSecret = 'somesecrettokenrefresh'
let refreshTokens: (string | undefined)[] = []

const createToken = (user: User) => {
  // Se crean el jwt y refresh token
  const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, {
    expiresIn: '120m',
  })
  const refreshToken = jwt.sign(
    { username: user.username },
    jwtRefreshTokenSecret,
    {
      expiresIn: '90d',
    }
  )

  refreshTokens.push(refreshToken)
  return {
    token,
    refreshToken,
  }
}
// ----------

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    return res.json(users)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findOneBy({ id: id })

    if (!user) return res.status(404).json({ message: 'User not found' })

    return res.json(user)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please. Send your username and password' })
  }

  const user = await User.findOneBy({ username: username })
  if (user) {
    return res.status(400).json({ msg: 'The User already Exists' })
  }

  const newUser = new User()
  newUser.username = username
  newUser.password = await createHash(password)
  await newUser.save()

  return res.status(201).json(newUser)
}

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password } = req.body

  if (!username || !password) {
    return res
      .status(400)
      .json({ msg: 'Please. Send your username and password' })
  }

  const user = await User.findOneBy({ username: username })
  if (!user) {
    return res.status(400).json({ msg: 'The User does not exists' })
  }

  const isMatch = await comparePassword(user, password)
  if (isMatch) {
    return res.status(200).json({ ...createToken(user), ...user })
  }

  return res.status(400).json({
    msg: 'The mail or password are incorrect',
  })
}

export const protectedEndpoint = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.status(200).json({ msg: 'ok' })
}

// Create new access token from refresh token
export const refresh = async (req: Request, res: Response): Promise<any> => {
  // const refreshToken = req.header("x-auth-token");

  const refreshToken = req.body.refresh

  // If token is not provided, send error message
  if (!refreshToken) {
    res.status(401).json({
      errors: [
        {
          msg: 'Token not found',
        },
      ],
    })
  }

  console.log(refreshTokens)
  // If token does not exist, send error message
  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json({
      errors: [
        {
          msg: 'Invalid refresh token',
        },
      ],
    })
  }

  try {
    const user = jwt.verify(refreshToken, jwtRefreshTokenSecret)
    // user = { email: 'jame@gmail.com', iat: 1633586290, exp: 1633586350 }
    const { username } = <any>user

    const userFound = <User>await User.findOneBy({ username: username })
    if (!user) {
      return res.status(400).json({ msg: 'The User does not exists' })
    }

    const accessToken = jwt.sign(
      { id: userFound.id, mail: userFound.username },
      jwtSecret,
      { expiresIn: '120s' }
    )

    res.json({ accessToken })
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: 'Invalid token',
        },
      ],
    })
  }
}
