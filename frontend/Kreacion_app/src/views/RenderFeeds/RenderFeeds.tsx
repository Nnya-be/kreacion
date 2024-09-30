import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Main from 'layouts/Main';
import Container from 'components/Container';
import { Content, SidebarArticles } from './components';
// import { timeStamp } from 'console';

const RenderFeeds = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [feeds, setFeeds] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeeds = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        'https://kreacion.onrender.com/api/v1/posts/',
      );
      if (!response.ok) throw new Error('Failed to fetch feeds');
      const data = await response.json();
      setFeeds(data.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch feeds on component mount
  useEffect(() => {
    fetchFeeds();
  }, []);

  return (
    <Main colorInvert={true}>
      <Box>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                <Content feeds={feeds} />
              )}
              <Box display="flex" justifyContent="center" marginTop={2}>
                <Button
                  variant="contained"
                  onClick={fetchFeeds}
                  disabled={loading}
                >
                  {loading ? 'Refreshing...' : 'Refresh Feeds'}
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} >
              {isMd ? (
                <Box marginBottom={4} sx={{ position: 'sticky', top: '80px' }}>
                  <SidebarArticles />
                </Box>
              ) : null}
            </Grid>
          </Grid>
        </Container>
        <Box
          component={'svg'}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
          sx={{
            marginBottom: -1,
            width: 1,
          }}
        >
          <path
            fill={theme.palette.alternate.main}
            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
          ></path>
        </Box>
      </Box>
    </Main>
  );
};

export default RenderFeeds;
