"use client";

import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Table,
  Td,
  Textarea,
  Th,
  Tr,
} from "@chakra-ui/react";
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
import { fetchRecipes } from "../fetches/fetchrecipes";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [recipeName, setRecipeName] = useState("");
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");

  async function sendRecipe() {
    const { error } = await supabase.from("recipes").insert({
      recipe_name: recipeName,
      prep_time: prepTime,
      cook_time: cookTime,
      ingredients: ingredients,
      directions: directions,
    });
    console.log("Recipe sent");
    return;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div
        className="navBar"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <a href="/">
          <h1>Recipes</h1>
        </a>
        <a href="addrecipe">
          <h1>Add recipe</h1>
        </a>
      </div>
      <div
        className="addrecipeform"
        style={{
          display: "flex",
          justifyContent: "center",
          justifyItems: "center",
          alignItems: "center",
          alignContent: "center",
          textAlign: "center",
          borderRadius: "10px",
          border: "1px solid black",
          padding: "15px",
        }}
      >
        <form>
          <h1 style={{ fontSize: "120%", fontWeight: "bold" }}>
            Add your recipe:
          </h1>
          <br></br>
          <Input
            type="text"
            placeholder="Recipe Name..."
            borderRadius={"10px"}
            padding={"10px"}
            fontWeight={"bold"}
            id="recipeNameInput"
            margin={"10px"}
            w={"96%"}
            onChange={(e) => {
              setRecipeName(e.currentTarget.value);
            }}
          />
          <br></br>
          <Input
            type="number"
            placeholder="Preparation Time..."
            borderRadius={"10px"}
            padding={"10px"}
            fontWeight={"bold"}
            id="prepTimeInput"
            margin={"10px"}
            w={"46%"}
            onChange={(e) => {
              setPrepTime(e.currentTarget.valueAsNumber);
            }}
          />
          <Input
            type="number"
            placeholder="Cook Time..."
            borderRadius={"10px"}
            padding={"10px"}
            fontWeight={"bold"}
            id="cookTimeInput"
            margin={"10px"}
            w={"46%"}
            onChange={(e) => {
              setCookTime(e.currentTarget.valueAsNumber);
            }}
          />
          <br></br>
          <Textarea
            placeholder="Ingredients..."
            borderRadius={"10px"}
            padding={"10px"}
            fontWeight={"bold"}
            id="ingredientsInput"
            margin={"10px"}
            w={"96%"}
            cols={10}
            minHeight={"50px"}
            onChange={(e) => {
              setIngredients(e.currentTarget.value);
            }}
          />
          <br></br>
          <Textarea
            placeholder="Directions..."
            borderRadius={"10px"}
            padding={"10px"}
            fontWeight={"bold"}
            id="directionsInput"
            margin={"10px"}
            w={"96%"}
            cols={10}
            minHeight={"50px"}
            onChange={(e) => {
              setDirections(e.currentTarget.value);
            }}
          />
          <br></br>
          <Popover>
            <PopoverTrigger>
              <Button
                borderRadius={"10px"}
                padding={"10px"}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                letterSpacing={"2px"}
                textAlign={"center"}
                backgroundColor={"#3784db"}
                w={"100%"}
                marginTop={"10px"}
                fontSize={"120%"}
                color={"white"}
                onClick={sendRecipe}
              >
                Send
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Recipe sent!</PopoverHeader>
              <PopoverBody>Your recipe should be visible soon!</PopoverBody>
            </PopoverContent>
          </Popover>
        </form>
      </div>
    </main>
  );
}
