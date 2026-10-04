import { useCallback, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { AgGridReactProps, AgGridReact as AgGridReactType } from 'ag-grid-react';
import type { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { themeBalham } from 'ag-grid-community';
import { Box, useTheme } from '@mui/material';

/**
 * Recommended AG Grid wrapper pattern:
 *
 *  - Uses `themeBalham` (the modern theming API — no CSS imports needed).
 *  - Exposes `gridApiRef` for imperative access (export, selection, etc.).
 *  - Applies sensible defaults that match the MUI design system.
 *  - All AG Grid props are forwarded via spread so it stays fully flexible.
 */
interface AgGridWrapperProps<TData> extends AgGridReactProps<TData> {
  /** Controlled height; defaults to 500px */
  height?: number | string;
  /** Column definitions */
  columnDefs: ColDef<TData>[];
  /** Optional ref callback to access the underlying GridApi */
  onGridApiReady?: (api: GridApi<TData>) => void;
}

export default function AgGridWrapper<TData>({
  height = 500,
  columnDefs,
  onGridApiReady,
  ...rest
}: AgGridWrapperProps<TData>) {
  const muiTheme = useTheme();
  const gridRef = useRef<AgGridReactType<TData>>(null);

  // Default column definition — override per-column via columnDefs
  const defaultColDef = useMemo<ColDef<TData>>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    }),
    [],
  );

  const onGridReady = useCallback(
    (event: GridReadyEvent<TData>) => {
      onGridApiReady?.(event.api);
    },
    [onGridApiReady],
  );

  return (
    <Box
      sx={{
        height,
        width: '100%',
        borderRadius: `${muiTheme.shape.borderRadius}px`,
        overflow: 'hidden',
        border: `1px solid ${muiTheme.palette.divider}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
    >
      <AgGridReact<TData>
        ref={gridRef}
        theme={themeBalham}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        animateRows
        rowSelection={{ mode: 'multiRow', checkboxes: true }}
        pagination
        paginationPageSize={20}
        paginationPageSizeSelector={[10, 20, 50, 100]}
        suppressMovableColumns={false}
        {...rest}
      />
    </Box>
  );
}
