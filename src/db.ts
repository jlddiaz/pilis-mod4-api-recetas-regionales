import { DataSource } from 'typeorm'
import { User } from './entities/User'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'mysql',
  database: 'recetas-regionales-db',
  // logging: true, // muestra peticiones a la bd
  synchronize: true,
  entities: [User],
})
