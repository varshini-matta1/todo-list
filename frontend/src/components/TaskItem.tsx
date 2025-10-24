import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({ task, onToggle, onEdit, onDelete }: TaskItemProps) => {
  return (
    <Card
      className={cn(
        "p-4 transition-all duration-300 hover:shadow-md animate-scale-in group",
        task.completed && "bg-accent/30 border-success/20"
      )}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(task._id)}
          className="mt-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-full"
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? (
            <CheckCircle2 className="w-6 h-6 text-success" />
          ) : (
            <Circle className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              className={cn(
                "text-lg font-semibold transition-all",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </h3>
            {task.completed && (
              <Badge variant="outline" className="bg-success/10 text-success border-success/20 shrink-0">
                Completed
              </Badge>
            )}
          </div>

          {task.description && (
            <p
              className={cn(
                "text-sm text-muted-foreground mt-1 whitespace-pre-wrap",
                task.completed && "line-through opacity-60"
              )}
            >
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(task)}
              className="transition-all hover:bg-primary/10 hover:border-primary hover:text-primary"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(task._id)}
              className="transition-all hover:bg-destructive/10 hover:border-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskItem;
