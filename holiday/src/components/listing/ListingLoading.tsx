
import Header from "@/components/Header";

const ListingLoading = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto p-4 max-w-screen-md">
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse">Loading...</div>
        </div>
      </main>
    </div>
  );
};

export default ListingLoading;
