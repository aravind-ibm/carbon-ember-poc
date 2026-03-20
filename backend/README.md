# FE Onboarding Backend

A Node.js REST API backend for managing organization data using JSON file storage.

## Features

- RESTful API endpoints for CRUD operations
- JSON file-based data persistence
- CORS enabled for frontend integration
- Input validation and error handling
- Request logging

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

## Installation

1. Navigate to the backend directory:

```bash
cd /Users/aravindvm/Desktop/Ember-Projects/fe-onboarding-backend
```

2. Install dependencies:

```bash
npm install
```

## Running the Server

### Development mode (with auto-reload):

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

The server will start on `http://localhost:3000` by default.

## API Endpoints

### Base URL

```
http://localhost:3000/api
```

### Health Check

```
GET /health
```

Returns server status.

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2026-03-16T09:30:00.000Z"
}
```

### Get All Organizations

```
GET /api/organizations
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "1710577200000",
      "organization": "Acme Corp",
      "location": "New York",
      "employees": 100
    }
  ],
  "count": 1
}
```

### Get Single Organization

```
GET /api/organizations/:id
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "1710577200000",
    "organization": "Acme Corp",
    "location": "New York",
    "employees": 100
  }
}
```

### Create Organization

```
POST /api/organizations
```

**Request Body:**

```json
{
  "organization": "Tech Startup",
  "location": "San Francisco",
  "employees": 50
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "1710577200000",
    "organization": "Tech Startup",
    "location": "San Francisco",
    "employees": 50
  },
  "message": "Organization created successfully"
}
```

### Update Organization

```
PUT /api/organizations/:id
```

**Request Body:**

```json
{
  "organization": "Tech Startup Inc",
  "employees": 75
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "1710577200000",
    "organization": "Tech Startup Inc",
    "location": "San Francisco",
    "employees": 75
  },
  "message": "Organization updated successfully"
}
```

### Delete Organization

```
DELETE /api/organizations/:id
```

**Response:**

```json
{
  "success": true,
  "message": "Organization deleted successfully"
}
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## Data Storage

Data is stored in a JSON file at:

```
/data/organizations.json
```

The file is automatically created on first run if it doesn't exist.

## Project Structure

```
fe-onboarding-backend/
├── src/
│   ├── server.js      # Express server and API routes
│   └── storage.js     # JSON file storage utilities
├── data/
│   └── organizations.json  # Data storage file (auto-created)
├── package.json
└── README.md
```

## Environment Variables

- `PORT` - Server port (default: 3000)

Example:

```bash
PORT=4000 npm start
```

## CORS Configuration

CORS is enabled for all origins by default. To restrict origins, modify the CORS configuration in `src/server.js`:

```javascript
app.use(
  cors({
    origin: "http://localhost:4200", // Your frontend URL
  }),
);
```

## Development Notes

- The server uses ES modules (`type: "module"` in package.json)
- Organization IDs are generated using timestamps
- All data operations are synchronous for simplicity
- Request logging is enabled by default

## Testing the API

You can test the API using curl, Postman, or any HTTP client:

```bash
# Get all organizations
curl http://localhost:3000/api/organizations

# Create an organization
curl -X POST http://localhost:3000/api/organizations \
  -H "Content-Type: application/json" \
  -d '{"organization":"Test Corp","location":"Boston","employees":25}'

# Update an organization
curl -X PUT http://localhost:3000/api/organizations/1710577200000 \
  -H "Content-Type: application/json" \
  -d '{"employees":30}'

# Delete an organization
curl -X DELETE http://localhost:3000/api/organizations/1710577200000
```

## License

MIT
