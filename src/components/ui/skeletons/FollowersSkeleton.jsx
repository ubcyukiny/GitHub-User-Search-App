import FollowerCardSkeleton from "./FollowerCardSkeleton";

function FollowersSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
        Followers
      </h2>
      <div className="grid auto-rows-fr grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <FollowerCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default FollowersSkeleton;
