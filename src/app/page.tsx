'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

import { generateRecipe, type GenerateRecipeOutput } from '@/ai/flows/generate-recipe';
import { adjustRecipeServingSize } from '@/ai/flows/adjust-recipe-serving-size';

import { ChefHat, Utensils, ListChecks, LoaderCircle, Sparkles } from 'lucide-react';

const ingredientsFormSchema = z.object({
  ingredients: z.string().min(10, { message: 'Please enter at least a few ingredients.' }),
});

const servingSizeFormSchema = z.object({
  servings: z.coerce.number().min(1, { message: 'Must serve at least 1.' }).max(100, { message: 'Cannot serve more than 100.' }),
});

type RecipeState = GenerateRecipeOutput | null;

export default function Home() {
  const [recipe, setRecipe] = useState<RecipeState>(null);
  const [adjustedRecipe, setAdjustedRecipe] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdjusting, setIsAdjusting] = useState(false);
  const { toast } = useToast();

  const ingredientsForm = useForm<z.infer<typeof ingredientsFormSchema>>({
    resolver: zodResolver(ingredientsFormSchema),
    defaultValues: { ingredients: '' },
  });

  const servingSizeForm = useForm<z.infer<typeof servingSizeFormSchema>>({
    resolver: zodResolver(servingSizeFormSchema),
  });

  const handleGenerateRecipe = async (values: z.infer<typeof ingredientsFormSchema>) => {
    setIsLoading(true);
    setRecipe(null);
    setAdjustedRecipe(null);
    
    try {
      const result = await generateRecipe({ ingredients: values.ingredients });
      setRecipe(result);
      servingSizeForm.reset({ servings: result.servings });
    } catch (error) {
      console.error('Error generating recipe:', error);
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: 'Failed to generate a recipe. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdjustServings = async (values: z.infer<typeof servingSizeFormSchema>) => {
    if (!recipe) return;

    setIsAdjusting(true);
    try {
      const recipeString = `
Title: ${recipe.title}
Servings: ${recipe.servings}
Ingredients:
${recipe.ingredients.map(i => `- ${i}`).join('\n')}
Instructions:
${recipe.instructions.map((step, i) => `${i + 1}. ${step}`).join('\n')}
      `;

      const result = await adjustRecipeServingSize({
        recipe: recipeString,
        newServingSize: values.servings,
      });
      setAdjustedRecipe(result.adjustedRecipe);
      setRecipe(prev => prev ? { ...prev, servings: values.servings } : null);
    } catch (error) {
       console.error('Error adjusting serving size:', error);
       toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: 'Failed to adjust serving size. Please try again.',
      });
    } finally {
        setIsAdjusting(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <div className="flex items-center gap-2 bg-accent/20 text-accent-foreground/80 rounded-full px-4 py-1 mb-4 border border-accent/30">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium">Powered by GenAI</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
          Fridge Recipe AI
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Got random ingredients? Don't know what to cook? Enter what you have in your fridge, and let AI whip up a delicious recipe for you.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto mt-10 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <ChefHat className="w-6 h-6" />
            What's in your fridge?
          </CardTitle>
          <CardDescription>
            List your ingredients below, separated by commas. The more you list, the better the recipe!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...ingredientsForm}>
            <form onSubmit={ingredientsForm.handleSubmit(handleGenerateRecipe)} className="space-y-6">
              <FormField
                control={ingredientsForm.control}
                name="ingredients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Ingredients</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., chicken breast, cherry tomatoes, garlic, olive oil, spinach, salt, pepper"
                        className="min-h-[100px] text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoading ? (
                  <>
                    <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Recipe"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && !recipe && (
        <div className="text-center mt-10 flex flex-col items-center justify-center">
          <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Crafting your perfect recipe...</p>
        </div>
      )}

      {recipe && (
        <Card className="max-w-3xl mx-auto mt-10 shadow-lg animate-in fade-in-0 duration-500">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">{adjustedRecipe ? "Adjusted Recipe" : recipe.title}</CardTitle>
            <CardDescription>
              A delicious recipe for {recipe.servings} {recipe.servings > 1 ? 'servings' : 'serving'}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {adjustedRecipe ? (
                <pre className="whitespace-pre-wrap font-body text-base bg-muted/50 p-4 rounded-md">{adjustedRecipe}</pre>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="font-headline text-xl flex items-center gap-2 mb-3">
                    <ListChecks className="w-5 h-5 text-primary" />
                    Ingredients
                  </h3>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    {recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
                </div>
                <Separator />
                <div>
                  <h3 className="font-headline text-xl flex items-center gap-2 mb-3">
                    <Utensils className="w-5 h-5 text-primary" />
                    Instructions
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 pl-2">
                    {recipe.instructions.map((item, index) => <li key={index}>{item}</li>)}
                  </ol>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-col sm:flex-row gap-4 items-start sm:items-center bg-muted/50 p-4 rounded-b-lg">
              <p className="font-medium flex-shrink-0">Need to scale it?</p>
              <Form {...servingSizeForm}>
                <form onSubmit={servingSizeForm.handleSubmit(handleAdjustServings)} className="flex gap-2 w-full sm:w-auto">
                  <FormField
                    control={servingSizeForm.control}
                    name="servings"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input type="number" className="w-24 bg-background" {...field} />
                        </FormControl>
                         <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isAdjusting} variant="secondary">
                     {isAdjusting ? (
                       <>
                         <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                         Adjusting...
                       </>
                     ) : (
                       "Adjust Servings"
                     )}
                  </Button>
                </form>
              </Form>
          </CardFooter>
        </Card>
      )}
    </main>
  );
}
