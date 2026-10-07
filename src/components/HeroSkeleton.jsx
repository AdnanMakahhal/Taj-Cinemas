import Skeleton from "../ui/Skeleton";

function HeroSkeleton() {
  return (
    <div
      aria-busy="true"
      className="relative h-screen min-h-[500px] w-full overflow-hidden bg-[#11161B] 2xl:max-h-[1200px]"
    >
      <span role="status" className="sr-only">Loading trending movies...</span>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_30%,rgba(65,83,95,0.35),transparent_65%)]" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-center px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-44">
        <div className="mb-3 flex h-16 w-[220px] max-w-full flex-col justify-center gap-3 sm:mb-5 sm:h-24 sm:w-[320px] md:h-32 md:w-[400px] lg:h-40 lg:w-[480px] xl:h-48 xl:w-[560px] 2xl:h-56 2xl:w-[640px]">
          <Skeleton className="h-2/5 w-full rounded-lg" />
          <Skeleton className="h-1/4 w-2/3 rounded-lg" />
        </div>

        <div className="mb-3 flex flex-wrap gap-2 sm:mb-5 sm:gap-3 md:gap-5">
          {["w-24 sm:w-32", "w-24 sm:w-32", "w-20 sm:w-28"].map((width, index) => (
            <Skeleton key={index} className={`${width} h-6 rounded-full sm:h-8 md:h-10 lg:h-11 2xl:h-12`} />
          ))}
        </div>

        <div className="mb-4 w-full space-y-2 sm:mb-5 sm:w-[85%] md:w-[65%] md:space-y-3 lg:w-[50%] xl:w-[45%] 2xl:w-[40%]">
          <Skeleton className="h-3 w-full sm:h-4 md:h-5 lg:h-6 2xl:h-8" />
          <Skeleton className="h-3 w-[92%] sm:h-4 md:h-5 lg:h-6 2xl:h-8" />
          <Skeleton className="h-3 w-3/5 sm:h-4 md:h-5 lg:h-6 2xl:h-8" />
        </div>

        <div className="flex flex-wrap gap-3 sm:gap-5">
          <Skeleton className="h-8 w-24 rounded-xl sm:h-11 sm:w-32 md:h-13 md:w-36 lg:h-14 2xl:h-16 2xl:w-44" />
          <Skeleton className="h-8 w-32 rounded-xl sm:h-11 sm:w-44 md:h-13 md:w-48 lg:h-14 2xl:h-16 2xl:w-60" />
        </div>
      </div>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-[calc(88px+env(safe-area-inset-bottom))] flex h-2.5 items-center justify-center gap-2 sm:bottom-[30px]">
        <Skeleton className="h-2.5 w-[30px] rounded-full" />
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <Skeleton key={item} className="size-2.5 rounded-full" />
        ))}
      </div>
    </div>
  );
}

export default HeroSkeleton;
