// schemas/topicsSection.js
export default {
  name: 'topicsSection',
  title: 'Topics Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'The heading for this topics section',
      validation: Rule => Rule.required()
    },
    {
      name: 'topicCards',
      title: 'Topic Cards',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topicCard' }] }],
      description: 'Select topic cards to display in this section',
      validation: Rule => Rule.required().min(1)
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
};