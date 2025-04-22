export default {
  name: "headerSettings",
  title: "Header Settings",
  type: "document",
  fields: [
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "navigationLinks",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
            },
            {
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: "label",
                maxLength: 96,
              },
            },
          ],
        },
      ],
    },
    {
      name: "contactButtonLabel",
      title: "Contact Button Label",
      type: "string",
      initialValue: "Contact Us",
    },
  ],
};
