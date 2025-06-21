'use server';
/**
 * @fileOverview Adjusts the serving size of a recipe and updates ingredient quantities.
 *
 * - adjustRecipeServingSize - A function that adjusts the serving size of a recipe.
 * - AdjustRecipeServingSizeInput - The input type for the adjustRecipeServingSize function.
 * - AdjustRecipeServingSizeOutput - The return type for the adjustRecipeServingSize function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustRecipeServingSizeInputSchema = z.object({
  recipe: z.string().describe('The recipe to adjust.'),
  newServingSize: z.number().describe('The new serving size for the recipe.'),
});
export type AdjustRecipeServingSizeInput = z.infer<typeof AdjustRecipeServingSizeInputSchema>;

const AdjustRecipeServingSizeOutputSchema = z.object({
  adjustedRecipe: z.string().describe('The recipe with adjusted ingredient quantities.'),
});
export type AdjustRecipeServingSizeOutput = z.infer<typeof AdjustRecipeServingSizeOutputSchema>;

export async function adjustRecipeServingSize(input: AdjustRecipeServingSizeInput): Promise<AdjustRecipeServingSizeOutput> {
  return adjustRecipeServingSizeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adjustRecipeServingSizePrompt',
  input: {schema: AdjustRecipeServingSizeInputSchema},
  output: {schema: AdjustRecipeServingSizeOutputSchema},
  prompt: `You are a recipe adjustment expert.

  The user will provide a recipe and a new serving size. You must adjust the ingredient quantities in the recipe to match the new serving size.

  Recipe:
  {{recipe}}

  New Serving Size:
  {{newServingSize}}

  Return the adjusted recipe.
  `,
});

const adjustRecipeServingSizeFlow = ai.defineFlow(
  {
    name: 'adjustRecipeServingSizeFlow',
    inputSchema: AdjustRecipeServingSizeInputSchema,
    outputSchema: AdjustRecipeServingSizeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
