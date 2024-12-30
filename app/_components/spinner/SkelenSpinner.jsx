import { Skeleton } from "@/app/_components/ui/skeleton";

function SkeletonItem() {
  return (
    <div className="space-y-2 flex flex-col">
      <Skeleton className="lg:h-[278px] h-[481px] w-[481px] lg:w-[278px]" />
      <Skeleton className="h-4 w-[250px] md:w-[150px]" />
      <Skeleton className="h-4 w-[200px] md:w-[100px]" />
      <Skeleton className="h-4 w-[150px]  md:w-[50px] self-end" />
    </div>
  );
}

function SkelenSpinner({ count = 9 }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-14 max-w-[1280px] mx-auto opacity-15 mt-24">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </div>
  );
}

export default SkelenSpinner;
