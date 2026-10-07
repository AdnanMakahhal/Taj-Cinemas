import Skeleton from "../ui/Skeleton";

function MovieCardSkeleton() {
  return (
    <div aria-hidden="true" className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.035]">
      <Skeleton className="aspect-2/3 w-full rounded-none" />
      <div className="absolute left-3 top-3 rounded-2xl border border-white/10 bg-[#050505]/60 p-3">
        <Skeleton className="h-4 w-28" />
      </div>
      <div className="h-40 p-3.5">
        <Skeleton className="mb-2 h-7 w-4/5" />
        <div className="mb-3 flex gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-12" />
        </div>
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}

export default MovieCardSkeleton;
