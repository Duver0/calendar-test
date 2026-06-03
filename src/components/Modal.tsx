import type { ReactNode } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ children, onClose }: ModalProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#1a1a1a',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.12)',
          padding: '1.5rem',
          width: 340,
          maxWidth: '92vw',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          color: '#f0f0f0',
        }}
      >
        {children}
      </div>
    </div>
  );
}
