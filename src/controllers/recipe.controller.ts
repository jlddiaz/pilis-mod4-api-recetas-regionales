import { Request, Response } from 'express'
import { Recipe } from '../entities/Recipe'


export const getRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find()
    res.json(recipes)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const getRecipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const recipe = await Recipe.findOne({
      where: { id}
    })

    if (!recipe)
      return res.status(404).json({ message: 'Recipe not found' })

    return res.json(recipe)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const {
      name, description, image, ingredients, preparation, preparation_time } = req.body

    
    const recipe = new Recipe()
    recipe.description = description
    recipe.image = image
    recipe.ingredients = ingredients
    recipe.preparation = preparation
    recipe.preparation_time = preparation_time
    
    await recipe.save()
    return res.json(recipe)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const recipe = await Recipe.findOneBy({ id })
    if (!recipe)
      return res.status(404).json({ message: 'Recipe not found' })

   
    await Recipe.update({ id }, req.body)

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}

export const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await Recipe.delete({ id })

    if (result.affected === 0)
      return res.status(404).json({ message: 'Recipe not found' })

    return res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
