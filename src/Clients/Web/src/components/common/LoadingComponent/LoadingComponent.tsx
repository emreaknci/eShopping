import { Box, CircularProgress, Typography } from '@mui/material';
import './LoadingComponent.css';

const LoadingComponent = () => {


  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        flexDirection={"column"}
      >
        <CircularProgress size={"5rem"} thickness={4} color="primary" />
        <Typography variant="h5" color="primary" className="loading-text">
          Yükleniyor...
        </Typography>
      </Box>
    </>
  );
};

export default LoadingComponent;
