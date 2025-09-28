import { HomePageContentPlain } from "./types";

export const seedData: HomePageContentPlain = {
  topImage: "https://www.smilefoundationindia.org/wp-content/uploads/2022/09/Banner1-scaled.jpg.webp",
  heroSection: {
    heroTitle: "Empowering Communities",
    heroTitleHighlight: " Transforming Lives",
    heroDescription:
      "Join Vanya Foundation in our mission to create lasting change through education, healthcare, and community development programs across India.",
    heroImage: "https://cdn.sanity.io/images/.../example.svg",
  },
  workSection: {
    ourWorkTitle: "Our Work",
    ourWorkDescription:
      "We focus on sustainable development through comprehensive programs",
    workCard: [
      {
        icon: "GraduationCap",
        WorkcardTitle: "Education",
        WorkcardDescription:
          "Providing quality education, scholarships, and learning resources.",
        workCardbulletPoints: {
          points: [
            "School infrastructure development",
            "Teacher training",
            "Scholarships",
          ],
        },
      },
      {
        icon: "Stethoscope",
        WorkcardTitle: "Healthcare",
        WorkcardDescription: "Ensuring access to quality healthcare services.",
        workCardbulletPoints: {
          points: [
            "Mobile health clinics",
            "Vaccination drives",
            "Awareness campaigns",
          ],
        },
      },
      {
        icon: "Users",
        WorkcardTitle: "Community Development",
        WorkcardDescription:
          "Building sustainable communities through empowerment programs.",
        workCardbulletPoints: {
          points: [
            "Vocational training",
            "Women empowerment",
            "Rural development",
          ],
        },
      },
    ],
  },
  ctaSection: {
    ctaTitle: "Join Us in Making a Difference",
    ctaDescription:
      "Your support can transform lives and build stronger communities.",
  },
};
