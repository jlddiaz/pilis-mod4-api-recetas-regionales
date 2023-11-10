import { Router } from 'express'
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  getRecipes,
  updateRecipe,
} from '../controllers/recipe.controller'

const router = Router()

router.get('/recipes', getRecipes)
router.get('/recipes/:id', getRecipe)
router.post('/recipes', createRecipe)
router.put('/recipes/:id', updateRecipe)
router.delete('/recipes/:id', deleteRecipe)

export default router
