// structure.ts
import type { StructureResolver, StructureBuilder } from "sanity/desk"; // Import StructureBuilder
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schema } from "./sanity/schemaTypes";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (
  S: StructureBuilder // Type S as StructureBuilder
) =>
  S.list()
    .title("Content") // Changed title to 'Content' for broader scope, adjust if needed
    .items([
      // --- Singleton Item for Header Settings ---
      S.listItem()
        .title("Header Settings")
        .id("headerSettings") // Unique ID for this item
        .icon(() => "⚙️") // Optional: Add an icon
        .child(
          S.document()
            .schemaType("headerSettings")
            .documentId("headerSettings") // Fixed document ID makes it a singleton
            .title("Edit Header Settings")
        ),

      // --- Add siteSettings singleton if you haven't already ---
      // S.listItem()
      //   .title('Site Settings')
      //   .id('siteSettings')
      //   .icon(() => '🌍') // Optional: Add an icon
      //   .child(
      //     S.document()
      //       .schemaType('siteSettings')
      //       .documentId('siteSettings')
      //       .title('Edit Site Settings')
      //   ),

      S.divider(), // Divider between singletons and lists

      // --- Your existing list items ---
      // S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("author").title("Authors"),

      S.divider(), // Divider before automatically listed items

      // --- Automatically list the rest, excluding manually handled ones ---
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "post",
            "category",
            "author",
            "headerSettings", // <-- Exclude headerSettings here
            "siteSettings", // <-- Exclude siteSettings if you add it above
            "media.tag", // <-- Common Sanity default to exclude
          ].includes(item.getId()!)
      ),
    ]);

export default defineConfig({
  name: "default",
  title: "Lux Ventus",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [deskTool()],
  schema,
});
