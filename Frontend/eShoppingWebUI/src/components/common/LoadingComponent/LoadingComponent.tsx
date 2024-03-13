import { Box, CircularProgress } from '@mui/material';
import './LoadingComponent.css';

const LoadingComponent = () => {


  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <CircularProgress size={"5rem"} thickness={4} color="primary" />
      </Box>
    </>
  );
};

export default LoadingComponent;
