import { type SchemaTypeDefinition } from "sanity";

import blockContentType from "./blockContentType";
import categoryType from "./categoryType";
import postType from "./postType";
import authorType from "./authorType";
import headerSettings from "./headerSetting";
import hero from "./hero";
import topicCardType from "./topicCardType";
import topic from "./topicType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    headerSettings,
    hero,
    topicCardType,
    topic,
  ],
};
