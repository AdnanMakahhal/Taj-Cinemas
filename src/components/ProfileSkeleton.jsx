import Skeleton from "../ui/Skeleton";

function ProfileSkeleton() {
  return (
    <div
      aria-busy="true"
      className="mx-auto min-h-screen max-w-7xl px-5 pb-12 pt-24 text-white sm:px-8"
    >
      <span role="status" className="sr-only">Loading your profile...</span>
      <header className="mb-7">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Your profile
        </h1>
        <p className="mt-1 text-sm text-white/50">
          A few details to make every cinema visit feel more like you.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-white/10 bg-[#141619]/90 p-5">
          <div aria-hidden="true" className="flex flex-col items-center">
            <Skeleton className="size-16 rounded-full border border-white/10" />
            <Skeleton className="mt-3 h-7 w-36" />
            <div className="mt-2 text-xs text-white/40">Your cinema account</div>
          </div>
          <Skeleton className="mt-5 h-[42px] w-full rounded-lg" />
        </aside>

        <div className="space-y-4">
          {[
            { title: "Personal details", fields: ["First name", "Last name", "Email address", "Phone number"] },
            { title: "Your cinema preferences", fields: ["Preferred city", "Preferred cinema"] },
          ].map(({ title, fields }) => (
            <section key={title} className="rounded-2xl border border-white/10 bg-[#141619]/90 p-5">
              <h2 className="mb-4 text-lg font-semibold">{title}</h2>
              <div aria-hidden="true" className="grid gap-4 sm:grid-cols-2">
                {fields.map((field, index) => (
                  <div key={field}>
                    <span className="mb-1 block text-xs text-white/55">{field}</span>
                    <div className="flex h-11 items-center rounded-lg border border-white/10 bg-white/[0.03] px-3">
                      <Skeleton className={`h-3 ${index % 2 === 0 ? "w-3/5" : "w-2/5"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
          <div aria-hidden="true" className="flex flex-wrap gap-2">
            <Skeleton className="h-[42px] w-[133px] rounded-lg" />
            <Skeleton className="h-[42px] w-[161px] rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSkeleton;
