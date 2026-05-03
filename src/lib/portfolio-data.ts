// Maps README portfolio JSON → shapes consumed by the UI.
// Source: https://raw.githubusercontent.com/nishantmakwanaa/nishantmakwanaa/main/README.md

import { GITHUB_PROFILE_AVATAR_URL } from "@/lib/github-profile-config";
import type { PortfolioMain } from "@/types/portfolio-main";

export function toHeroInfo(main: PortfolioMain) {
  return {
    id: "hero" as const,
    name: main.hero.name,
    role: main.hero.role,
    location: main.hero.location,
    email: main.hero.email,
    schedule_link: main.hero.schedule_link ?? "",
    profile_image_url: GITHUB_PROFILE_AVATAR_URL,
  };
}

export function toAboutData(main: PortfolioMain) {
  return main.about.map((content: string, i: number) => ({
    id: `about-${i}`,
    content,
    sort_order: i,
  }));
}

export function toExperienceData(main: PortfolioMain) {
  return main.experience.map((exp, i: number) => ({
    id: `exp-${i}`,
    company: exp.company,
    role: exp.role,
    period: exp.period,
    location: exp.location,
    bullets: exp.bullets,
    sort_order: i,
  }));
}

export function toEducationData(main: PortfolioMain) {
  return main.education.map((edu, i: number) => ({
    id: `edu-${i}`,
    degree: edu.degree,
    period: edu.period,
    school: edu.school,
    location: edu.location,
    description: edu.description || null,
    sort_order: i,
  }));
}

export function toActivitiesData(main: PortfolioMain) {
  return main.activities.map((act, i: number) => ({
    id: `act-${i}`,
    name: act.name,
    organization: act.organization,
    description: act.description,
    sort_order: i,
  }));
}

export function toStackData(main: PortfolioMain) {
  return main.stack.map((item, i: number) => ({
    id: `stack-${i}`,
    title: item.title,
    subtitle: item.subtitle,
    icon_url: item.icon_url,
    sort_order: i,
  }));
}

export function toAwardsData(main: PortfolioMain) {
  return main.awards.map((award, i: number) => ({
    id: `award-${i}`,
    title: award.title,
    issuer: award.issuer,
    link: award.link || null,
    sort_order: i,
  }));
}

export function toSocialLinks(main: PortfolioMain, section: string) {
  const bucket = main.social_links as Record<string, PortfolioMain["social_links"]["hero"]>;
  const links = bucket[section] || [];
  return links.map((link, i: number) => ({
    id: `social-${section}-${i}`,
    name: link.name,
    url: link.url,
    icon_name: link.icon_name,
    section,
    sort_order: i,
  }));
}

export function toContactInfo(main: PortfolioMain) {
  return {
    id: "contact" as const,
    email: main.contact.email,
    phone: main.contact.phone || null,
    timezone: main.contact.timezone,
  };
}
