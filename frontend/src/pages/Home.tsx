import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import TaskForm from "@/components/TaskForm";
import TaskItem, { Task } from "@/components/TaskItem";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, CheckCircle2, Clock, List } from "lucide-react";
import { taskApi } from "@/api/taskApi";

type FilterType = "all" | "completed" | "pending";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { toast } = useToast();

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskApi.getAllTasks();
      setTasks(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch tasks. Make sure your backend is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (title: string, description: string) => {
    try {
      const newTask = await taskApi.createTask(title, description);
      setTasks([newTask, ...tasks]);
      toast({
        title: "Success",
        description: "Task added successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add task. Check your backend connection.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTask = async (title: string, description: string) => {
    if (!editingTask) return;
    
    try {
      const updated = await taskApi.updateTask(editingTask._id, { title, description });
      setTasks(tasks.map((task) => (task._id === updated._id ? updated : task)));
      setEditingTask(null);
      toast({
        title: "Success",
        description: "Task updated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task.",
        variant: "destructive",
      });
    }
  };

  const handleToggleTask = async (id: string) => {
    const task = tasks.find((t) => t._id === id);
    if (!task) return;

    try {
      const updated = await taskApi.toggleTask(id, !task.completed);
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task status.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskApi.deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
      toast({
        title: "Success",
        description: "Task deleted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task.",
        variant: "destructive",
      });
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-slide-up">
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-lg">
                <List className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-success/10 to-success/5 border-success/20 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-success/20 p-2 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-muted/50 to-muted/20 border-muted shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-muted p-2 rounded-lg">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Task Form */}
        <div className="mb-8">
          {editingTask ? (
            <TaskForm
              onSubmit={handleUpdateTask}
              initialTitle={editingTask.title}
              initialDescription={editingTask.description}
              isEditing
              onCancel={() => setEditingTask(null)}
            />
          ) : (
            <TaskForm onSubmit={handleAddTask} />
          )}
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 animate-fade-in">
          <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterType)}>
            <TabsList className="grid w-full md:w-[400px] grid-cols-3 bg-muted/50">
              <TabsTrigger value="all" className="transition-all">
                All
              </TabsTrigger>
              <TabsTrigger value="completed" className="transition-all">
                Completed
              </TabsTrigger>
              <TabsTrigger value="pending" className="transition-all">
                Pending
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Task List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-muted/50 p-4 rounded-full">
                <CheckCircle2 className="w-12 h-12 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">No tasks found</h3>
                <p className="text-muted-foreground">
                  {filter === "all"
                    ? "Add your first task to get started!"
                    : `No ${filter} tasks yet.`}
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onToggle={handleToggleTask}
                onEdit={setEditingTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
