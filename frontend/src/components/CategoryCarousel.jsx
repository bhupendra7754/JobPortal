import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer"
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="px-4 max-w-5xl mx-auto my-20">
      <Carousel className="w-full relative">
        {/* Previous Arrow */}
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100" />

        {/* Next Arrow */}
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100" />

        <CarouselContent className="flex justify-center gap-4">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 flex justify-center"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full px-6 py-2 whitespace-nowrap"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
