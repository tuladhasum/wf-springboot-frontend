import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  Alert,
} from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useHello } from '../hooks/useHello';

export default function HomePage() {
  const { data, isLoading, isError, error } = useHello();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Overview of the wf-springboot application.
      </Typography>

      <Grid container spacing={3}>
        {/* ── Backend status card ── */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Backend Status
              </Typography>

              {isLoading && <CircularProgress size={24} />}

              {isError && (
                <Alert severity="error">
                  {(error as Error)?.message ?? 'Failed to reach backend'}
                </Alert>
              )}

              {data && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleOutlinedIcon color="success" />
                  <Typography>{data.message}</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* ── Quick links card ── */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Navigate to <strong>Data Grid</strong> in the sidebar to explore
                the AG Grid integration.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
