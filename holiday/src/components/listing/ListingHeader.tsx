
interface ListingHeaderProps {
  title: string;
  postType: string;
  formattedCost: string | null;
}

const ListingHeader = ({ title, postType, formattedCost }: ListingHeaderProps) => {
  return (
    <>
      {/* Type Label */}
      <div className="mb-4">
        <span className={`px-3 py-1 rounded-full text-white text-sm ${postType === "seeking" ? "bg-yellow-500" : "bg-holiday-red"}`}>
          {postType === "seeking" ? "Seeking" : "Listing"}
        </span>
      </div>

      {/* Title and Cost */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        {formattedCost && (
          <p className="text-xl font-semibold text-holiday-red mt-1">
            {formattedCost}
          </p>
        )}
      </div>
    </>
  );
};

export default ListingHeader;
