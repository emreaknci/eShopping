import { useEffect, useState } from 'react';
import './CustomersPage.css';
import { Avatar, Card, CardActions, CardContent, CardHeader, Collapse, Grid, IconButton, TextField, Typography, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import SearchIcon from '@mui/icons-material/Search';
import { PaginationComponent } from '../../../components/common/PaginationComponent';
import UserService from '../../../services/user.service';
import { UserDto } from '../../../dtos/userDto';
import { Role } from '../../../models/role';
import { toast } from 'react-toastify';

const sxValues = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',

};
const CustomersPage = () => {
  const theme = useTheme();
  const [customers, setCustomers] = useState<UserDto[]>();
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');
  const [searchTextClicked, setSearchTextClicked] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const getCustomers = async () => {
      await UserService.getAllByRole(Role.User)
        .then((res) => {
          const result = res.data;
          setCustomers(result.data!);
          setFilteredCustomers(result.data!);
          setTotalPageCount(result.data!.length / itemsPerPage);
        })
        .catch((err) => {
          toast.error(err.response.data.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
        })
        .finally(() => {
          setSearchTextClicked(false);
        });
    }
    getCustomers();


  }, [currentPage, itemsPerPage, searchText, searchTextClicked]);

  useEffect(() => {
    const filteredCustomers = customers?.filter((customer) => {
      const emailMatch = customer.email?.toLowerCase().includes(searchText.toLowerCase());
      const fullnameMatch = customer.firstName?.toLowerCase().includes(searchText.toLowerCase()) || customer.lastName?.toLowerCase().includes(searchText.toLowerCase());
      return emailMatch || fullnameMatch;
    });

    filteredCustomers && setFilteredCustomers(filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    filteredCustomers && setTotalPageCount(filteredCustomers.length / itemsPerPage);
  }, [customers, searchText, currentPage, itemsPerPage]);

  const handleExpandClick = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
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
        {filteredCustomers && filteredCustomers.map((customer, index) => (
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
                subheader={`#${customer.id}`}
              />
              <CardContent>
                <Typography variant="body1" color="text.primary">
                  Müşteri: {customer.firstName} {customer.lastName}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Email: {customer.email}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  aria-label="show more"
                  onClick={() => handleExpandClick(index)}
                >
                  <ExpandMoreIcon />
                </IconButton>
                Siparişler
              </CardActions>
              <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit>
                <CardContent>
                  {/* <Typography variant='h5'>Adresler:</Typography>
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
                  ))} */}
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}

      </Grid>
      {filteredCustomers && <PaginationComponent
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => {
          setExpandedIndex(null);
          setCurrentPage(page)
        }}
        pageCount={Math.ceil(totalPageCount)}
      />}
    </>
  );
};

export default CustomersPage;
