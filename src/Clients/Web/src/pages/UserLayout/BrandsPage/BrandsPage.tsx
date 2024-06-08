import React, { useEffect, useState } from 'react';
import './BrandsPage.css';
import { BrandListDto } from '../../../dtos/brands/brandListDto';
import BrandService from '../../../services/brand.service';
import { Button, Grid, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from 'react-toastify';
const BrandsPage = () => {
  const [brands, setBrands] = useState<BrandListDto[]>([]);
  const [filteredBrands, setFilteredBrands] = useState(brands);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openNewBrand, setOpenNewBrand] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');

  const getBrands = async () => {
    BrandService.getBrands().then((response) => {
      setBrands(response.data.data!);
      setFilteredBrands(response.data.data!);
    }).catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    const filteredBrands = brands?.filter((brand) => {
      const nameMatch = brand.name?.toLowerCase().includes(searchText.toLowerCase());
      return nameMatch
    });
    setFilteredBrands(filteredBrands);
  }, [brands, searchText]);

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  }

  const handleChangePage = (e: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleCancelNewBrand = () => {
    setOpenNewBrand(false);
    setNewBrandName('');
  }

  const handleAddNewBrand = () => {
    console.log(newBrandName)

    const checkIfBrandExists = brands?.find((brand) => brand.name.toLowerCase() === newBrandName.toLowerCase());
    if (checkIfBrandExists) {
      toast.dismiss();
      toast.error('Bu marka zaten mevcut.');
      return;
    }
    const dto: { name: string; } = {
      name: newBrandName.toUpperCase()
    }
    BrandService.createBrand(dto).then((response) => {
      getBrands();
      toast.success('Marka başarıyla eklendi.');
      setOpenNewBrand(false);
      setNewBrandName('');
    }).catch((error) => {
      console.log(error);
      toast.error(error.response.data.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
    });
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Grid container>
          <Grid item xs={12} sm={9}>
            <Typography variant='h4'>Markalar</Typography>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ pt: { xs: 2, sm: 0 } }}>
            <Button fullWidth variant="contained" sx={{ fontWeight: 'bold' }}
              color="primary" onClick={() => setOpenNewBrand(prev => !prev)}>
              {openNewBrand ? "Vazgeç" : "Yeni Marka Ekle"}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{
        display: !openNewBrand ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TextField
          label="Marka Ara..."
          variant="outlined"
          value={searchText}
          onChange={handleSearch}
          fullWidth
          InputProps={{
            endAdornment: (
              <SearchIcon />
            ),
          }}
        />
      </Grid>

      <Grid item xs={12} sx={{
        display: openNewBrand ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TextField
          label="Yeni Marka Adı"
          variant="outlined"
          value={newBrandName}
          onChange={(e) => setNewBrandName(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <>
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleCancelNewBrand}>
                    <CancelIcon color='primary' />
                  </IconButton>
                </InputAdornment>
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleAddNewBrand}>
                    <AddCircleIcon color='success' />
                  </IconButton>
                </InputAdornment>
              </>
            ),
          }}


        />

      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>

            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Marka Adı</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredBrands && filteredBrands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>#{brand.id}</TableCell>
                  <TableCell>{brand.name} </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
          {filteredBrands && <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredBrands.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />}
        </TableContainer>
      </Grid>

    </Grid>
  )
};

export default BrandsPage;
