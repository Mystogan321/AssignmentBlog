export default {
  name: "newsletterSettings",
  title: "Newsletter Settings",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Newsletter Title",
      type: "string",
      description: "Main heading for your newsletter widget",
      initialValue: "Newsletter",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Newsletter Description",
      type: "string",
      description: "Short text encouraging users to subscribe",
      initialValue: "Join the 36,000 Lux Ventus!",
    },
    {
      name: "inputPlaceholder",
      title: "Input Placeholder",
      type: "string",
      description: "Text displayed in the email input field",
      initialValue: "Email Address",
    },
    {
      name: "buttonText",
      title: "Button Text",
      type: "string",
      description: "Text for the subscribe button",
      initialValue: "Subscribe",
    },
    {
      name: "successMessage",
      title: "Success Message",
      type: "string",
      description: "Message shown after successful subscription",
      initialValue: "Thanks for subscribing!",
    },
    {
      name: "footerText",
      title: "Footer Text",
      type: "text",
      description: "Small text displayed below the form",
      initialValue:
        "Rest assured! You're gonna have a lot of fun when you press this",
    },

    {
      name: "subscriberCount",
      title: "Subscriber Count",
      type: "number",
      description: "Number of current subscribers to display",
      initialValue: 36000,
      validation: (Rule) => Rule.min(0),
    },
    {
      name: "formEndpoint",
      title: "Form Endpoint",
      type: "url",
      description: "API endpoint for newsletter service (optional)",
    },
    {
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Show/hide this widget on the site",
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
};
