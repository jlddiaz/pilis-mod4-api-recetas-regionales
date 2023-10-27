import { Usuario } from './../entities/Usuario'
import bcrypt from 'bcrypt'
export const comparePassword = async (
  user: Usuario,
  password: string
): Promise<Boolean> => {
  return await bcrypt.compare(password, user.password)
}

export const createHash = async (password: string): Promise<string> => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}