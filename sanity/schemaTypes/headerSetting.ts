// sanity/schemaTypes/headerSettings.ts
import { defineField, defineType } from "sanity";

interface NavLink {
  label: string;
  slug: {
    current: string;
  };
}

export default defineType({
  name: "headerSettings",
  title: "Header Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Header Settings",
      hidden: true,
    }),
    defineField({
      name: "logo",
      title: "Logo Image",
      description:
        'Upload the site logo. If not provided, the default text logo ("LUX VENTUS") will be used by the component.',
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "navigationLinks",
      title: "Navigation Links",
      description: "Links displayed in the main header navigation.",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          preview: {
            select: {
              label: "label",
              slug: "slug",
            },
            prepare({ label, slug }) {
              return {
                title: label || "No label",
                subtitle: slug?.current || "No slug",
              };
            },
          },
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: (doc: any, { parent }: { parent: NavLink }) =>
                  parent?.label,
                maxLength: 200,
                slugify: (input) =>
                  input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
              },
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "contactButtonLabel",
      title: "Contact Button Label",
      description:
        'Text displayed on the main contact button. If empty, the component default ("Contact Us") will be used.',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
