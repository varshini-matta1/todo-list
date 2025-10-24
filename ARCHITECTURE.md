# Todo List Application Architecture

## 🏗️ MVC Architecture Overview

This application follows the **Model-View-Controller (MVC)** architectural pattern, providing clear separation of concerns between data management, business logic, and user interface.

## 📁 Project Structure

```
todo-list/
├── frontend/                    # View Layer (React Frontend)
│   ├── src/
│   │   ├── components/          # Reusable UI Components
│   │   │   ├── TaskForm.tsx    # Task creation/editing form
│   │   │   ├── TaskItem.tsx    # Individual task display
│   │   │   └── Navbar.tsx      # Navigation component
│   │   ├── pages/              # Page Components
│   │   │   └── Home.tsx        # Main application page
│   │   ├── api/                # API Integration Layer
│   │   │   └── taskApi.ts      # API client for backend communication
│   │   └── hooks/              # Custom React hooks
│   └── package.json
├── backend/                     # Model & Controller Layer
│   ├── models/                 # Model Layer (Data)
│   │   └── Task.js             # Task data model (Mongoose schema)
│   ├── controllers/            # Controller Layer (Business Logic)
│   │   └── taskController.js   # Task business logic & API handlers
│   ├── routes/                 # Route Layer (API Endpoints)
│   │   └── taskRoutes.js       # Task API routes
│   ├── config/                 # Configuration
│   │   └── database.js         # Database connection config
│   ├── server.js               # Application entry point
│   └── package.json
└── README.md
```

## 🔄 MVC Flow

### 1. **Model Layer** (Backend - Data Management)
**Location**: `backend/models/Task.js`

**Responsibilities**:
- Define data structure and validation rules
- Handle database operations
- Enforce business rules at the data level

**Key Features**:
- Mongoose schema with validation
- Virtual fields for formatted dates
- Pre-save middleware for timestamps
- Database indexes for performance

```javascript
// Example: Task Model
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 200 },
  description: { type: String, maxlength: 1000 },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
```

### 2. **Controller Layer** (Backend - Business Logic)
**Location**: `backend/controllers/taskController.js`

**Responsibilities**:
- Handle HTTP requests and responses
- Implement business logic
- Coordinate between models and routes
- Error handling and validation

**Key Features**:
- CRUD operations (Create, Read, Update, Delete)
- Input validation and sanitization
- Error handling with proper HTTP status codes
- Business logic for task management

```javascript
// Example: Create Task Controller
const createTask = async (req, res) => {
  try {
    const { title, description, completed = false } = req.body;
    
    // Validation
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    const task = new Task({ title, description, completed });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};
```

### 3. **View Layer** (Frontend - User Interface)
**Location**: `frontend/src/`

**Responsibilities**:
- Render user interface
- Handle user interactions
- Display data from the backend
- Manage client-side state

**Key Features**:
- React components for UI
- State management with React hooks
- API integration with fetch/axios
- Responsive design with Tailwind CSS

```typescript
// Example: Task Form Component
const TaskForm = ({ onSubmit, initialTitle, initialDescription }) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title, description);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

## 🔄 Data Flow

### 1. **User Interaction** → **View Layer**
- User interacts with React components
- Form submissions, button clicks, etc.

### 2. **View Layer** → **API Layer**
- React components call API functions
- Data is sent to backend via HTTP requests

### 3. **API Layer** → **Controller Layer**
- HTTP requests reach Express routes
- Routes delegate to appropriate controllers

### 4. **Controller Layer** → **Model Layer**
- Controllers use Mongoose models
- Database operations are performed

### 5. **Model Layer** → **Database**
- Mongoose interacts with MongoDB
- Data is persisted or retrieved

### 6. **Response Flow** (Reverse)
- Database → Model → Controller → Route → API → View → User

## 🛠️ Technology Stack by Layer

### **Model Layer**
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: ODM for MongoDB object modeling
- **Validation**: Built-in Mongoose validation

### **Controller Layer**
- **Express.js**: Web framework for HTTP handling
- **Node.js**: Runtime environment
- **Middleware**: CORS, Helmet, Morgan for security and logging

### **View Layer**
- **React**: UI library for component-based interfaces
- **TypeScript**: Type safety for better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library

## 🔗 API Integration

### **Frontend API Client**
**Location**: `frontend/src/api/taskApi.ts`

```typescript
export const taskApi = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    return response.json();
  },
  
  createTask: async (title: string, description: string): Promise<Task> => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, completed: false }),
    });
    return response.json();
  }
};
```

### **Backend API Routes**
**Location**: `backend/routes/taskRoutes.js`

```javascript
router.get('/', getAllTasks);           // GET /api/tasks
router.post('/', createTask);           // POST /api/tasks
router.put('/:id', updateTask);         // PUT /api/tasks/:id
router.delete('/:id', deleteTask);      // DELETE /api/tasks/:id
```

## 🚀 Benefits of This Architecture

### **Separation of Concerns**
- **Models**: Focus on data structure and validation
- **Controllers**: Handle business logic and HTTP concerns
- **Views**: Manage user interface and interactions

### **Maintainability**
- Clear boundaries between layers
- Easy to modify one layer without affecting others
- Testable components

### **Scalability**
- Can easily add new features
- Database operations are centralized
- Frontend and backend can be deployed separately

### **Reusability**
- Models can be reused across different controllers
- Components can be reused across different pages
- API endpoints can serve multiple frontend applications

## 🔧 Development Workflow

1. **Model First**: Define data structure in Mongoose models
2. **Controller Logic**: Implement business logic in controllers
3. **API Routes**: Create RESTful endpoints
4. **Frontend Components**: Build React components
5. **API Integration**: Connect frontend to backend APIs
6. **Testing**: Test each layer independently

This architecture provides a solid foundation for building scalable, maintainable web applications with clear separation of concerns.
