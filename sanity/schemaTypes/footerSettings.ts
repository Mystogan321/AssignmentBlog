import { defineField, defineType } from "sanity";

export default defineType({
  name: "footerSettings",
  title: "Footer Settings",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Footer Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "copyright",
      title: "Copyright Text",
      description: "E.g., © 2023 - Lux Ventus by Zine.E.Falouti",
      type: "string",
      initialValue: "© 2023 - Lux Ventus",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Twitter", value: "twitter" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Instagram", value: "instagram" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "icon",
              title: "Custom Icon",
              type: "image",
              description: "Optional: Upload a custom icon for this platform",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "ctaText",
      title: "Call to Action Text",
      type: "string",
      initialValue: "Let's Hang Out",
    }),
  ],
  preview: {
    select: {
      title: "copyright",
    },
    prepare({ title }) {
      return {
        title: "Footer Settings",
        subtitle: title,
      };
    },
  },
});
