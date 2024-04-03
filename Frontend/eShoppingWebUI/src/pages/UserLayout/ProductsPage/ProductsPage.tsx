import React, { useState } from 'react';
import {
  Box, Button, CardMedia,
  Collapse, FormControl, Grid,
  IconButton, InputAdornment, MenuItem,
  Paper, Select, Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination,
  TableRow, TextField, Typography
} from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown, Search } from '@mui/icons-material';
import { DialogComponent } from '../../../components/common/DialogComponent';
import './ProductsPage.css';
import { Product, createFakeCategories } from '../../../mock/category';

const ProductsPage = () => {
  const [products, setProducts] = useState(createFakeCategories(20, 5).flatMap(category => category.products));
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [confirmAction, setConfirmAction] = useState('');
  const [currentItemId, setCurrentItemId] = useState(null);



  const handleCancelItem = (itemId: any) => {
    setOpenAlert(true);
    setConfirmAction('cancelProductItem');
    setAlertText('Ürün iptal edilecek. Onaylıyor musunuz?');
    setCurrentItemId(itemId)
  }

  const handleCancelProduct = (productId: any) => {
    setOpenAlert(true);
    setConfirmAction('cancelProduct');
    setAlertText('Sipariş iptal edilecek. Onaylıyor musunuz?');
    setCurrentItemId(productId)
  }


  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleExpand = (productId: any) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };


  const filteredProducts = products.filter(product => {
    const includesSearch = Object.values(product).some(value => {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });
    return includesSearch;
  });


  const sortedProducts = sortField ? filteredProducts.sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    if (sortDirection === 'asc') {
      return fieldA < fieldB ? -1 : 1;
    } else {
      return fieldA > fieldB ? -1 : 1;
    }
  }) : filteredProducts;

  const paginatedProducts = sortedProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  const renderTableHeadCell = (name: string, fieldName?: string, align: 'left' | 'center' | 'right' = 'left') => {
    return (
      <>
        <TableCell align={align}>
          {fieldName ? (
            <Button onClick={() => handleSort(fieldName)} color="inherit">
              {name}
              {sortDirection === 'asc' ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </Button>
          ) : (
            <Typography color="main">
              {name}
            </Typography>
          )}
        </TableCell>
      </>
    );
  };

  const renderTableBodyParentRow = (product: Product) => {
    return (
      <TableRow sx={{ pb: 5, pt: 5 }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleExpand(product.id)}
          >
            {expandedProductId === product.id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
          {product.id}
        </TableCell>
        <TableCell >
          <Typography align='center'>
            {product.name}
          </Typography>
        </TableCell>
        <TableCell >
          <Typography align='center'>
            {product.price} TL
          </Typography>
        </TableCell>
      </TableRow>
    )
  }

  const renderTableBodySubRow = (product: Product) => {
    return (
      <TableRow >
        <TableCell colSpan={4}>
          <Collapse in={expandedProductId === product.id} timeout="auto" unmountOnExit>
            <Grid container spacing={3}>
              <Grid item md={4} >
                <Typography variant="h6" fontWeight={"bold"}>
                  Ürün Bilgileri
                </Typography>
                <Grid container>
                  <Grid item xs={12}>
                    <p>
                      <strong>Açıklama:</strong> {product.description}
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    <p>
                      <strong>Stok Miktarı:</strong> {product.unitOfStock} adet
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    <p>
                      <strong style={{ fontSize: "1.2rem", marginBottom: ".5rem" }}>Ürün Özellikleri</strong>
                    </p>
                    {product.features.map((feature, index) => (
                      <p key={index}>
                        <strong>{feature.name}:</strong> {feature.value}
                      </p>
                    ))}
                  </Grid>

                </Grid>

              </Grid>
              <Grid item md={8}>
                <Typography variant="h6" fontWeight={"bold"}  >
                  Ürün Resimleri
                </Typography>
                <Grid container spacing={2}>
                  {product.images.map((image, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={image}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    )
  }

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  }
  const renderSearchAndFilterBox = () => {
    return (
      <Box p={2}>
        <TextField
          label="Ara"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchQuery}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <FormControl variant="outlined" size="small" style={{ marginLeft: 10 }}>
          <Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="All">Hepsi</MenuItem>
          </Select>
        </FormControl>
      </Box>
    )

  }

  return (
    <Grid container spacing={3}>

      <Grid item xs={12} >
        <Grid container >
          <Grid item xs={12} sm={9}>
            <Typography variant='h4'>Ürünler</Typography>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ pt: { xs: 2, sm: 0 } }}>
            <Button fullWidth variant="contained" sx={{ fontWeight: 'bold' }}
              color="primary" >
              Yeni Ürün Ekle
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} >
        <TableContainer component={Paper}>
          {renderSearchAndFilterBox()}
          <Table>
            <TableHead>
              <TableRow>
                {renderTableHeadCell('ID', 'id')}
                {renderTableHeadCell('ÜRÜN ADI', 'name', 'center')}
                {renderTableHeadCell('FİYAT', 'price', 'center')}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedProducts.map(product => (
                <React.Fragment key={product.id}>
                  {renderTableBodyParentRow(product)}
                  {renderTableBodySubRow(product)}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={sortedProducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Grid>
    </Grid>
  );
};


export default ProductsPage;
