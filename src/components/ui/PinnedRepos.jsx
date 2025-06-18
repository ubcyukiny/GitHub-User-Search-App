import { getLanguageColor } from "../../utils/colorUtils";

function PinnedRepos({ repos }) {
  if (!repos || repos.length === 0)
    return (
      <div className="flex min-h-[520px] flex-col gap-4">
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
          Pinned Repositories
        </h2>
        <div className="text-center text-sm text-neutral-500 dark:text-neutral-300">
          This user has no pinned repos to display.
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
        Pinned Repositories
      </h2>

      {repos.map((repo) => (
        <div
          key={repo.name}
          className="rounded-xl bg-white p-4 shadow-md transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.015] hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-500 hover:underline"
          >
            {repo.name}
          </a>

          <p className="mt-1 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
            {repo.description || "No description provided."}
          </p>

          <div className="mt-2 flex gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <span>⭐ {repo.stargazerCount}</span>

            {repo.primaryLanguage && (
              <div className="flex items-center gap-1">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: getLanguageColor(
                      repo.primaryLanguage.name,
                    ),
                  }}
                />
                <span>{repo.primaryLanguage.name}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PinnedRepos;
