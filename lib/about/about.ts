import { model, models, Schema } from "mongoose";

const aboutSchema = new Schema({
  aboutSection: {
    aboutHighlightText: String,
    aboutDescription: String,
  },
  mainSection: [
    {
      heading: String,
      description: String,
    },
  ],
  storySection: {
    storyHeading: String,
    storyDescription: String,
    storyImage: String,
  },
  valuesSection: {
    valuesHeading: String,
    valuesDescription: String,
    valuesList: [
      {
        icon: String,
        valueHeading: String,
        valueDescription: String,
      },
    ],
  },
});

export const aboutModel = models.About || model("About", aboutSchema);
