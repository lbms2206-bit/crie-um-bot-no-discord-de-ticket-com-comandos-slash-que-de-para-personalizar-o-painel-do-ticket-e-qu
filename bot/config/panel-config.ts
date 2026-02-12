import dotenv from 'dotenv';

dotenv.config();

export interface PanelConfig {
  title: string;
  description: string;
  color: string;
  emoji: string;
  buttonLabel: string;
  buttonStyle: 'PRIMARY' | 'SECONDARY' | 'SUCCESS' | 'DANGER';
}

let panelConfig: PanelConfig = {
  title: process.env.PANEL_TITLE || 'Sistema de Tickets',
  description:
    process.env.PANEL_DESCRIPTION ||
    'Clique no botão abaixo para abrir um ticket e receber suporte da nossa equipe!',
  color: process.env.PANEL_COLOR || '#5865F2',
  emoji: process.env.PANEL_EMOJI || '🎫',
  buttonLabel: process.env.BUTTON_LABEL || 'Abrir Ticket',
  buttonStyle: (process.env.BUTTON_STYLE as any) || 'PRIMARY',
};

export function getPanelConfig(): PanelConfig {
  return panelConfig;
}

export function updatePanelConfig(newConfig: Partial<PanelConfig>): void {
  panelConfig = { ...panelConfig, ...newConfig };
}

export function resetPanelConfig(): void {
  panelConfig = {
    title: process.env.PANEL_TITLE || 'Sistema de Tickets',
    description:
      process.env.PANEL_DESCRIPTION ||
      'Clique no botão abaixo para abrir um ticket e receber suporte da nossa equipe!',
    color: process.env.PANEL_COLOR || '#5865F2',
    emoji: process.env.PANEL_EMOJI || '🎫',
    buttonLabel: process.env.BUTTON_LABEL || 'Abrir Ticket',
    buttonStyle: (process.env.BUTTON_STYLE as any) || 'PRIMARY',
  };
}
