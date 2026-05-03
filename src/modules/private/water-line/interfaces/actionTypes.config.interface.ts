import {
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Block as BlockIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

/* =========================
   ACTION CONFIG
   ========================= */

export const ACTION_DIALOG_CONFIG = {
  Deactivate: {
    title: 'Deactivate water line',
    description:
      'The water line will be deactivated but its data will be preserved.',
    confirmLabel: 'Deactivate water line',
    confirmColor: 'warning',
    Icon: BlockIcon,
    HeaderIcon: WarningIcon,
  },
  Activate: {
    title: 'Activate water line',
    description:
      'The water line will be activated again and available in the system.',
    confirmLabel: 'Activate water line',
    confirmColor: 'success',
    Icon: CheckCircleIcon,
    HeaderIcon: CheckCircleIcon,
  },
} as const;

/* =========================
   TYPES
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
  }
];

export enum WaterLineStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const ACTIONS_BY_STATUS: Record<WaterLineStatus, ActionKey[]> = {
  [WaterLineStatus.ACTIVE]: ['Detail', 'Edit', 'Deactivate'],
  [WaterLineStatus.INACTIVE]: ['Detail', 'Activate'],
};

export function getWaterLineActionsByStatus(
  status: WaterLineStatus
): ActionItem[] {
  const allowedKeys = ACTIONS_BY_STATUS[status] ?? [];

  return ITEM_ACTIONS.filter(action =>
    allowedKeys.includes(action.key)
  );
}