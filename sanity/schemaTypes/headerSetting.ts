// sanity/schemaTypes/headerSettings.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "headerSettings",
  title: "Header Settings",
  type: "document",
  // We'll handle the singleton behavior via the Desk Structure
  preview: {
    select: {
      title: "title",
      navigationLinks: "navigationLinks",
      logo: "logo",
    },
    prepare(selection: {
      title?: string;
      navigationLinks?: any[];
      logo?: any;
    }) {
      const { navigationLinks = [], logo } = selection;
      const navCount = navigationLinks.length;
      return {
        title: "Header Configuration",
        subtitle: `${navCount} navigation items${logo ? " • Has logo" : " • No logo"}`,
        media: logo,
      };
    },
  },
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
        hotspot: true, // Enables image cropping/positioning
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
              href: "href",
            },
            prepare({ label, href }) {
              return {
                title: label || "No label",
                subtitle: href || "No URL",
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
              name: "href",
              title: "Link URL",
              type: "string",
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
      // You can set an initial value here if you like, but the component default also works
      // initialValue: 'Contact Us',
      validation: (Rule) => Rule.required(), // Make it required in Sanity
    }),
  ],
  // Improve preview for the document itself (useful if it ever shows in a list)
  preview: {
    select: {
      title: "contactButtonLabel",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title || "Header Settings",
      };
    },
  },
});
