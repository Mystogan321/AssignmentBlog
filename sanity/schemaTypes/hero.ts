import { Rule } from "sanity";

// schemas/hero.js
export default {
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    {
      name: "magazineTitle",
      title: "Magazine Title",
      type: "string",
      description:
        'The magazine title displayed at the top of the hero (default: "LUX VENTUS MAGAZINE")',
      validation: (Rule: Rule) => Rule.max(50),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "The main title of the hero section",
      validation: (Rule: Rule) => Rule.required().max(100),
    },
    {
      name: "highlightedText",
      title: "Highlighted Text",
      type: "string",
      description:
        "The highlighted portion of the title (will be displayed in cyan)",
      validation: (Rule: Rule) => Rule.required().max(100),
    },
    {
      name: "content",
      title: "Content",
      type: "text",
      description: "The descriptive text displayed below the title",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      description: "The background image for the hero section",
      options: {
        hotspot: true, // Enables the hotspot functionality for better image cropping
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "A description of the image for accessibility",
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "highlightedText",
      media: "backgroundImage",
    },
  },
};
