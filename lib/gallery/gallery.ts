import { model, models, Schema } from "mongoose";

const gallerySchema = new Schema({
  GalleryHeroSection: {
    GalleryHeroHeading: String,
    GalleryHeroDescription: String,
  },
  GalleryTabs: [{ type: String }],
  GalleryImages: [
    {
      type: {
        id: String,
        title: String,
        category: String,
        location: String,
        date: String,
        image: String,
        description: String,
      },
    },
  ],
});


// export const galleryModel=models("gallery",gallerySchema)
export const galleryModel=models.gallery || model("gallery",gallerySchema)