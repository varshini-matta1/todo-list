import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, X, CheckSquare } from "lucide-react";

interface TaskFormProps {
  onSubmit: (title: string, description: string) => void;
  initialTitle?: string;
  initialDescription?: string;
  isEditing?: boolean;
  onCancel?: () => void;
}

const TaskForm = ({
  onSubmit,
  initialTitle = "",
  initialDescription = "",
  isEditing = false,
  onCancel,
}: TaskFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title, description);
      if (!isEditing) {
        setTitle("");
        setDescription("");
      }
    }
  };

  return (
    <Card className="p-6 shadow-md animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="text-sm font-medium text-foreground mb-1.5 block">
            Task Title *
          </label>
          <Input
            id="title"
            type="text"
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full transition-all focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="text-sm font-medium text-foreground mb-1.5 block">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Add more details about your task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[100px] transition-all focus:ring-2 focus:ring-primary/20 resize-none"
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-all shadow-md hover:shadow-lg"
          >
            {isEditing ? (
              <>
                <CheckSquare className="w-4 h-4 mr-2" />
                Update Task
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </>
            )}
          </Button>
          {isEditing && onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="transition-all hover:bg-secondary"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default TaskForm;
