import { defineType, defineArrayMember } from "sanity";
import { LinkIcon, ImageIcon } from "@sanity/icons"; // Example icons

/**
 * This is the schema definition for the rich text fields used for
 * portable text content. You can add tools to markup documents with
 * custom components here.
 *
 * Read more about Portable Text setup:
 * https://www.sanity.io/docs/portable-text-configuration
 */
export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      // Styles let you set what textual styles are available. By default
      // they are inline constraints only.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property – e.g. strong or emphasis
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            icon: LinkIcon,
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              },
              {
                title: "Open in new tab",
                name: "blank",
                type: "boolean",
                initialValue: true,
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the array
    // directly. Instead, you have to wrap them in a block type.
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        // Optional: Add alt text field to image
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Important for SEO and accessibility.",
        },
        {
          // Optional: Add caption
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
    }),
    // Example of a custom component (e.g., a code block)
    // defineArrayMember({
    //   name: 'codeBlock',
    //   title: 'Code Block',
    //   type: 'code', // Requires installing @sanity/code-input plugin
    // }),
  ],
});
