import { useCallback, useMemo, useState } from 'react';
import type { ColDef, GridApi, ICellRendererParams, SortChangedEvent } from 'ag-grid-community';
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
import { useEmployees } from '../hooks/useEmployees';
import type { Employee } from '../api/employeeApi';

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export default function GridPage() {
  const [gridApi, setGridApi] = useState<GridApi<Employee> | null>(null);

  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const { data, isFetching } = useEmployees({ page, size, search, sortBy, sortDir });

  const columnDefs = useMemo<ColDef<Employee>[]>(
    () => [
      { field: 'id', headerName: 'ID', width: 80, flex: 0, sortable: true, filter: false },
      { field: 'name', headerName: 'Name', sortable: true },
      { field: 'department', headerName: 'Department', sortable: true },
      { field: 'role', headerName: 'Role', sortable: true },
      {
        field: 'status',
        headerName: 'Status',
        sortable: true,
        cellRenderer: (params: ICellRendererParams<Employee>) =>
          params.value ? <StatusChip status={params.value} /> : null,
      },
      {
        field: 'salary',
        headerName: 'Salary',
        sortable: true,
        valueFormatter: ({ value }) => usdFormatter.format(value),
        type: 'numericColumn',
      },
      { field: 'startDate', headerName: 'Start Date', sortable: true },
    ],
    [],
  );

  const handleExportCsv = useCallback(() => {
    gridApi?.exportDataAsCsv({ fileName: 'employees.csv' });
  }, [gridApi]);

  const [searchInput, setSearchInput] = useState('');

  const handleSearchCommit = useCallback(() => {
    setSearch(searchInput);
    setPage(0);
  }, [searchInput]);

  const onSortChanged = useCallback((e: SortChangedEvent<Employee>) => {
    // AG Grid v30+ gets sort state differently from column models
    const columns = e.api.getColumns();
    const sortedCol = columns?.find((c) => c.getSort() != null);
    
    if (sortedCol) {
      setSortBy(sortedCol.getColId());
      setSortDir(sortedCol.getSort() as 'asc' | 'desc');
    } else {
      setSortBy('id');
      setSortDir('asc');
    }
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Data Grid (Server-Side)
      </Typography>

      <Card>
        <CardHeader
          title="Employees"
          subheader={data ? `Total: ${data.totalElements} records` : 'Loading...'}
          action={
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <TextField
                size="small"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchCommit()}
                sx={{ width: 200 }}
              />
              <Button variant="contained" onClick={handleSearchCommit}>
                Search
              </Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleExportCsv}
                disabled={!gridApi || isFetching}
              >
                Export CSV
              </Button>
            </Stack>
          }
        />
        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
          <AgGridWrapper<Employee>
            rowData={data?.content || []}
            columnDefs={columnDefs}
            height={520}
            onGridApiReady={setGridApi}
            onSortChanged={onSortChanged}
            pagination={false}
            overlayLoadingTemplate={isFetching ? '<span class="ag-overlay-loading-center">Loading...</span>' : ''}
          />

          {data && (
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Typography variant="body2">
                Showing {data.number * data.size + 1} to {Math.min((data.number + 1) * data.size, data.totalElements)} of {data.totalElements}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button 
                  disabled={data.first || isFetching} 
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  size="small"
                >
                  Previous
                </Button>
                <Button 
                  disabled={data.last || isFetching} 
                  onClick={() => setPage((p) => p + 1)}
                  size="small"
                >
                  Next
                </Button>
              </Stack>
            </Stack>
          )}

        </CardContent>
      </Card>
    </Box>
  );
}
