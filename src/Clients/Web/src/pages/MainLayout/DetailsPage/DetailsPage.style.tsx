import { Typography, styled } from "@mui/material";



const Price = styled(Typography)({
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#5cb85c',
    width: '100%',
    transition: 'color 0.3s ease',
    '&:hover': {
        color: '#5cd85c',
    },
});



const Styled = {
    Price,
}

export default Styled;