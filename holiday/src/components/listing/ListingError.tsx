
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

interface ListingErrorProps {
  error: string | null;
}

const ListingError = ({ error }: ListingErrorProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto p-4 max-w-screen-md">
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          {error || "Listing not found"}
        </div>
        <Button asChild className="mt-4">
          <Link to="/">Back to listings</Link>
        </Button>
      </main>
    </div>
  );
};

export default ListingError;
