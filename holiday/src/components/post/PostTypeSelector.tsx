
import { Button } from "@/components/ui/button";

interface PostTypeSelectorProps {
  postType: "listing" | "seeking";
  setPostType: React.Dispatch<React.SetStateAction<"listing" | "seeking">>;
  disabled: boolean;
}

const PostTypeSelector = ({ postType, setPostType, disabled }: PostTypeSelectorProps) => {
  return (
    <div className="mb-6">
      <p className="font-medium mb-2">I AM: (Choose 1)</p>
      <div className="flex gap-4">
        <Button
          type="button"
          variant={postType === "listing" ? "default" : "outline"}
          onClick={() => setPostType("listing")}
          className={`flex-1 ${postType === "listing" ? "bg-holiday-red hover:bg-red-600" : ""}`}
          disabled={disabled}
        >
          Listing my space
        </Button>
        <Button
          type="button"
          variant={postType === "seeking" ? "default" : "outline"}
          onClick={() => setPostType("seeking")}
          className={`flex-1 ${postType === "seeking" ? "bg-holiday-red hover:bg-red-600" : ""}`}
          disabled={disabled}
        >
          Seeking a sublet
        </Button>
      </div>
    </div>
  );
};

export default PostTypeSelector;
