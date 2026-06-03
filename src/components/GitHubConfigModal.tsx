import { useState } from 'react';
import type { GitHubConfig } from '@/types';
import { Modal } from './Modal';

interface GitHubConfigModalProps {
  onSave: (config: GitHubConfig) => void;
  onClose: () => void;
}

export function GitHubConfigModal({ onSave, onClose }: GitHubConfigModalProps) {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = () => {
    if (!owner.trim() || !repo.trim() || !token.trim()) return;
    onSave({ owner: owner.trim(), repo: repo.trim(), token: token.trim() });
  };

  return (
    <Modal onClose={onClose}>
      <p style={{ fontSize: 16, fontWeight: 600, marginBottom: '1rem', color: '#f0f0f0' }}>
        🔗 Configurar GitHub
      </p>

      <label style={{ fontSize: 13, color: '#b0b0b0', marginBottom: 6, display: 'block' }}>
        Owner (usuario u organización)
      </label>
      <input
        type="text"
        placeholder="ej. tu-usuario"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        style={{
          width: '100%',
          padding: '8px 12px',
          fontSize: 14,
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 8,
          background: 'rgba(255,255,255,0.08)',
          color: '#f0f0f0',
          marginBottom: 14,
          outline: 'none',
        }}
      />

      <label style={{ fontSize: 13, color: '#b0b0b0', marginBottom: 6, display: 'block' }}>
        Repositorio
      </label>
      <input
        type="text"
        placeholder="ej. calendar-test"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
        style={{
          width: '100%',
          padding: '8px 12px',
          fontSize: 14,
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 8,
          background: 'rgba(255,255,255,0.08)',
          color: '#f0f0f0',
          marginBottom: 14,
          outline: 'none',
        }}
      />

      <label style={{ fontSize: 13, color: '#b0b0b0', marginBottom: 6, display: 'block' }}>
        Personal Access Token (permisos: repo, pull_requests)
      </label>
      <input
        type="password"
        placeholder="ghp_..."
        value={token}
        onChange={(e) => setToken(e.target.value)}
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
      />

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
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
          Guardar
        </button>
      </div>
    </Modal>
  );
}
