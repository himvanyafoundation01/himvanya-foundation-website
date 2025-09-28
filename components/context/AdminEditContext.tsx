"use client";

import { createContext, useContext, useState } from "react";

interface AdminEditContextType {
  isAdmin: boolean;
  isEditing: boolean;
  toggleEditing: () => void;
}

const AdminEditContext = createContext<AdminEditContextType | undefined>(
  undefined
);

export const AdminEditProvider = ({
  children,
  isAdmin: initialIsAdmin,
}: {
  children: React.ReactNode;
  isAdmin: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin] = useState(initialIsAdmin);

  const toggleEditing = () => {
    if (isAdmin) {
      setIsEditing((prev) => !prev);
    }
  };

  return (
    <AdminEditContext.Provider value={{ isAdmin, isEditing, toggleEditing }}>
      {children}
    </AdminEditContext.Provider>
  );
};

export const useAdminEdit = () => {
  const context = useContext(AdminEditContext);
  if (context === undefined) {
    throw new Error("useAdminEdit must be used within an AdminEditProvider");
  }
  return context;
};
