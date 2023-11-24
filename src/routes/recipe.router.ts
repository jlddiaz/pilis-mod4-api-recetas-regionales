import { Router } from 'express'
import passport from 'passport'
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
router.post('/recipes', passport.authenticate('jwt', { session: false }), createRecipe)
router.put('/recipes/:id', passport.authenticate('jwt', { session: false }), updateRecipe)
router.delete('/recipes/:id', passport.authenticate('jwt', { session: false }), deleteRecipe)

// passport.authenticate('jwt', { session: false }),
export default router
