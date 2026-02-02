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
    title: 'Delete user',
    description:
      'This action will permanently delete the user and all related data. This cannot be undone.',
    confirmLabel: 'Delete user',
    confirmColor: 'error',
    Icon: DeleteIcon,
    HeaderIcon: WarningIcon,
  },
  Deactivate: {
    title: 'Deactivate user',
    description:
      'The user will lose access to the system but their data will be preserved.',
    confirmLabel: 'Deactivate user',
    confirmColor: 'warning',
    Icon: BlockIcon,
    HeaderIcon: WarningIcon,
  },
  Activate: {
    title: 'Activate user',
    description:
      'The user will regain access to the system and all permissions.',
    confirmLabel: 'Activate user',
    confirmColor: 'success',
    Icon: CheckCircleIcon,
    HeaderIcon: CheckCircleIcon,
  },
} as const;

/* =========================
   TYPES (NO DUPLICADOS)
   ========================= */

export type DialogActionKey = keyof typeof ACTION_DIALOG_CONFIG;
export type FormActionKey = 'Edit' | 'Show';
export type UserActionKey = DialogActionKey | FormActionKey;
export type ActionType = 'dialog' | 'form';

/* =========================
   MENU ACTIONS
   ========================= */

export interface ActionItem {
  key: UserActionKey;
  label: string;
  type: ActionType;
  Icon: React.ElementType;
}

export const USER_ACTIONS: ActionItem[] = [
  {
    key: 'Show',
    label: 'View',
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

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const USER_ACTIONS_BY_STATUS: Record<UserStatus, UserActionKey[]> = {
  [UserStatus.ACTIVE]: ['Show', 'Edit', 'Deactivate', 'Delete'],
  [UserStatus.INACTIVE]: ['Show', 'Activate', 'Delete'],
};

export function getUserActionsByStatus(
  status: UserStatus
): ActionItem[] {
  const allowedKeys = USER_ACTIONS_BY_STATUS[status] ?? [];

  return USER_ACTIONS.filter(action =>
    allowedKeys.includes(action.key)
  );
}