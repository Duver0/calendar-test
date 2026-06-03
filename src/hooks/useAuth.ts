import { useState, useCallback } from 'react';
import { ADMIN_PIN } from '@/constants';

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [pinModal, setPinModal] = useState(false);

  const requestAdmin = useCallback(() => {
    setPinModal(true);
  }, []);

  const verifyPin = useCallback(
    (input: string): boolean => {
      if (input === ADMIN_PIN) {
        setIsAdmin(true);
        setPinModal(false);
        return true;
      }
      return false;
    },
    [],
  );

  const logout = useCallback(() => {
    setIsAdmin(false);
  }, []);

  return {
    isAdmin,
    pinModal,
    setPinModal,
    requestAdmin,
    verifyPin,
    logout,
  };
}
