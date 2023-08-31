import { supabase } from "./supabase.js";
import { attributeMappings } from "./keyword_mapping.js";
export const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error);
  } else {
    console.log("All users:", data);
  }
};
