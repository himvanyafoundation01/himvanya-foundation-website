import { createContext, useContext } from "react";

interface AboutContent {}

const AboutContext = createContext();

export const AboutProvider = ({ children }: { children: React.ReactNode }) => {
  return <AboutContext.Provider value={{}}>{children}</AboutContext.Provider>;
};

const useAbout = () => useContext(AboutContext);
