import FollowerCard from "./FollwerCard";
import { dummyFollowers } from "../../data/dummyData";

function Followers({ followers }) {
  if (!followers) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
          Followers
        </h2>
        <div className="text-center text-sm text-neutral-500 dark:text-neutral-300">
          This user has no followers to display.
        </div>
      </div>
    );
  }

  const data = followers?.length ? followers : dummyFollowers;
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
        Followers
      </h2>
      <div className="grid auto-rows-fr grid-cols-2 gap-4">
        {data.map((follower) => (
          <FollowerCard key={follower.login} follower={follower} />
        ))}
      </div>
    </div>
  );
}

export default Followers;
