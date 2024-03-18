import { useEffect, useState } from 'react';
import './CustomersPage.css';
import { createFakeUser } from '../../../mock/users';
import { Avatar, Card, CardActions, CardContent, CardHeader, Collapse, Grid, IconButton, TextField, Typography, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import SearchIcon from '@mui/icons-material/Search';


const sxValues = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',

};
const CustomersPage = () => {
  const theme = useTheme();
  const [customers, setCustomers] = useState(createFakeUser(10));
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const filteredCustomers = customers.filter((customer) => {
      const emailMatch = customer.email.toLowerCase().includes(searchText.toLowerCase());
      const fullnameMatch = customer.fullName.toLowerCase().includes(searchText.toLowerCase());
      const phoneMatch = customer.phone.includes(searchText);
      return emailMatch || fullnameMatch || phoneMatch;
    });
    setFilteredCustomers(filteredCustomers);
  }, [customers, searchText]);

  const handleExpandClick = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sx={sxValues}>
        <Typography variant='h4'>Müşteriler</Typography>
      </Grid>
      <Grid item xs={12} sx={sxValues}>
          <TextField
            label="Müşteri Ara..."
            variant="outlined"
            value={searchText}
            onChange={handleSearch}
            size="medium"
            fullWidth
            InputProps={{
              endAdornment: (
                <SearchIcon />
              ),
            }}
          />
      </Grid>
      {filteredCustomers.map((customer, index) => (
        <Grid item xs={12} sm={12} md={6} sx={sxValues} key={index}>
          <Card>
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    bgcolor: `${theme.palette.primary.main}`,
                    color: "white"
                  }}
                />
              }
              title={customer.email}
              subheader={customer.id}
            />
            <CardContent>
              <Typography variant="body1" color="text.primary">
                Müşteri: {customer.fullName}
              </Typography>
              <Typography variant="body1" color="text.primary">
                Telefon: {customer.phone}
              </Typography>

            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label="show more"
                onClick={() => handleExpandClick(index)}
              >
                <ExpandMoreIcon />
              </IconButton>
              Adresler ve Siparişler
            </CardActions>
            <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant='h5'>Adresler:</Typography>
                {customer.addresses?.map((address, index) => (
                  <Typography paragraph key={index}>
                    {index + 1} -  {address.address}, {address.city}, {address.state}
                  </Typography>
                ))}
                <br />
                <Typography variant='h5'>Siparişler:</Typography>
                {customer.userOrders?.map((order, index) => (
                  <Typography paragraph key={index}>
                    {index + 1} -  {order.id}, {order.date}, {order.totalPrice}
                  </Typography>
                ))}
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CustomersPage;
