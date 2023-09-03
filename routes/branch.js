const express = require("express");
const router = express.Router();
const { sendSuccessResponse, sendErrorResponse } = require("../response");
const { getAllBranch } = require("../database/queries_models/branch");

// Define a route to get all branch IDs
router.get("/getAllId", async (req, res) => {
  try {
    const branchData = await getAllBranch(); // Retrieve all branch data
    console.log("branch: ", branchData);
    // Extract branch IDs from the data
    const branchIds = branchData.map((branch) => branch.id);

    // Send a success response with the list of branch IDs
    sendSuccessResponse(
      res,
      branchIds,
      "All branch IDs retrieved successfully"
    );
  } catch (error) {
    // Handle any errors here
    console.error("Error fetching branch IDs:", error);

    // Send an error response
    sendErrorResponse(res, "Error fetching branch IDs", 500);
  }
});
// Define a route to get all branch information
router.get("/getAll", async (req, res) => {
  try {
    const branchData = await getAllBranch(); // Retrieve all branch data

    // Send a success response with all branch information
    sendSuccessResponse(
      res,
      branchData,
      "All branch information retrieved successfully"
    );
  } catch (error) {
    // Handle any errors here
    console.error("Error fetching branch information:", error);

    // Send an error response
    sendErrorResponse(res, "Error fetching branch information", 500);
  }
});
module.exports = router;
