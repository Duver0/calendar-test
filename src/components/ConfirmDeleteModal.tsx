import type { TeamMember } from '@/types';
import { Modal } from './Modal';

interface ConfirmDeleteModalProps {
  member: TeamMember;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDeleteModal({ member, onConfirm, onClose }: ConfirmDeleteModalProps) {
  return (
    <Modal onClose={onClose}>
      <p style={{ fontSize: 16, fontWeight: 600, marginBottom: '1rem', color: '#f0f0f0' }}>
        ¿Eliminar persona?
      </p>
      <p style={{ fontSize: 14, color: '#c0c0c0', marginBottom: '1.25rem' }}>
        Se eliminará a{' '}
        <strong style={{ color: '#f0f0f0' }}>{member.name}</strong> del equipo.
        Esta acción no se puede deshacer.
      </p>
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
          onClick={onConfirm}
          style={{
            padding: '7px 18px',
            fontSize: 13,
            border: 'none',
            borderRadius: 8,
            background: '#c0392b',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Eliminar
        </button>
      </div>
    </Modal>
  );
}
