const { supabase } = require("../supabase.js");
const { attributeMappings } = require("./keyword_mapping.js");
const getAllBranch = async () => {
  const { data, error } = await supabase.from("branch").select("*");

  if (error) {
    console.error(error);
  } else {
    console.log("All branch:", data);
    return data;
  }
};
module.exports = {
  getAllBranch,
  // Add other functions here...
};
