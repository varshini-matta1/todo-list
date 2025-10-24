# Todo List Application

A full-stack todo list application built with React (frontend) and Node.js/Express (backend) with MongoDB database.

## 🚀 Features

### Frontend (React + TypeScript)
- ✅ Modern React 18 with TypeScript
- ✅ Beautiful UI with Tailwind CSS and shadcn/ui components
- ✅ Real-time task management (CRUD operations)
- ✅ Task filtering (All/Completed/Pending)
- ✅ Task statistics dashboard
- ✅ Responsive design
- ✅ Smooth animations and transitions
- ✅ Error handling with toast notifications

### Backend (Node.js + Express)
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose ODM
- ✅ MVC architecture
- ✅ Input validation and error handling
- ✅ CORS support for frontend integration
- ✅ Security headers with Helmet
- ✅ Request logging with Morgan

## 🏗️ Project Structure

```
todo-list/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   ├── api/            # API integration
│   │   └── hooks/          # Custom hooks
│   └── package.json
├── backend/                 # Node.js backend
│   ├── models/             # Mongoose models
│   ├── controllers/        # Route controllers
│   ├── routes/             # API routes
│   ├── config/             # Configuration files
│   └── server.js           # Main server file
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Query** - Server state management
- **React Router** - Client-side routing
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Morgan** - HTTP request logger

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Option 1: Automated Setup (Windows)
1. Run the PowerShell script:
```powershell
.\start-dev.ps1
```

### Option 2: Manual Setup

#### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

#### 2. Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

#### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
```

#### 4. Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

## 📡 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a single task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion
- `DELETE /api/tasks/:id` - Delete a task

### Statistics
- `GET /api/tasks/stats` - Get task statistics

### Health Check
- `GET /api/health` - API health status

## 🗄️ Database Schema

### Task Model
```javascript
{
  _id: ObjectId,
  title: String (required, max 200 chars),
  description: String (max 1000 chars),
  completed: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Configuration

### Backend Environment Variables
Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/todo-list
FRONTEND_URL=http://localhost:5173
```

### Frontend API Configuration
The frontend is configured to connect to `http://localhost:5000/api` by default. This can be changed in `frontend/src/api/taskApi.ts`.

## 🧪 Testing the Application

1. **Backend Health Check**: Visit `http://localhost:5000/api/health`
2. **Frontend**: Visit `http://localhost:5173`
3. **Create a task**: Use the form on the frontend
4. **View tasks**: Tasks will appear in the list below the form
5. **Filter tasks**: Use the "All", "Completed", "Pending" tabs
6. **Edit/Delete tasks**: Use the buttons on each task card

## 🚀 Production Deployment

### Backend Deployment
1. Set production environment variables
2. Use a process manager like PM2
3. Set up MongoDB Atlas or production MongoDB instance

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to a static hosting service
3. Update API URL in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in your environment variables

2. **CORS Errors**
   - Verify the FRONTEND_URL in backend environment variables
   - Check that the frontend is running on the correct port

3. **Port Already in Use**
   - Change the PORT in backend environment variables
   - Update the frontend API configuration accordingly

4. **Dependencies Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

## 📞 Support

If you encounter any issues, please check the troubleshooting section above or create an issue in the repository.
