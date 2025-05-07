
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto p-4 max-w-screen-md flex flex-col items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
          <Link to="/">
            <Button className="bg-holiday-red hover:bg-red-600">
              Return to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
