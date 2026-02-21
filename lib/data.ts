import { personalInfo, skills, skillRadar, allTechStacks, projects, experiences, testimonials, blogPosts } from "@/data/portfolio";

export const PORTFOLIO_DATA = {
  name: personalInfo.name,
  role: personalInfo.roles,
  bio: personalInfo.bio,
  location: personalInfo.location,
  email: personalInfo.email,
  github: personalInfo.github,
  avatar: personalInfo.avatar,
  cvUrl: personalInfo.cvUrl,
  available: personalInfo.available,

  skills: skills.map((s) => ({ name: s.name, value: s.level, category: s.category })),
  skillRadar,
  allTechStacks,
  projects,
  experience: experiences,
  testimonials: testimonials.map((t) => ({ ...t, text: t.content })),
  blogPosts,
};

export type Project = (typeof PORTFOLIO_DATA.projects)[0];
export type BlogPost = (typeof PORTFOLIO_DATA.blogPosts)[0];
export type Experience = (typeof PORTFOLIO_DATA.experience)[0];