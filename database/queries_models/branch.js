const { supabase } = require("../supabase.js");
const { attributeMappings } = require("./keyword_mapping.js");
export const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error);
  } else {
    console.log("All users:", data);
  }
};
module.exports = {
  getAllUsers,
  // Add other functions here...
};
