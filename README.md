# FE Onboarding Exercise

A full-stack organization management application built with Ember.js (frontend) and Node.js/Express (backend).

## Project Structure

```
fe-onboarding-exercise/
├── frontend/          # Ember.js application
├── backend/           # Node.js/Express API server
├── .github/           # GitHub workflows and configurations
└── README.md          # This file
```

## Prerequisites

You will need the following things properly installed on your computer:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [Google Chrome](https://google.com/chrome/) (for development)

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd fe-onboarding-exercise
```

### 2. Install Dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd frontend
npm install
```

### 3. Start the Application

You'll need two terminal windows/tabs:

**Terminal 1 - Start Backend Server:**

```bash
cd backend
npm start
```

The backend API will be available at `http://localhost:3000`

**Terminal 2 - Start Frontend Development Server:**

```bash
cd frontend
npm start
```

The frontend application will be available at `http://localhost:4200`

## Features

### Frontend (Ember.js)

- Organization listing with filtering and sorting
- Create, read, update, and delete (CRUD) operations
- Data visualization with charts
- Responsive design
- Form validation
- Notification system
- Pagination support

### Backend (Node.js/Express)

- RESTful API endpoints
- JSON file-based data persistence
- CORS enabled for frontend integration
- Input validation and error handling
- Request logging

## API Endpoints

Base URL: `http://localhost:3000/api`

- `GET /api/organizations` - Get all organizations
- `GET /api/organizations/:id` - Get a single organization
- `POST /api/organizations` - Create a new organization
- `PUT /api/organizations/:id` - Update an organization
- `DELETE /api/organizations/:id` - Delete an organization

For detailed API documentation, see [backend/README.md](backend/README.md)

## Development

### Frontend Development

```bash
cd frontend

# Run development server
npm start

# Run tests
npm test

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Build for production
npm run build
```

Visit the app at [http://localhost:4200](http://localhost:4200)

### Backend Development

```bash
cd backend

# Run with auto-reload (development)
npm run dev

# Run in production mode
npm start
```

The API will be available at [http://localhost:3000](http://localhost:3000)

## Testing

### Frontend Tests

```bash
cd frontend
npm test
```

Visit tests at [http://localhost:4200/tests](http://localhost:4200/tests)

### Backend Testing

You can test the API using curl, Postman, or any HTTP client:

```bash
# Get all organizations
curl http://localhost:3000/api/organizations

# Create an organization
curl -X POST http://localhost:3000/api/organizations \
  -H "Content-Type: application/json" \
  -d '{"organization":"Test Corp","location":"Boston","employees":25}'
```

## Technology Stack

### Frontend

- **Framework:** Ember.js 6.8
- **Build Tool:** Vite 7.x
- **UI Components:** HashiCorp Design System Components
- **Data Visualization:** Chart.js
- **Testing:** QUnit, Ember Test Helpers
- **Linting:** ESLint, Stylelint, Prettier

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Storage:** JSON file-based
- **CORS:** Enabled for cross-origin requests

## Project Configuration

### Environment Variables

**Frontend:**

- Configuration is managed through `frontend/config/environment.js`
- Development environment variables can be set in `frontend/.env.development`

**Backend:**

- `PORT` - Server port (default: 3000)

### Ports

- Frontend: `4200` (Vite dev server)
- Backend: `3000` (Express API server)

## Troubleshooting

### Frontend won't start

1. Ensure you're in the `frontend` directory
2. Run `npm install` to install dependencies
3. Check that port 4200 is not in use
4. Verify Node.js version is 18 or higher

### Backend won't start

1. Ensure you're in the `backend` directory
2. Run `npm install` to install dependencies
3. Check that port 3000 is not in use
4. Verify the `data` directory exists

### API connection errors

1. Ensure the backend server is running on port 3000
2. Check CORS configuration in `backend/src/server.js`
3. Verify the API endpoint in `frontend/app/adapters/org.js`

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## Documentation

- [Frontend Documentation](frontend/README.md)
- [Backend Documentation](backend/README.md)

## Further Reading

- [Ember.js Documentation](https://emberjs.com/)
- [Vite Documentation](https://vite.dev)
- [Express.js Documentation](https://expressjs.com/)
- [Ember Inspector for Chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
- [Ember Inspector for Firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## License

MIT
