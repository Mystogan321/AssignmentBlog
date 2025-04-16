import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  // Uncomment below to have only one instance of site settings
  // __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      description:
        "The main title of the website (e.g., for SEO and browser tabs)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
      description: "A short description of the website (for SEO)",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: 'E.g., "Lux Ventus Logo"',
        },
      ],
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "string",
      description: "E.g., © 2023 Lux Ventus",
    }),
    // Add social links, contact info, etc. as needed
    // defineField({
    //   name: 'socialLinks',
    //   title: 'Social Media Links',
    //   type: 'array',
    //   of: [{ type: 'url' }]
    // }),
  ],
  preview: {
    select: {
      title: "title",
      media: "logo",
    },
    prepare({ title, media }) {
      return {
        title: title || "Site Settings",
        subtitle: "Global website configuration",
        media: media,
      };
    },
  },
});
