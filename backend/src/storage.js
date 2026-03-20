import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "../data/organizations.json");

/**
 * Initialize the data file if it doesn't exist
 */
function initializeDataFile() {
  const dataDir = path.dirname(DATA_FILE);

  // Create data directory if it doesn't exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Create data file with empty array if it doesn't exist
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
}

/**
 * Read all organizations from the JSON file
 */
export function getStoredOrgs() {
  try {
    initializeDataFile();
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading organizations:", error);
    return [];
  }
}

/**
 * Write organizations to the JSON file
 */
function saveOrgs(orgs) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(orgs, null, 2));
    return true;
  } catch (error) {
    console.error("Error saving organizations:", error);
    return false;
  }
}

/**
 * CREATE: Add a new organization
 */
export function createOrg(orgData) {
  const orgs = getStoredOrgs();

  const newEntry = {
    ...orgData,
    id: Date.now().toString(),
  };

  const updatedOrgs = [...orgs, newEntry];
  const success = saveOrgs(updatedOrgs);

  return success ? updatedOrgs : null;
}

/**
 * UPDATE: Update an existing organization by ID
 */
export function updateOrg(id, updatedFields) {
  const orgs = getStoredOrgs();
  const idToMatch = String(id);

  const updatedOrgs = orgs.map((org) => {
    return org.id === idToMatch ? { ...org, ...updatedFields } : org;
  });

  const success = saveOrgs(updatedOrgs);
  return success ? updatedOrgs : null;
}

/**
 * DELETE: Remove an organization by ID
 */
export function deleteOrg(id) {
  const orgs = getStoredOrgs();
  const idToMatch = String(id);

  const updatedOrgs = orgs.filter((org) => String(org.id) !== idToMatch);

  const success = saveOrgs(updatedOrgs);
  return success ? updatedOrgs : null;
}

/**
 * GET: Find an organization by ID
 */
export function getOrgById(id) {
  const orgs = getStoredOrgs();
  const idToMatch = String(id);

  return orgs.find((org) => String(org.id) === idToMatch);
}

// Made with Bob
