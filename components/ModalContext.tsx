"use client";

import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  isOpen: boolean;
  openModal: (serviceName?: string) => void;
  closeModal: () => void;
  selectedService: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const openModal = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedService("");
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, selectedService }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useConsultationModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useConsultationModal must be used within a ModalProvider");
  }
  return context;
};
