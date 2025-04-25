// schemas/mobileLayout.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "mobileLayout",
  title: "Mobile Layout",
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
    // Mobile-specific display options
    defineField({
      name: "showHostWidgetAtTop",
      title: "Show Host Widget at Top",
      type: "boolean",
      description: "Display the host widget at the top of mobile layout",
      initialValue: true,
    }),
    defineField({
      name: "showNewsletterAtTop",
      title: "Show Newsletter at Top",
      type: "boolean",
      description: "Display the newsletter widget at the top of mobile layout",
      initialValue: true,
    }),
    // Widget positioning
    defineField({
      name: "widgetPositioning",
      title: "Widget Positioning",
      type: "string",
      options: {
        list: [
          { title: "Top (Before content)", value: "top" },
          { title: "Interspersed with content", value: "interspersed" },
          { title: "Bottom (After content)", value: "bottom" },
        ],
      },
      description: "Where to position sidebar widgets in mobile layout",
      initialValue: "interspersed",
    }),
    // Content ordering
    defineField({
      name: "contentOrder",
      title: "Content Order",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: [
              { title: "Featured Post", value: "featured" },
              { title: "Trending Posts", value: "trending" },
              { title: "Stacked Posts", value: "stacked" },
              { title: "Host Widget", value: "host" },
              { title: "Newsletter", value: "newsletter" },
              { title: "Categories", value: "categories" },
              { title: "Top Rated", value: "topRated" },
            ],
          },
        },
      ],
      description: "Order in which content sections appear in mobile view",
      validation: (Rule) => Rule.unique(),
    }),
    // Link to corresponding desktop layout
    defineField({
      name: "desktopLayout",
      title: "Desktop Layout",
      type: "reference",
      to: [{ type: "pageLayout" }],
      description: "The desktop layout that this mobile layout replaces on small screens",
    }),
    defineField({
      name: "isActive",
      title: "Active Layout",
      type: "boolean",
      description: "Is this the active mobile layout to use on the site?",
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
        subtitle: active ? "Active Mobile Layout" : "Inactive",
      };
    },
  },
});