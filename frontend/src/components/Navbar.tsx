import { CheckSquare } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-primary to-primary-glow p-2 rounded-lg shadow-md">
            <CheckSquare className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            To-Do List Manager
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
