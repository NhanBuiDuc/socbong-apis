const express = require("express");
const router = express.Router();
const { sendSuccessResponse, sendErrorResponse } = require("../response");
const { getAllAccounts } = require("../database/queries_models/account");
// Define the POST route to get all accounts
router.get("/getAll", async (req, res) => {
  try {
    const accounts = await getAllAccounts(); // Retrieve all accounts from the database
    sendSuccessResponse(res, accounts, "All accounts retrieved successfully");
  } catch (error) {
    // Handle any errors here
    console.error("Error fetching accounts:", error);

    // Send an error response
    sendErrorResponse(res, "Error fetching accounts", 500);
  }
});

module.exports = router;
