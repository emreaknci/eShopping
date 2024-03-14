import { AppBar, Container, Typography } from '@mui/material';
import styled from '@mui/system/styled';

const Footer = () => {

  const FooterContainer = styled(AppBar)({
    padding: "1.5rem",
    textAlign: 'center',
    top: 'auto',
    position: "absolute",
  });
  return (
    <FooterContainer>
      <Container>
        <Typography variant="body2">
          © {new Date().getFullYear()} My Website. All rights reserved.
        </Typography>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
