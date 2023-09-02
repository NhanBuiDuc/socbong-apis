const express = require("express");
const router = express.Router();
const { sendSuccessResponse, sendErrorResponse } = require("../response");
const { getAllAccounts } = require("../database/queries_models/account");
// Define the POST route to get all accounts
router.get("/getAll", async (req, res) => {
  try {
    const accounts = await getAllAccounts(); // Retrieve all accounts from the database

    // Send a success response with the list of accounts
    res.status(200).json({
      status: 200,
      data: accounts,
      message: "All accounts retrieved successfully",
    });
  } catch (error) {
    // Handle any errors here
    console.error("Error fetching accounts:", error);

    // Send an error response
    res.status(500).json({
      status: 500,
      message: "Error fetching accounts",
      error: error.message, // Include additional error details if needed
    });
  }
});

module.exports = router;
