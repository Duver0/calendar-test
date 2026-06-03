import type { TeamMember, ShiftKey, DayClickPayload } from '@/types';
import { SHIFT_LABELS, SHIFT_KEYS } from '@/constants';
import { Modal } from './Modal';

interface DayOverrideModalProps {
  dayModal: DayClickPayload;
  member: TeamMember;
  currentShift: ShiftKey;
  onSetOverride: (memberIdx: number, dateKey: string, shift: ShiftKey | '__default__') => void;
  onClose: () => void;
}

export function DayOverrideModal({
  dayModal,
  member,
  currentShift,
  onSetOverride,
  onClose,
}: DayOverrideModalProps) {
  return (
    <Modal onClose={onClose}>
      <p style={{ fontSize: 16, fontWeight: 600, marginBottom: '1rem', color: '#f0f0f0' }}>
        📅 Turno del día {dayModal.day}
      </p>
      <p style={{ fontSize: 13, color: '#a0a0a0', marginBottom: '1rem' }}>
        {dayModal.memberName}
      </p>

      <label
        style={{
          fontSize: 13,
          color: '#b0b0b0',
          marginBottom: 6,
          display: 'block',
        }}
      >
        Selecciona el turno para este día
      </label>
      <select
        autoFocus
        defaultValue={currentShift || '__default__'}
        onChange={(e) =>
          onSetOverride(
            dayModal.memberIdx,
            dayModal.dateKey,
            e.target.value as ShiftKey | '__default__',
          )
        }
        style={{
          width: '100%',
          padding: '8px 12px',
          fontSize: 14,
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 8,
          background: 'rgba(255,255,255,0.08)',
          color: '#f0f0f0',
          marginBottom: 4,
          outline: 'none',
        }}
      >
        <option value="__default__">
          🔄 Turno base ({member.shift ? SHIFT_LABELS[member.shift] : 'sin asignar'})
        </option>
        {SHIFT_KEYS.map((k) => (
          <option key={k} value={k}>
            {SHIFT_LABELS[k]}
          </option>
        ))}
        <option value="">❌ Sin turno (día libre)</option>
      </select>

      <p style={{ fontSize: 11, color: '#707070', marginBottom: '1rem' }}>
        Días con borde punteado tienen turno personalizado.
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
          Cerrar
        </button>
      </div>
    </Modal>
  );
}
