
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

interface ListingImage {
  id: string;
  image_url: string;
  position: number;
}

interface ListingImageCarouselProps {
  images: ListingImage[];
  title: string;
}

const ListingImageCarousel = ({ images, title }: ListingImageCarouselProps) => {
  // Sort images by position
  const sortedImages = [...images].sort((a, b) => a.position - b.position);

  return (
    <div className="relative mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {sortedImages.map((image) => (
            <CarouselItem key={image.id}>
              <AspectRatio ratio={4/3}>
                <img
                  src={image.image_url}
                  alt={title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-3" />
        <CarouselNext className="-right-3" />
      </Carousel>
    </div>
  );
};

export default ListingImageCarousel;
