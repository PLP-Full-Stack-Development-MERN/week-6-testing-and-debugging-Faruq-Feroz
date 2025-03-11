# MERN Bug Tracker

A comprehensive bug tracking application built with the MERN stack (MongoDB, Express, React, Node.js) with a focus on testing and debugging best practices.

## Features

- Create, view, update, and delete bug reports
- Update bug status (open, in-progress, resolved)
- Set bug severity levels
- Assign bugs to team members
- Complete test coverage (unit and integration tests)
- Error handling and debugging implementation

## Project Structure

```
mern-bug-tracker/
├── backend/                # Node.js and Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── tests/              # Backend tests
│   │   ├── unit/           # Unit tests
│   │   └── integration/    # Integration tests
│   ├── utils/              # Utility functions
│   └── middleware/         # Custom middleware
├── frontend/               # React frontend
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # React components
│       ├── services/       # API service functions
│       └── tests/          # Frontend tests
│           ├── unit/       # Component tests
│           └── integration/ # API tests
└── README.md               # Project documentation
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup Instructions

1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Configure backend environment:
   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/bug-tracker
   NODE_ENV=development
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Configure frontend environment:
   Create a `.env` file in the frontend directory with:
   ```
   REACT_APP_API_URL=http://localhost:5000/api/bugs
   ```

## Running the Application

### Development Mode

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Testing

### Backend Tests

Run backend tests with:
```bash
cd backend
npm test           # Run all tests
npm run test:watch # Run tests in watch mode
```

### Frontend Tests

Run frontend tests with:
```bash
cd frontend
npm test           # Run all tests
npm test -- --coverage # Run tests with coverage report
```

## Testing Approach

This project implements a comprehensive testing strategy:

### Backend Testing

1. **Unit Tests**: Testing individual utility functions and helpers to ensure they work correctly in isolation.
   - Validator functions for bug data
   - Formatter functions for API responses

2. **Integration Tests**: Testing API endpoints to ensure they work correctly with the database.
   - GET /api/bugs - Fetches all bugs
   - POST /api/bugs - Creates a new bug
   - PUT /api/bugs/:id - Updates a bug
   - DELETE /api/bugs/:id - Deletes a bug

3. **Test Coverage**: Ensuring critical paths have test coverage.

### Frontend Testing

1. **Component Tests**: Testing individual React components in isolation.
   - Form validation
   - UI rendering under different states
   - Event handling

2. **Integration Tests**: Testing interaction with the API.
   - API service functions
   - Component integration

## Debugging Techniques

This project implements various debugging techniques:

### Backend Debugging

1. **Error Middleware**: Centralized error handling for consistent error responses.
2. **Console Logging**: Strategic logging for tracking application flow.
3. **Node.js Inspector**: For advanced debugging with breakpoints.

### Frontend Debugging

1. **Error Boundaries**: Catching and handling React component errors.
2. **React DevTools**: For inspecting component state and props.
3. **Network Monitoring**: Using browser DevTools to inspect API calls.

## Error Handling Implementation

### Backend Error Handling

- Custom error middleware for consistent error responses.
- Try-catch blocks in controllers for granular error handling.
- Proper HTTP status codes returned for different scenarios.
- Validation errors handled with descriptive messages.

### Frontend Error Handling

- Global error boundaries to catch component crashes.
- API error handling with user-friendly messages.
- Loading and error states in UI components.

## API Endpoints

| Method | Endpoint            | Description               |
|--------|---------------------|---------------------------|
| GET    | /api/bugs           | Fetch all bugs            |
| POST   | /api/bugs           | Create a new bug report   |
| GET    | /api/bugs/:id       | Get a single bug          |
| PUT    | /api/bugs/:id       | Update a bug              |
| DELETE | /api/bugs/:id       | Delete a bug              |

## Technologies Used

### Frontend
- React.js
- React Router
- Axios
- Styled Components / SCSS

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- Jest & Supertest for testing

### DevOps & Tools
- Postman for API testing
- ESLint & Prettier for code formatting

## Future Enhancements
- Implement role-based access control (RBAC)
- Real-time notifications using WebSockets
- Advanced filtering and search for bug reports
- Export bug reports as PDF or CSV
- User activity logs for tracking changes



