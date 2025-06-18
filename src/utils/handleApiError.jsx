import { toast } from "react-hot-toast";

/**
 * Handles errors thrown by GitHub API (Octokit or fetch).
 * @param {object} err - The error object caught in try/catch.
 * @param {string} context - A custom string for logging/debugging context.
 * @param {string} toastId - Optional toast ID to update an existing toast.
 */
const handleApiError = (err, context = "An error occurred", toastId = null) => {
  const status = err?.status ?? 0;

  let message;

  switch (status) {
    case 400:
      message = "Invalid request. Please try again.";
      break;
    case 401:
      message = "Unauthorized. Please check your access token.";
      break;
    case 403:
      message = "API rate limit exceeded. Try again later.";
      break;
    case 404:
      message = "User not found. Please try another username.";
      break;
    case 422:
      message = "Invalid input format. Please try again.";
      break;
    case 500:
      message = "GitHub server error. Try again shortly.";
      break;
    case 503:
      message = "GitHub is temporarily unavailable. Try again later.";
      break;
    default:
      message = "Network error. Please check your connection.";
  }

  console.error(`${context} (status ${status}):`, err);

  toast.error(message, {
    id: toastId,
    duration: 4000,
  });
};

export default handleApiError;
