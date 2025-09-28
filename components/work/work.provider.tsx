"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type WorkMainCard = {
  workMainHeading: string;
  workMainDescription: string;
  workMainImage: string;
  bulletPoints: string[];
  buttonText: string;
  link?: string;
};

type Initiative = {
  heading: string;
  description: string;
};

type WorkContent = {
  workHeroSection: {
    workHeroHeading: string;
    workHeroDescription: string;
    workHeroImage?: string;
  };
  workMainSection: WorkMainCard[];
  initiativeSection: {
    heading: string;
    description: string;
    initiatives: Initiative[];
  };
  ctaSection: {
    ctaTitle: string;
    ctaDescription: string;
  };
};

type WorkContextType = {
  content: WorkContent;
  setContent: React.Dispatch<React.SetStateAction<WorkContent>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  saving: boolean;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  handleImageUpload: (e: string, field: string, idx?: number) => void;
  updateHero: (
    field: keyof WorkContent["workHeroSection"],
    value: string
  ) => void;
  addWorkCard: () => void;
  updateWorkCard: (idx: number, updates: Partial<WorkMainCard>) => void;
  removeWorkCard: (idx: number) => void;
  addBullet: (cardIdx: number) => void;
  updateBullet: (cardIdx: number, bulletIdx: number, value: string) => void;
  removeBullet: (cardIdx: number, bulletIdx: number) => void;
  updateInitiative: (idx: number, updates: Partial<Initiative>) => void;
  addInitiative: () => void;
  removeInitiative: (idx: number) => void;
  updateCTA: (field: keyof WorkContent["ctaSection"], value: string) => void;
};

const WorkContext = createContext<WorkContextType | undefined>(undefined);

export const WorkProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<WorkContent>({
    workHeroSection: {
      workHeroHeading: "Our Work",
      workHeroDescription: "See how we are making a difference",
    },
    workMainSection: [],
    initiativeSection: {
      heading: "Our Initiatives",
      description: "Learn about our key initiatives driving impact.",
      initiatives: [],
    },
    ctaSection: {
      ctaTitle: "Join Us in Making a Difference",
      ctaDescription:
        "Your support can transform lives and build stronger communities.",
    },
  });

  const [backup, setBackup] = useState<WorkContent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load content from backend
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/work");

      if (res.ok) {
        const data = await res.json();

        setContent(data.data[0]);
      }
    })();
  }, []);

  // Hero update
  const updateHero = (
    field: keyof WorkContent["workHeroSection"],
    value: string
  ) => {
    setContent((prev) => ({
      ...prev,
      workHeroSection: {
        ...prev.workHeroSection,
        [field]: value,
      },
    }));
  };

  // Work cards
  const addWorkCard = () => {
    setContent((prev) => ({
      ...prev,
      workMainSection: [
        ...prev.workMainSection,
        {
          workMainHeading: "",
          workMainDescription: "",
          workMainImage: "",
          bulletPoints: [],
          buttonText: "Learn More",
        },
      ],
    }));
  };

  const updateWorkCard = (idx: number, updates: Partial<WorkMainCard>) => {
    console.log("hi");
    setContent((prev) => {
      const newCards = [...prev.workMainSection];
      newCards[idx] = { ...newCards[idx], ...updates };
      return { ...prev, workMainSection: newCards };
    });
  };

  const removeWorkCard = (idx: number) => {
    setContent((prev) => {
      const newCards = prev.workMainSection.filter((_, i) => i !== idx);
      return { ...prev, workMainSection: newCards };
    });
  };

  // Bullets
  const addBullet = (cardIdx: number) => {
    setContent((prev) => {
      const newCards = [...prev.workMainSection];
      newCards[cardIdx].bulletPoints = [...newCards[cardIdx].bulletPoints, ""];
      return { ...prev, workMainSection: newCards };
    });
  };

  const updateBullet = (cardIdx: number, bulletIdx: number, value: string) => {
    setContent((prev) => {
      const newCards = [...prev.workMainSection];
      newCards[cardIdx].bulletPoints[bulletIdx] = value;
      return { ...prev, workMainSection: newCards };
    });
  };

  const removeBullet = (cardIdx: number, bulletIdx: number) => {
    setContent((prev) => {
      const newCards = [...prev.workMainSection];
      newCards[cardIdx].bulletPoints = newCards[cardIdx].bulletPoints.filter(
        (_, i) => i !== bulletIdx
      );
      return { ...prev, workMainSection: newCards };
    });
  };

  // Initiatives
  const updateInitiative = (idx: number, updates: Partial<Initiative>) => {
    setContent((prev) => {
      const newInits = [...prev.initiativeSection.initiatives];
      newInits[idx] = { ...newInits[idx], ...updates };
      return {
        ...prev,
        initiativeSection: { ...prev.initiativeSection, initiatives: newInits },
      };
    });
  };

  const addInitiative = () => {
    setContent((prev) => ({
      ...prev,
      initiativeSection: {
        ...prev.initiativeSection,
        initiatives: [
          ...prev.initiativeSection.initiatives,
          { heading: "", description: "" },
        ],
      },
    }));
  };

  const removeInitiative = (idx: number) => {
    setContent((prev) => {
      const newInits = prev.initiativeSection.initiatives.filter(
        (_, i) => i !== idx
      );
      return {
        ...prev,
        initiativeSection: { ...prev.initiativeSection, initiatives: newInits },
      };
    });
  };

  // CTA update
  const updateCTA = (field: keyof WorkContent["ctaSection"], value: string) => {
    setContent((prev) => ({
      ...prev,
      ctaSection: {
        ...prev.ctaSection,
        [field]: value,
      },
    }));
  };
  const handleImageUpload = (e: string, field: string, idx?: number) => {
    updateWorkCard(idx!, { workMainImage: e });
  };

  // // Image upload (Cloudinary)
  // const handleImageUpload = async (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   field: string,
  //   idx?: number
  // ) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "your_unsigned_preset");

  //   const res = await fetch(
  //     "https://api.cloudinary.com/v1_1/<your_cloud_name>/image/upload",
  //     {
  //       method: "POST",
  //       body: formData,
  //     }
  //   );
  //   const data = await res.json();

  //   if (field === "heroImage") {
  //     updateHero("workHeroImage", data.secure_url);
  //   } else if (field === "workMainImage" && idx !== undefined) {
  //     updateWorkCard(idx, { workMainImage: data.secure_url });
  //   }
  // };

  // Save
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/work", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        setBackup(content);
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (backup) setContent(backup);
    setIsEditing(false);
  };

  return (
    <WorkContext.Provider
      value={{
        content,
        setContent,
        isEditing,
        setIsEditing,
        saving,
        setSaving,
        handleSave,
        handleCancel,
        handleImageUpload,
        updateHero,
        addWorkCard,
        updateWorkCard,
        removeWorkCard,
        addBullet,
        updateBullet,
        removeBullet,
        updateInitiative,
        addInitiative,
        removeInitiative,
        updateCTA,
      }}
    >
      {children}
    </WorkContext.Provider>
  );
};

export const useWork = () => {
  const ctx = useContext(WorkContext);
  if (!ctx) throw new Error("useWork must be used within WorkProvider");
  return ctx;
};
