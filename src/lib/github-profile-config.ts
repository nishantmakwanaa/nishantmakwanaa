/** GitHub profile repo that hosts README (portfolio JSON), blog.json, and resume PDF. */
export const GITHUB_PROFILE_USERNAME = "nishantmakwanaa";
export const GITHUB_PROFILE_REPO = "nishantmakwanaa";

export const GITHUB_README_RAW = `https://raw.githubusercontent.com/${GITHUB_PROFILE_USERNAME}/${GITHUB_PROFILE_REPO}/main/README.md`;

export const GITHUB_BLOG_JSON_RAW = `https://raw.githubusercontent.com/${GITHUB_PROFILE_USERNAME}/${GITHUB_PROFILE_REPO}/main/blog.json`;

/** GitHub serves the user's avatar at this URL (redirects to avatars.githubusercontent.com). */
export const GITHUB_PROFILE_AVATAR_URL = `https://github.com/${GITHUB_PROFILE_USERNAME}.png`;

export const GITHUB_REPO_CONTENTS_API = `https://api.github.com/repos/${GITHUB_PROFILE_USERNAME}/${GITHUB_PROFILE_REPO}/contents?ref=main`;
