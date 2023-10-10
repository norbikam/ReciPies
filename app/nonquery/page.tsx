"use client";

import { useEffect, useState } from "react";
import { Box, Table, Td, Th, Tr } from "@chakra-ui/react";
import {
  createClient,
  SupabaseClient,
  PostgrestResponse,
} from "@supabase/supabase-js";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

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

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const queryClient = new QueryClient();

function FeedPage() {
  const [recipes, setRecipes] = useState<DatabaseResponse | null>(null);

  useEffect(() => {
    getRecipes();
  }, []);

  async function getRecipes() {
    console.log("Fetching recipes...");
    let { data, error } = await supabase
      .from("recipes")
      .select("recipe_name, cook_time, prep_time, ingredients, directions");
    console.log("Received data: ", data);
    if (data) {
      setRecipes({ results: data });
    } else {
      setRecipes({ results: [] });
    }
  }

  return (
    <ul>
      {recipes?.results.map((recipe, index) => (
        <Box
          style={{
            background: "#e8e8e8",
            padding: "1vw",
            borderRadius: "20px",
            boxShadow: "7px 10px 5px black",
            marginBottom: "20px",
            border: "2px solid gray",
            maxWidth: "80vw",
          }}
        >
          <div key={index}>
            <h1 style={{ textAlign: "center", fontSize: "150%" }}>
              {recipe.recipe_name}
            </h1>
            <Table
              display={"flex"}
              justifyContent={"space-evenly"}
              marginBottom={"5px"}
            >
              <Td>
                <Th>
                  <h2>prepTime: {recipe.prep_time}</h2>
                </Th>
                <Th>
                  <h2>cookTime: {recipe.cook_time}</h2>
                </Th>
              </Td>
            </Table>

            <h2>
              <b>ingredients:</b> {recipe.ingredients}
            </h2>
            <br></br>
            <h2>
              <b>directions:</b> {recipe.directions}
            </h2>
          </div>
        </Box>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div
        className="navBar"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <h1>Recipies</h1>
        <h1>Your recipes</h1>
      </div>
      <FeedPage />
    </main>
  );
}
