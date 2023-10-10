"use client";

import { useEffect } from "react";
import { Box, Table, Td, Th, Tr } from "@chakra-ui/react";
import {
  createClient,
  SupabaseClient,
  PostgrestResponse,
} from "@supabase/supabase-js";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { fetchRecipes } from "./fetches/fetchrecipes";

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
  const query = useQuery(["recipes"], fetchRecipes);

  if (query.isLoading) return <div>Loading...</div>;

  if (query.isError) return <div>Error fetching data</div>;

  if (!query.data || !query.data.results) return null;

  return (
    <ul>
      {query.data.results.map((recipe, index) => (
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
          key={index}
        >
          <div>
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
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      <div
        className="navBar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <a href="/">
          <h1>Recipes</h1>
        </a>
        <a href="addrecipe">
          <h1>Add recipe</h1>
        </a>
      </div>
      <QueryClientProvider client={queryClient}>
        <FeedPage />
      </QueryClientProvider>
    </main>
  );
}
