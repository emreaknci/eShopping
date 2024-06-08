import { Badge, Button, Card, CardMedia, Typography, styled } from "@mui/material";

const cardHeight = 400; // Set your desired card height
const ProductCard = styled(Card)({
    height: cardHeight,
    margin: 'auto',
    boxShadow: '0 .5rem 1rem rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    transition: '0.3s',
    '&:hover': {
        boxShadow: '0 1rem 2rem rgba(0, 0, 0, 0.2)',
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
});


const Name = styled(Typography)({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    width: '100%',
});

const Media = styled(CardMedia)({
    paddingTop: '60%',
    ":hover": {
        "scale": "1.05"
    }
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

const UnitsInStockBadge = styled(Badge)({
});

const Styled = {
    ProductCard,
    Name,
    Media,
    Price,
    AddButton,
    UnitsInStockBadge
}

export default Styled;