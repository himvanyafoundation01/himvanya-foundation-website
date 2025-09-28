export type HomePageContentPlain = {
  topImage: string;
  heroSection: {
    heroTitle: string;
    heroTitleHighlight: string;
    heroImage: string;
    heroDescription: string;
  };
  workSection: {
    ourWorkTitle: string;
    ourWorkDescription: string;
    workCard: {
      icon: string;
      WorkcardTitle: string;
      WorkcardDescription: string;
      workCardbulletPoints: {
        points: string[];
      };
    }[];
  };
  ctaSection: {
    ctaTitle: string;
    ctaDescription: string;
  };
};

export type PartialHomePageContent = Partial<{
  heroSection: Partial<HomePageContentPlain["heroSection"]>;
  workSection: Partial<HomePageContentPlain["workSection"]> & {
    workCard?: Partial<
      HomePageContentPlain["workSection"]["workCard"][number]
    >[];
  };
  ctaSection: Partial<HomePageContentPlain["ctaSection"]>;
}>;
