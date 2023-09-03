const { supabase } = require("../supabase.js");

const { util } = require("../util.js");

const getAllAccounts = async () => {
  const { data, error } = await supabase.from("account").select("*");

  if (error) {
    console.error(error);
  } else {
    console.log("All accounts:", data);
    return data;
  }
};
// Function to insert a class room record
const insertAccount = async (accountData) => {
  const { data, error } = await supabase
    .from("account")
    .insert([accountData])
    .single();

  if (error) {
    console.error("Error inserting account:", error);
  } else {
    console.log("Account inserted successfully:", data);
    return data;
  }
};
module.exports = {
  getAllAccounts,
  insertAccount,
};
