const STORAGE_KEY = 'hds_org_data';

export function getStoredOrgs() {
  const data = localStorage.getItem(STORAGE_KEY);
  const result = data ? JSON.parse(data) : null;
  if (result) return result;
  else
    return [
      {
        id: '1',
        organization: 'IBM',
        industry: 'IT',
        employeeCount: 3040,
        location: 'Kochi',
      },
      {
        id: '2',
        organization: 'L7',
        industry: 'IT',
        employeeCount: 1040,
        location: 'Kochi',
      },
    ];
}

/**
 * CREATE: Generates a String ID from current milliseconds
 */
export function createOrg(orgData) {
  const orgs = getStoredOrgs();

  const newEntry = {
    ...orgData,
    id: Date.now().toString(), // "1704542400000"
  };

  const updatedOrgs = [...orgs, newEntry];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrgs));
  return updatedOrgs;
}

/**
 * UPDATE: Uses string comparison for the ID
 */
export function updateOrg(id, updatedFields) {
  const orgs = getStoredOrgs();
  const idToMatch = id;

  const updatedOrgs = orgs.map((org) => {
    return org.id === idToMatch ? { ...org, ...updatedFields } : org;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrgs));
  return updatedOrgs;
}

/**
 * DELETE: Uses string filtering
 */
export function deleteOrg(id) {
  const orgs = getStoredOrgs();
  const idToMatch = String(id);

  const updatedOrgs = orgs.filter((org) => String(org.id) !== idToMatch);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrgs));
  return updatedOrgs;
}

/**
 * Get: Uses string filtering
 */
export function getOrgById(id) {
  const orgs = getStoredOrgs();
  const idToMatch = String(id);

  const updatedOrgs = orgs.filter((org) => String(org.id) !== idToMatch);
  return updatedOrgs;
}
