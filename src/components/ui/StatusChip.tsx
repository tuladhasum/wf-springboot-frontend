import { Chip } from '@mui/material';
import type { ChipProps } from '@mui/material';

type Status = 'active' | 'inactive' | 'pending' | string;

const STATUS_COLOR: Record<Status, ChipProps['color']> = {
  active: 'success',
  inactive: 'default',
  pending: 'warning',
};

interface StatusChipProps {
  status: Status;
}

/** Reusable status chip used in grid cells and cards. */
export default function StatusChip({ status }: StatusChipProps) {
  return (
    <Chip
      label={status.charAt(0).toUpperCase() + status.slice(1)}
      color={STATUS_COLOR[status] ?? 'info'}
      size="small"
      variant="outlined"
    />
  );
}
