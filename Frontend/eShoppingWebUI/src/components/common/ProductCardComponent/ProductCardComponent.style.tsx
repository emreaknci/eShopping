import { Button, Card, CardMedia, Typography, styled } from "@mui/material";


const ProductCard = styled(Card)({
    margin: 'auto',
    boxShadow: '0 .5rem 1rem rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    transition: '0.3s',
    '&:hover': {
        boxShadow: '0 1rem 2rem rgba(0, 0, 0, 0.2)',
    },
});

const Name = styled(Typography)({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    width: '100%',
});

const Media = styled(CardMedia)({
    paddingTop: '60%',
});

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

const AddButton = styled(Button)({
    marginTop: 10,
    width: '100%',
    padding: '.2rem',
    fontSize: '1rem',
    backgroundColor: 'primary',
});


const Styled = {
    ProductCard,
    Name,
    Media,
    Price,
    AddButton
}

export default Styled;