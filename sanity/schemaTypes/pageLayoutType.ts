// schemas/pageLayout.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "pageLayout",
  title: "Page Layout",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Layout Title",
      type: "string",
      validation: (Rule) => Rule.required().error("A title is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required().error("A slug is required"),
    }),
    // Featured Post (Top Blog)
    defineField({
      name: "featuredPost",
      title: "Featured Post",
      type: "reference",
      to: [{ type: "post" }],
      description: "This post will appear at the top in a large format",
    }),
    // Trending Section (Two blog posts in a row)
    defineField({
      name: "trendingTitle",
      title: "Trending Section Title",
      type: "string",
      description: "Title for the section with two posts in a row (e.g. 'Trending')",
      initialValue: "Trending",
    }),
    defineField({
      name: "trendingPosts",
      title: "Trending Posts",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
      description: "These posts will appear in a two-column grid",
      validation: (Rule) => Rule.max(2).warning("Recommended maximum of 2 posts for this section"),
    }),
    // Stacked Posts Section (Three blog posts stacked)
    defineField({
      name: "stackedTitle",
      title: "Stacked Posts Section Title",
      type: "string",
      description: "Optional title for the section with vertically stacked posts",
    }),
    defineField({
      name: "stackedPosts",
      title: "Stacked Posts",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
      description: "These posts will appear stacked vertically one after another",
    }),
    // Sidebar Content
    defineField({
      name: "sidebarContent",
      title: "Sidebar Content",
      type: "array",
      of: [
        {
          type: "reference",
          name: "sidebarPost",
          title: "Sidebar Post",
          to: [{ type: "post" }],
        },
        {
          type: "reference",
          name: "sidebarWidget",
          title: "Sidebar Widget",
          to: [{ type: "sidebarWidget" }],
        },
      ],
      description: "Content to show in the sidebar area (300-400px width)",
    }),
    defineField({
      name: "isActive",
      title: "Active Layout",
      type: "boolean",
      description: "Is this the active layout to use on the site?",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      active: "isActive",
    },
    prepare(selection) {
      const { title, active } = selection;
      return {
        title,
        subtitle: active ? "Active Layout" : "Inactive",
      };
    },
  },
});