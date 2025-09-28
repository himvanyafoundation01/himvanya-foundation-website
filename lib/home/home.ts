import { Schema, model, InferSchemaType, models } from "mongoose";

const homePageContentSchema = new Schema({
  topImage: { type: String, required: true },
  heroSection: {
    heroTitle: { type: String, required: true },
    heroTitleHighlight: { type: String, required: true },
    heroImage: { type: String, required: true },
    heroDescription: { type: String, required: true },
  },
  workSection: {
    ourWorkTitle: { type: String, required: true },
    ourWorkDescription: { type: String, required: true },
    workCard: [
      {
        icon: { type: String, required: true },
        WorkcardTitle: { type: String, required: true },
        WorkcardDescription: { type: String, required: true },
        workCardbulletPoints: {
          points: [{ type: String, required: true }],
        },
      },
    ],
  },
  ctaSection: {
    ctaTitle: { type: String, required: true },
    ctaDescription: { type: String, required: true },
  },
});

export type HomePageContentType = InferSchemaType<typeof homePageContentSchema>;
export const HomePageContentModel =
  models.HomePageContent ||
  model<HomePageContentType>("HomePageContent", homePageContentSchema);

