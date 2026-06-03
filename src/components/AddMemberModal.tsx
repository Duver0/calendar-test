import { useState } from 'react';
import type { ShiftKey } from '@/types';
import { Modal } from './Modal';

interface AddMemberModalProps {
  onAdd: (name: string, shift: ShiftKey) => void;
  onClose: () => void;
}

export function AddMemberModal({ onAdd, onClose }: AddMemberModalProps) {
  const [name, setName] = useState('');
  const [shift, setShift] = useState<ShiftKey>('');
  const [nameError, setNameError] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) {
      setNameError(true);
      return;
    }
    onAdd(name, shift);
  };

  return (
    <Modal onClose={onClose}>
      <p style={{ fontSize: 16, fontWeight: 600, marginBottom: '1rem', color: '#f0f0f0' }}>
        👤 Agregar persona
      </p>

      <label
        style={{
          fontSize: 13,
          color: '#b0b0b0',
          marginBottom: 6,
          display: 'block',
        }}
      >
        Nombre completo
      </label>
      <input
        type="text"
        maxLength={30}
        placeholder="Ej. Juan Pérez"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setNameError(false);
        }}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        autoFocus
        style={{
          width: '100%',
          padding: '8px 12px',
          fontSize: 14,
          border: `1px solid ${nameError ? '#c0392b' : 'rgba(255,255,255,0.18)'}`,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.08)',
          color: '#f0f0f0',
          marginBottom: 14,
          outline: 'none',
        }}
      />
      {nameError && (
        <p style={{ fontSize: 12, color: '#e74c3c', marginTop: -10, marginBottom: 12 }}>
          Ingresa un nombre válido.
        </p>
      )}

      <label
        style={{
          fontSize: 13,
          color: '#b0b0b0',
          marginBottom: 6,
          display: 'block',
        }}
      >
        Turno base
      </label>
      <select
        value={shift}
        onChange={(e) => setShift(e.target.value as ShiftKey)}
        style={{
          width: '100%',
          padding: '8px 12px',
          fontSize: 14,
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 8,
          background: 'rgba(255,255,255,0.08)',
          color: '#f0f0f0',
          marginBottom: 16,
          outline: 'none',
        }}
      >
        <option value="">Sin turno asignado</option>
        <option value="s1">7:00 – 4:00</option>
        <option value="s2">8:00 – 5:00</option>
        <option value="s3">9:00 – 6:00</option>
        <option value="s4">10:00 – 7:00</option>
      </select>

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
          Agregar
        </button>
      </div>
    </Modal>
  );
}
