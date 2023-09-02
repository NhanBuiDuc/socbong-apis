const { supabase } = require("./supabase.js");
const { attributeMappings } = require("./keyword_mapping.js");
const fetchUserById = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
};
const insertUser = async (email, password, role) => {
  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password, role }])
    .single();

  if (error) {
    console.error(error);
  } else {
    console.log("User inserted successfully:", data);
  }
};
const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error);
  } else {
    console.log("All users:", data);
  }
  if (error) {
    console.error(error);
  } else {
    console.log("All users:", data);
  }
};

// Re-export all functions using the spread operator
module.exports = {
  fetchUserById,
  insertUser,
  getAllUsers,
};
