import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision' // Useful for testing GROQ queries

// Import your schemas
import post from './sanity/schemaTypes/postType'
import author from './sanity/schemaTypes/authorType'
import category from './sanity/schemaTypes/categoryType'
import blockContent from './sanity/schemaTypes/blockContentType'
import siteSettings from './sanity/schemaTypes/siteSettings' // Import siteSettings

// Find projectId and dataset in sanity.json or manage.sanity.io
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  basePath: '/studio', // Matches the output path during init
  name: 'my_blog_studio',
  title: 'My Blog Studio',

  projectId,
  dataset,

  plugins: [deskTool(), visionTool()], // Add visionTool if desired

  schema: {
    // Add all your schema types here
    types: [
        post,
        author,
        category,
        blockContent,
        siteSettings // Add siteSettings
    ],
  },
})