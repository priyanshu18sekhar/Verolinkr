'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { ConfirmDialog, SuccessModal, ErrorModal, InfoModal } from '@/components/modals';

export type ModalType = 'confirm' | 'success' | 'error' | 'info';

interface ModalConfig {
  type: ModalType;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  buttonText?: string;
  retryText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  onRetry?: () => void | Promise<void>;
  onButtonClick?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
  variant?: 'warning' | 'danger' | 'info';
  showRetry?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

interface ModalContextType {
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
  openConfirm: (config: Omit<ModalConfig, 'type'>) => Promise<boolean>;
  openSuccess: (config: Omit<ModalConfig, 'type'>) => void;
  openError: (config: Omit<ModalConfig, 'type'>) => void;
  openInfo: (config: Omit<ModalConfig, 'type'>) => void;
  isOpen: boolean;
  currentModal: ModalConfig | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState<ModalConfig | null>(null);
  const [confirmResolver, setConfirmResolver] = useState<((value: boolean) => void) | null>(null);

  const openModal = useCallback((config: ModalConfig) => {
    setCurrentModal(config);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setCurrentModal(null);
      if (confirmResolver) {
        confirmResolver(false);
        setConfirmResolver(null);
      }
    }, 300);
  }, [confirmResolver]);

  const openConfirm = useCallback((config: Omit<ModalConfig, 'type'>): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmResolver(() => resolve);
      openModal({
        ...config,
        type: 'confirm',
        onConfirm: async () => {
          await config.onConfirm?.();
          setIsOpen(false);
          setTimeout(() => {
            setCurrentModal(null);
            resolve(true);
            setConfirmResolver(null);
          }, 300);
        },
        onCancel: () => {
          config.onCancel?.();
          closeModal();
          resolve(false);
        },
      });
    });
  }, [openModal, closeModal]);

  const openSuccess = useCallback((config: Omit<ModalConfig, 'type'>) => {
    openModal({
      ...config,
      type: 'success',
    });
  }, [openModal]);

  const openError = useCallback((config: Omit<ModalConfig, 'type'>) => {
    openModal({
      ...config,
      type: 'error',
    });
  }, [openModal]);

  const openInfo = useCallback((config: Omit<ModalConfig, 'type'>) => {
    openModal({
      ...config,
      type: 'info',
    });
  }, [openModal]);

  const renderModal = () => {
    if (!currentModal) return null;

    const { type, ...props } = currentModal;

    switch (type) {
      case 'confirm':
        return (
          <ConfirmDialog
            isOpen={isOpen}
            onClose={closeModal}
            onConfirm={props.onConfirm as () => void}
            {...props}
          />
        );
      case 'success':
        return (
          <SuccessModal
            isOpen={isOpen}
            onClose={closeModal}
            onButtonClick={props.onButtonClick}
            {...props}
          />
        );
      case 'error':
        return (
          <ErrorModal
            isOpen={isOpen}
            onClose={closeModal}
            onRetry={props.onRetry as () => void}
            onButtonClick={props.onButtonClick}
            {...props}
          />
        );
      case 'info':
        return (
          <InfoModal
            isOpen={isOpen}
            onClose={closeModal}
            onButtonClick={props.onButtonClick}
            title={props.title}
            message={props.message}
            buttonText={props.buttonText}
            icon={undefined}
            size={props.size}
          >
            {props.children}
          </InfoModal>
        );
      default:
        return null;
    }
  };

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        openConfirm,
        openSuccess,
        openError,
        openInfo,
        isOpen,
        currentModal,
      }}
    >
      {children}
      {renderModal()}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
