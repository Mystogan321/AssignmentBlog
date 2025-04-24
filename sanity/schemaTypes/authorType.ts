import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Author name is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    }),

    defineField({
      name: "hostLabel",
      title: "Host Label",
      description: 'Label that appears above name (e.g. "YOUR HOST")',
      type: "string",
      initialValue: "YOUR HOST",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      description: "Text for the call-to-action button",
      type: "string",
      initialValue: "Let's Chat",
    }),
    defineField({
      name: "ctaLink",
      title: "CTA Button Link",
      description: "Link for the call-to-action button",
      type: "string",
      initialValue: "/contact",
    }),
    defineField({
      name: "socialIcons",
      title: "Social Media Icons",
      type: "object",
      fields: [
        {
          name: "facebook",
          title: "Facebook",
          type: "object",
          fields: [
            { name: "url", type: "url", title: "URL" },
            {
              name: "icon",
              type: "image",
              title: "Icon",
              options: { hotspot: true },
            },
          ],
        },
        {
          name: "twitter",
          title: "Twitter",
          type: "object",
          fields: [
            { name: "url", type: "url", title: "URL" },
            {
              name: "icon",
              type: "image",
              title: "Icon",
              options: { hotspot: true },
            },
          ],
        },
        {
          name: "linkedin",
          title: "LinkedIn",
          type: "object",
          fields: [
            { name: "url", type: "url", title: "URL" },
            {
              name: "icon",
              type: "image",
              title: "Icon",
              options: { hotspot: true },
            },
          ],
        },
        {
          name: "youtube",
          title: "YouTube",
          type: "object",
          fields: [
            { name: "url", type: "url", title: "URL" },
            {
              name: "icon",
              type: "image",
              title: "Icon",
              options: { hotspot: true },
            },
          ],
        },
        {
          name: "instagram",
          title: "Instagram",
          type: "object",
          fields: [
            { name: "url", type: "url", title: "URL" },
            {
              name: "icon",
              type: "image",
              title: "Icon",
              options: { hotspot: true },
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
});
