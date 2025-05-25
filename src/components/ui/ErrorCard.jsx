function ErrorCard({ error }) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white px-6 py-8 shadow-2xl dark:bg-neutral-800">
      <div className="textPreset2 flex justify-center text-neutral-700 dark:text-white">
        No results found!
      </div>
      <div className="textPreset6 text-center text-neutral-300 dark:text-neutral-50">
        We couldn't find any GitHub users matching your search. Please
        double-check the username and try again.
      </div>
    </div>
  );
}

export default ErrorCard;
