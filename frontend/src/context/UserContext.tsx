import { createContext, useContext, useState } from "react";

type User = {
  name: string;
  email: string;
  avatar?: string;
  dietPreference?: string[];
  allergies?: string[];
  goals?: string;
  dailyCalorieTarget?: number;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};


const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
};
