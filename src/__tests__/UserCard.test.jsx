import { render, screen } from "@testing-library/react";
import UserCard from "../components/ui/UserCard";
import { describe, it, expect } from "vitest";

describe("UserCard", () => {
  it("renders fallback if no name or bio", () => {
    const dummyUser = {
      name: null,
      login: "kenyu394",
      bio: null,
      avatar_url: "https://example.com/avatar.png",
      html_url: "https://github.com/kenyu394",
      public_repos: 0,
      followers: 0,
      following: 0,
      location: "Vancouver, BC",
      twitter_username: null,
      blog: "",
      company: null,
      created_at: new Date().toISOString(),
    };

    render(<UserCard userData={dummyUser} />);
    expect(screen.getByText(/no name/i)).toBeInTheDocument();
    expect(screen.getByText(/no bio/i)).toBeInTheDocument();
  });
});
