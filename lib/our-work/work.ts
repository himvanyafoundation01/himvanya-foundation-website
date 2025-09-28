import { Schema, model, models } from "mongoose";

const workSchema = new Schema(
  {
    workHeroSection: {
      workHeroHeading: { type: String, required: true },
      workHeroDescription: { type: String, required: true },
    },
    workMainSection: {
      type: [
        {
          workMainHeading: { type: String, required: true },
          workMainDescription: { type: String, required: true },
          workMainImage: { type: String, default: "" },
          bulletPoints: { type: [String], default: [] },
          buttonText: { type: String, default: "" },
          link: { type: String, default: "/donate" },
        },
      ],
      default: [],
    },
    initiativeSection: {
      heading: { type: String, default: "" },
      description: { type: String, default: "" },
      initiatives: {
        type: [
          {
            heading: { type: String, default: "" },
            description: { type: String, default: "" },
          },
        ],
        default: [],
      },
    },
    ctaSection: {
      ctaTitle: { type: String, default: "" },
      ctaDescription: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

const Work = models.Work || model("Work", workSchema);

export default Work;
