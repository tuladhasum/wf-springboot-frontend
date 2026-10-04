import { useCallback, useMemo, useState } from 'react';
import type { ColDef, GridApi, ICellRendererParams } from 'ag-grid-community';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import AgGridWrapper from '../components/grid/AgGridWrapper';
import StatusChip from '../components/ui/StatusChip';

// ─── Demo data type ───────────────────────────────────────────────────────────
interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  salary: number;
  startDate: string;
}

// ─── Demo data ────────────────────────────────────────────────────────────────
const DEMO_DATA: Employee[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Employee ${i + 1}`,
  department: ['Engineering', 'Marketing', 'Finance', 'HR', 'Operations'][i % 5],
  role: ['Engineer', 'Manager', 'Analyst', 'Coordinator', 'Director'][i % 5],
  status: (['active', 'inactive', 'pending'] as const)[i % 3],
  salary: 60_000 + i * 1_000,
  startDate: new Date(2020 + (i % 4), i % 12, (i % 28) + 1)
    .toISOString()
    .slice(0, 10),
}));

// ─── Currency formatter ───────────────────────────────────────────────────────
const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

/**
 * GridPage — demonstrates the recommended AG Grid + MUI integration pattern:
 *
 *  1. Column definitions are memoised outside the render path.
 *  2. `AgGridWrapper` is the single integration point — all grid props live there.
 *  3. Custom cell renderers use MUI components (StatusChip).
 *  4. Toolbar actions use the GridApi obtained via `onGridApiReady`.
 */
export default function GridPage() {
  const [gridApi, setGridApi] = useState<GridApi<Employee> | null>(null);
  const [quickFilter, setQuickFilter] = useState('');

  // ── Column definitions ─────────────────────────────────────────────────────
  const columnDefs = useMemo<ColDef<Employee>[]>(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        width: 80,
        flex: 0,
        sortable: true,
        filter: false,
      },
      { field: 'name', headerName: 'Name' },
      { field: 'department', headerName: 'Department' },
      { field: 'role', headerName: 'Role' },
      {
        field: 'status',
        headerName: 'Status',
        // ── Custom MUI cell renderer ──────────────────────────────────────
        cellRenderer: (params: ICellRendererParams<Employee>) =>
          params.value ? <StatusChip status={params.value} /> : null,
        filter: 'agTextColumnFilter',
      },
      {
        field: 'salary',
        headerName: 'Salary',
        valueFormatter: ({ value }) => usdFormatter.format(value),
        type: 'numericColumn',
        filter: 'agNumberColumnFilter',
      },
      {
        field: 'startDate',
        headerName: 'Start Date',
        filter: 'agDateColumnFilter',
      },
    ],
    [],
  );

  // ── Toolbar handlers ───────────────────────────────────────────────────────
  const handleExportCsv = useCallback(() => {
    gridApi?.exportDataAsCsv({ fileName: 'employees.csv' });
  }, [gridApi]);

  const handleQuickFilter = useCallback(
    (value: string) => {
      setQuickFilter(value);
      gridApi?.setGridOption('quickFilterText', value);
    },
    [gridApi],
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Data Grid
      </Typography>

      <Card>
        <CardHeader
          title="Employees"
          subheader={`${DEMO_DATA.length} records`}
          action={
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="Quick filter…"
                value={quickFilter}
                onChange={(e) => handleQuickFilter(e.target.value)}
                sx={{ width: 200 }}
              />
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleExportCsv}
                disabled={!gridApi}
              >
                Export CSV
              </Button>
            </Stack>
          }
        />
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <AgGridWrapper<Employee>
            rowData={DEMO_DATA}
            columnDefs={columnDefs}
            height={520}
            onGridApiReady={setGridApi}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
