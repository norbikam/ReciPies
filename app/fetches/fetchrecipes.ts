import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export interface DatabaseResponse {
  results: Recipe[];
}

export interface Recipe {
  recipe_name: string;
  cook_time: number;
  prep_time: number;
  ingredients: string;
  directions: string;
}

export async function fetchRecipes(): Promise<DatabaseResponse> {
  console.log("Fetching recipes...");
  const { data, error } = await supabase
    .from("recipes")
    .select("recipe_name, cook_time, prep_time, ingredients, directions");

  if (error) {
    throw new Error(error.message);
  }

  return { results: data || [] };
}
