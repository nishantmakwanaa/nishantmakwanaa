import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <main className="max-w-[722px] mx-auto px-4 sm:px-6 py-10 min-h-screen">
        <div className="flex flex-col items-center justify-center text-center pt-16 min-h-[70vh]">
          <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
          <p className="text-lg text-muted-foreground mb-6">Page not found</p>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
