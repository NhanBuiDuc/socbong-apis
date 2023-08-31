const { supabase } = require("./supabase.js");

const { util } = require("../util.js");
export const getAllAccounts = async () => {
  const { data, error } = await supabase.from("account").select("*");

  if (error) {
    console.error(error);
  } else {
    console.log("All accounts:", data);
  }
};
