/** Shape of the JSON embedded in the profile README (same as legacy main.json). */
export interface PortfolioMain {
  hero: {
    name: string;
    role: string;
    location: string;
    email: string;
    /** Cal.com (or other) link — only source for the Meet button when set in README JSON. */
    schedule_link?: string;
    profile_image_url?: string;
  };
  /** Optional: exact repo names to show as projects (same user). If omitted, recent public repos are used. */
  pinned_repos?: string[];
  about: string[];
  experience: Array<{
    company: string;
    role: string;
    period: string;
    location: string;
    bullets: string[];
  }>;
  education: Array<{
    degree: string;
    period: string;
    school: string;
    location: string;
    description?: string;
  }>;
  activities: Array<{
    name: string;
    organization: string;
    description: string;
  }>;
  stack: Array<{
    title: string;
    subtitle: string;
    icon_url: string;
  }>;
  awards: Array<{
    title: string;
    issuer: string;
    link?: string | null;
  }>;
  social_links: {
    hero: Array<{ name: string; url: string; icon_name: string }>;
    contact: Array<{ name: string; url: string; icon_name: string }>;
  };
  contact: {
    email: string;
    phone?: string;
    timezone: string;
  };
  /**
   * Blog posts embedded in README (same shape as blog.json items). If set, blog.json is not fetched.
   */
  blogs?: unknown[];
  /**
   * When true, also fetch https://raw.githubusercontent.com/.../blog.json .
   * Omit or false to avoid any blog.json request (no 404 noise when the file does not exist).
   */
  blog_json?: boolean;
}
