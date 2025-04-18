import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required().error('A title is required')
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required().error('A slug is required for page routing')
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      validation: Rule => Rule.required().error('An author is required')
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required().error('A main image is required')
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required().error('A publication date is required')
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: Rule => Rule.max(200).warning('Excerpts work best when kept under 200 characters')
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }),
    defineField({
      name: 'specialTag',
      title: 'Special Tag',
      type: 'string',
      description: 'Optional special tag like "COMING IN HOT!"'
    }),
    defineField({
      name: 'callToActionText',
      title: 'Call to Action Text',
      type: 'string',
      description: 'Text for the call to action link (defaults to "READ MORE" if empty)',
      initialValue: 'READ MORE'
    }),
    defineField({
      name: 'displaySize',
      title: 'Display Size',
      type: 'string',
      options: {
        list: [
          {title: 'Large', value: 'large'},
          {title: 'Medium', value: 'medium'},
          {title: 'Wide', value: 'wide'}
        ],
        layout: 'radio'
      },
      initialValue: 'medium'
    })
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },
    prepare(selection) {
      const {author} = selection;
      return {...selection, subtitle: author && `by ${author}`};
    }
  }
});