"use client";

import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { seedData } from "@/lib/home/seed";
import { useSession } from "../context/SessionContext";
import { toast } from "sonner";

type WorkCard = {
  _id?: string;
  WorkcardTitle: string;
  WorkcardDescription: string;
  workCardbulletPoints: { points: string[] };
  icon: string;
};

type HomeContent = {
  _id?: string;
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
    workCard: WorkCard[];
  };
  ctaSection: {
    ctaTitle: string;
    ctaDescription: string;
  };
};

type HomePageContextType = {
  isLoading: boolean;
  content: HomeContent;
  setContent: (content: HomeContent) => void;

  updateHero<K extends keyof HomeContent["heroSection"]>(
    key: K,
    value: HomeContent["heroSection"][K]
  ): void;

  updateCTA<K extends keyof HomeContent["ctaSection"]>(
    key: K,
    value: HomeContent["ctaSection"][K]
  ): void;

  addWorkCard(): void;
  updateWorkCard(index: number, patch: Partial<WorkCard>): void;
  removeWorkCard(index: number): void;

  addBullet(cardIndex: number): void;
  updateBullet(cardIndex: number, bulletIndex: number, value: string): void;
  removeBullet(cardIndex: number, bulletIndex: number): void;

  handleImageUpload(e: React.ChangeEvent<HTMLInputElement>): void;
  handleSave(): void;
  handleCancel(): void;

  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;

  saving: boolean;
  setSaving: (saving: boolean) => void;
};

const HomePageContext = createContext<HomePageContextType | undefined>(
  undefined
);

const HomePageProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSession();

  const [content, setContent] = useState<HomeContent>(seedData as HomeContent);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [heroImage, setHeroImage] = useState<string>("");

  function updateHero<K extends keyof HomeContent["heroSection"]>(
    key: K,
    value: HomeContent["heroSection"][K]
  ) {
    setContent((c) => ({
      ...c,
      heroSection: { ...c.heroSection, [key]: value },
    }));
  }

  function updateCTA<K extends keyof HomeContent["ctaSection"]>(
    key: K,
    value: HomeContent["ctaSection"][K]
  ) {
    setContent((c) => ({
      ...c,
      ctaSection: { ...c.ctaSection, [key]: value },
    }));
  }

  function addWorkCard() {
    setContent((c) => ({
      ...c,
      workSection: {
        ...c.workSection,
        workCard: [
          ...c.workSection.workCard,
          {
            WorkcardTitle: "New Program",
            WorkcardDescription: "Description...",
            workCardbulletPoints: { points: ["Point 1"] },
            icon: "chef",
          },
        ],
      },
    }));
  }

  function updateWorkCard(index: number, patch: Partial<WorkCard>) {
    setContent((c) => {
      const cards = [...c.workSection.workCard];
      cards[index] = { ...cards[index], ...patch };
      return { ...c, workSection: { ...c.workSection, workCard: cards } };
    });
  }

  function removeWorkCard(index: number) {
    setContent((c) => {
      const cards = [...c.workSection.workCard];
      cards.splice(index, 1);
      return { ...c, workSection: { ...c.workSection, workCard: cards } };
    });
  }

  function addBullet(cardIndex: number) {
    setContent((c) => {
      const cards = [...c.workSection.workCard];
      const card = { ...cards[cardIndex] };
      card.workCardbulletPoints = {
        points: [...card.workCardbulletPoints.points, "New point"],
      };
      cards[cardIndex] = card;
      return { ...c, workSection: { ...c.workSection, workCard: cards } };
    });
  }

  function updateBullet(cardIndex: number, bulletIndex: number, value: string) {
    setContent((c) => {
      const cards = [...c.workSection.workCard];
      const card = { ...cards[cardIndex] };
      const points = [...card.workCardbulletPoints.points];
      points[bulletIndex] = value;
      card.workCardbulletPoints = { points };
      cards[cardIndex] = card;
      return { ...c, workSection: { ...c.workSection, workCard: cards } };
    });
  }

  function removeBullet(cardIndex: number, bulletIndex: number) {
    setContent((c) => {
      const cards = [...c.workSection.workCard];
      const card = { ...cards[cardIndex] };
      const points = [...card.workCardbulletPoints.points];
      points.splice(bulletIndex, 1);
      card.workCardbulletPoints = { points };
      cards[cardIndex] = card;
      return { ...c, workSection: { ...c.workSection, workCard: cards } };
    });
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (user?.role !== "admin") return;
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (typeof data === "string") {
        setHeroImage(data);
        updateHero("heroImage", data);
      }
    };
    reader.readAsDataURL(file);
  }

  async function handleSave() {
    if (user?.role !== "admin") return;
    try {
      setSaving(true);
      const res = await fetch("/api/home", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setContent(data.updated ?? data);
      setIsEditing(false);
      toast.success("Content saved to server");
    } catch (err) {
      console.error(err);
      toast.error("Save failed — changes kept locally");
    } finally {
      setSaving(false);
    }
  }

  async function handleCancel() {
    if (user?.role !== "admin") return;
    await refetch(); // reset to server version
    setIsEditing(false);
  }

  const fetchData = async (): Promise<HomeContent> => {
    const res = await fetch("/api/home");
    if (!res.ok) throw new Error("Failed to fetch homepage content");
    const data = await res.json();

    setContent(data.updated ?? data);
    return data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["homepage-content"],
    queryFn: fetchData,
    initialData: seedData,
  });

  return (
    <HomePageContext.Provider
      value={{
        content,
        setContent,
        updateHero,
        updateCTA,
        addWorkCard,
        updateWorkCard,
        removeWorkCard,
        addBullet,
        updateBullet,
        removeBullet,
        isLoading,
        handleCancel,
        handleSave,
        isEditing,
        setIsEditing,
        saving,
        setSaving,
        handleImageUpload,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};

export const useHome = () => {
  const ctx = useContext(HomePageContext);
  if (!ctx) throw new Error("useHome must be used within HomePageProvider");
  return ctx;
};

export default HomePageProvider;
