// schemas/sidebarWidget.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "sidebarWidget",
  title: "Sidebar Widget",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Widget Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "widgetType",
      title: "Widget Type",
      type: "string",
      options: {
        list: [
          { title: "Newsletter", value: "newsletter" },
          { title: "Top Rated", value: "topRated" },
          { title: "Categories", value: "categories" },
          { title: "Custom", value: "custom" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Order in which the widget appears in the sidebar (lower numbers appear first)",
      initialValue: 100,
    }),
    // Fields specific to Top Rated widget
    defineField({
      name: "topRatedPosts",
      title: "Top Rated Posts",
      type: "array",
      of: [{ type: "reference", to: { type: "post" } }],
      hidden: ({ document }) => document?.widgetType !== "topRated",
    }),
    // Fields for custom widget
    defineField({
      name: "content",
      title: "Custom Content",
      type: "blockContent",
      hidden: ({ document }) => document?.widgetType !== "custom",
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "widgetType",
      order: "displayOrder",
    },
    prepare(selection) {
      const { title, type, order } = selection;
      return {
        title,
        subtitle: `${type} (Order: ${order})`,
      };
    },
  },
});