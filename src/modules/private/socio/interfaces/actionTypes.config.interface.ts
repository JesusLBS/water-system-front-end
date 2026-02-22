import {
  Warning as WarningIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Block as BlockIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

/* =========================
   ACTION CONFIG
   ========================= */

export const ACTION_DIALOG_CONFIG = {
  Delete: {
    title: 'Delete socio',
    description:
      'This action will permanently delete the socio and all related data. This cannot be undone.',
    confirmLabel: 'Delete socio',
    confirmColor: 'error',
    Icon: DeleteIcon,
    HeaderIcon: WarningIcon,
  },
  Deactivate: {
    title: 'Deactivate socio',
    description:
      'The socio will lose access to the system but their data will be preserved.',
    confirmLabel: 'Deactivate socio',
    confirmColor: 'warning',
    Icon: BlockIcon,
    HeaderIcon: WarningIcon,
  },
  Activate: {
    title: 'Activate socio',
    description:
      'The socio will regain access to the system and all permissions.',
    confirmLabel: 'Activate socio',
    confirmColor: 'success',
    Icon: CheckCircleIcon,
    HeaderIcon: CheckCircleIcon,
  },
} as const;

/* =========================
   TYPES (NO DUPLICADOS)
   ========================= */

export type DialogActionKey = keyof typeof ACTION_DIALOG_CONFIG;
export type FormActionKey = 'Edit' | 'Detail';
export type ActionKey = DialogActionKey | FormActionKey;
export type ActionType = 'dialog' | 'form';

/* =========================
   MENU ACTIONS
   ========================= */

export interface ActionItem {
  key: ActionKey;
  label: string;
  type: ActionType;
  Icon: React.ElementType;
}

export const ITEM_ACTIONS: ActionItem[] = [
  {
    key: 'Detail',
    label: 'Detail',
    type: 'form',
    Icon: VisibilityIcon,
  },
  {
    key: 'Edit',
    label: 'Edit',
    type: 'form',
    Icon: EditIcon,
  },
  {
    key: 'Activate',
    label: 'Activate',
    type: 'dialog',
    Icon: CheckCircleIcon,
  },
  {
    key: 'Deactivate',
    label: 'Deactivate',
    type: 'dialog',
    Icon: BlockIcon,
  },
  {
    key: 'Delete',
    label: 'Delete',
    type: 'dialog',
    Icon: DeleteIcon,
  },
];

export enum SocioStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const ACTIONS_BY_STATUS: Record<SocioStatus, ActionKey[]> = {
  [SocioStatus.ACTIVE]: ['Detail', 'Edit', 'Deactivate', 'Delete'],
  [SocioStatus.INACTIVE]: ['Detail', 'Activate', 'Delete'],
};

export function getUserActionsByStatus(
  status: SocioStatus
): ActionItem[] {
  const allowedKeys = ACTIONS_BY_STATUS[status] ?? [];

  return ITEM_ACTIONS.filter(action =>
    allowedKeys.includes(action.key)
  );
}