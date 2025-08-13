import React, { createContext, useContext, useRef } from 'react';
import { FlatList } from 'react-native';

interface TabContextType {
  homeScrollRef: React.RefObject<FlatList>;
  scrollToTop: (tabName: string) => void;
}

const TabContext = createContext<TabContextType | null>(null);

export const TabProvider = ({ children }: { children: React.ReactNode }) => {
  const homeScrollRef = useRef<FlatList>(null);

  const scrollToTop = (tabName: string) => {
    if (tabName === 'Home' && homeScrollRef.current) {
      homeScrollRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  return (
    <TabContext.Provider value={{ homeScrollRef, scrollToTop }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within TabProvider');
  }
  return context;
};