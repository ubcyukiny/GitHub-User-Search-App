import { useRef, useState } from "react";

export default function ShareButtonWithModal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef();

  const url = window.location.href;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
      >
        <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.5 3A3.5 3.5 0 0 0 14 7L8.1 9.8A3.5 3.5 0 0 0 2 12a3.5 3.5 0 0 0 6.1 2.3l6 2.7-.1.5a3.5 3.5 0 1 0 1-2.3l-6-2.7a3.5 3.5 0 0 0 0-1L15 9a3.5 3.5 0 0 0 6-2.4c0-2-1.6-3.5-3.5-3.5Z" />
        </svg>
        Share
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-neutral-800">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-700 dark:text-white">
                Share Link
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
              >
                <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-sm text-neutral-700 dark:text-white">
                Copy and share this link:
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  readOnly
                  value={url}
                  className="w-full rounded-lg border border-neutral-300 bg-neutral-50 p-2 text-sm text-neutral-700 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
                />
                <button
                  onClick={handleCopy}
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  {copied ? (
                    <svg
                      className="h-4 w-4 text-blue-600"
                      viewBox="0 0 16 12"
                      fill="none"
                    >
                      <path
                        d="M1 5.917 5.724 10.5 15 1.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-4 w-4 text-neutral-700 dark:text-white"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                {copied ? "Link copied!" : "Click icon to copy"}
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
