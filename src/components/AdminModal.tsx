import { useState } from 'react';
import { Modal } from './Modal';

interface AdminModalProps {
  onVerify: (pin: string) => boolean;
  onClose: () => void;
}

export function AdminModal({ onVerify, onClose }: AdminModalProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    const ok = onVerify(pin);
    if (!ok) setError(true);
  };

  return (
    <Modal onClose={onClose}>
      <p style={{ fontSize: 16, fontWeight: 600, marginBottom: '1rem', color: '#f0f0f0' }}>
        🔒 Acceso admin
      </p>
      <label
        style={{
          fontSize: 13,
          color: '#b0b0b0',
          marginBottom: 6,
          display: 'block',
        }}
      >
        PIN de 4 dígitos
      </label>
      <input
        type="password"
        maxLength={4}
        placeholder="••••"
        value={pin}
        onChange={(e) => {
          setPin(e.target.value.replace(/\D/g, ''));
          setError(false);
        }}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        autoFocus
        style={{
          width: '100%',
          padding: '8px 12px',
          fontSize: 14,
          border: `1px solid ${error ? '#c0392b' : 'rgba(255,255,255,0.18)'}`,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.08)',
          color: '#f0f0f0',
          marginBottom: 14,
          outline: 'none',
          letterSpacing: 6,
        }}
      />
      {error && (
        <p style={{ fontSize: 12, color: '#e74c3c', marginTop: -10, marginBottom: 12 }}>
          PIN incorrecto.
        </p>
      )}
      <div
        style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'flex-end',
          marginTop: 4,
        }}
      >
        <button
          onClick={onClose}
          style={{
            padding: '7px 18px',
            fontSize: 13,
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 8,
            background: 'transparent',
            color: '#b0b0b0',
            cursor: 'pointer',
          }}
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          style={{
            padding: '7px 18px',
            fontSize: 13,
            border: 'none',
            borderRadius: 8,
            background: '#4a8efa',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Entrar
        </button>
      </div>
    </Modal>
  );
}
