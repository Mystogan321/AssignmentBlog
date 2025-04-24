// schemas/topRatedWidget.js
import { defineField, defineType } from "sanity";

export default defineType({
  name: "topRatedWidget",
  title: "Top Rated Widget",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Widget Title",
      type: "string",
      initialValue: "Top Rated",
      validation: (Rule) => Rule.required().error("A title is required"),
    }),
    defineField({
      name: "posts",
      title: "Featured Posts",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
      description: "Select and order the posts to display in the Top Rated widget",
      validation: (Rule) => Rule.required().min(1).error("At least one post is required"),
    }),
  ],
});