import express from "express";
import cors from "cors";
import {
  getStoredOrgs,
  createOrg,
  updateOrg,
  deleteOrg,
  getOrgById,
} from "./storage.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// GET all organizations
app.get("/api/organizations", (req, res) => {
  try {
    const orgs = getStoredOrgs();
    res.json({
      success: true,
      data: orgs,
      count: orgs.length,
    });
  } catch (error) {
    console.error("Error fetching organizations:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch organizations",
    });
  }
});

// GET single organization by ID
app.get("/api/organizations/:id", (req, res) => {
  try {
    const { id } = req.params;
    const org = getOrgById(id);

    if (!org) {
      return res.status(404).json({
        success: false,
        error: "Organization not found",
      });
    }

    res.json({
      success: true,
      data: org,
    });
  } catch (error) {
    console.error("Error fetching organization:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch organization",
    });
  }
});

// POST create new organization
app.post("/api/organizations", (req, res) => {
  try {
    const orgData = req.body;

    // Basic validation
    if (!orgData.organization || !orgData.location) {
      return res.status(400).json({
        success: false,
        error: "Organization name and location are required",
      });
    }

    const updatedOrgs = createOrg(orgData);

    if (!updatedOrgs) {
      return res.status(500).json({
        success: false,
        error: "Failed to create organization",
      });
    }

    const newOrg = updatedOrgs[updatedOrgs.length - 1];

    res.status(201).json({
      success: true,
      data: newOrg,
      message: "Organization created successfully",
    });
  } catch (error) {
    console.error("Error creating organization:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create organization",
    });
  }
});

// PUT update organization
app.put("/api/organizations/:id", (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    // Check if organization exists
    const existingOrg = getOrgById(id);
    if (!existingOrg) {
      return res.status(404).json({
        success: false,
        error: "Organization not found",
      });
    }

    // Don't allow ID to be updated
    delete updatedFields.id;

    const updatedOrgs = updateOrg(id, updatedFields);

    if (!updatedOrgs) {
      return res.status(500).json({
        success: false,
        error: "Failed to update organization",
      });
    }

    const updatedOrg = getOrgById(id);

    res.json({
      success: true,
      data: updatedOrg,
      message: "Organization updated successfully",
    });
  } catch (error) {
    console.error("Error updating organization:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update organization",
    });
  }
});

// DELETE organization
app.delete("/api/organizations/:id", (req, res) => {
  try {
    const { id } = req.params;

    // Check if organization exists
    const existingOrg = getOrgById(id);
    if (!existingOrg) {
      return res.status(404).json({
        success: false,
        error: "Organization not found",
      });
    }

    const updatedOrgs = deleteOrg(id);

    if (!updatedOrgs) {
      return res.status(500).json({
        success: false,
        error: "Failed to delete organization",
      });
    }

    res.json({
      success: true,
      message: "Organization deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting organization:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete organization",
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(
    `API endpoints available at http://localhost:${PORT}/api/organizations`,
  );
});

// Made with Bob
