import { getLanguageColor } from "../../utils/colorUtils";

function PinnedRepos({ repos }) {
  if (!repos || repos.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-neutral-800 dark:text-white">
        Pinned Repositories
      </h2>

      {repos.map((repo) => (
        <div
          key={repo.name}
          className="rounded-xl bg-white p-4 shadow-md dark:bg-neutral-800"
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
