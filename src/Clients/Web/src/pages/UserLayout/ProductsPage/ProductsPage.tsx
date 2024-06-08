import React, { useEffect, useState } from 'react';
import {
  Box, Button, CardMedia, Collapse, FormControl, Grid,
  IconButton, InputAdornment, MenuItem, Paper, Select, Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination, TableRow, TextField, Typography
} from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown, Search } from '@mui/icons-material';
import { DialogComponent } from '../../../components/common/DialogComponent';
import './ProductsPage.css';
import { useNavigate } from 'react-router-dom';
import ProductService from '../../../services/product.service';
import { ProductFilterOptions, SortType } from '../../../dtos/products/productFilterOptions';
import { toast } from 'react-toastify';
import { ProductListDto } from '../../../dtos/products/productListDto';
import { LoadingComponent } from '../../../components/common/LoadingComponent';


import FilterBox from '../../../components/userLayout/productsPage/FilterBox';
import ProductDetails from '../../../components/userLayout/productsPage/ProductDetails';
import ProductTableRow from '../../../components/userLayout/productsPage/ProductTableRow';
const ProductsPage = () => {
  const [products, setProducts] = useState<ProductListDto[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [expandedProductId, setExpandedProductId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [initialFilters, setInitialFilters] = useState<ProductFilterOptions>({
    featureValueIds: [],
    brandIds: [],
    minPrice: 0,
    maxPrice: 0,
    sortType: SortType.DEFAULT,
    pageNumber: 1,
    pageSize: 5,
    categoryIds: [],
    searchText: ''
  });
  const [filters, setFilters] = useState<ProductFilterOptions>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const initalFilters = { ...initialFilters }
    setInitialFilters(initalFilters);
    getProductsByFilter(filters);

    return () => {
      setIsLoading(false);
      setProducts([]);
    }
  }, []);
  useEffect(() => {
    getProductsByFilter(filters);

  }, [filters]);

  useEffect(() => {
    setFilters({ ...initialFilters, searchText: searchQuery });
  }, [searchQuery])

  useEffect(() => {
    setFilters({ ...filters, pageNumber: page + 1});
  }, [page])

  const getProductsByFilter = async (filters: ProductFilterOptions) => {
    setIsLoading(true);
    await ProductService.getProducts(filters)
      .then(async (response) => {
        const dto = response.data;
        setTotalCount(dto.totalCount);
        setProducts(dto.data!);
        setCurrentPage(response.data.pageNumber);
      })
      .catch((error) => {
        console.error(error);
        toast.dismiss();
        toast.info(error.response.data.message || "Ürünler getirilirken bir hata oluştu.")
        if (error.response.data) {
          setProducts([]);
        }
      }).finally(() => {
        setIsLoading(false);
      });
  }

  const handleSort = (field: any) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleChangePage = (e: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleExpand = (productId: any) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

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


  return (
    <Grid container spacing={3}>

      <Grid item xs={12} >
        <Grid container >
          <Grid item xs={12} sm={9}>
            <Typography variant='h4'>Ürünler</Typography>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ pt: { xs: 2, sm: 0 } }}>
            <Button fullWidth variant="contained" sx={{ fontWeight: 'bold' }}
              color="primary" onClick={() => navigate("/user/add-new-product")}>
              Yeni Ürün Ekle
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} >

        <TableContainer component={Paper}>
          <FilterBox initialFilters={initialFilters} setFilters={setFilters} filters={filters} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          {isLoading ? <LoadingComponent /> :
            <>
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
                  {products.map(product => (
                    <React.Fragment key={product.id}>
                      <ProductTableRow product={product} expandedProductId={expandedProductId} handleExpand={handleExpand} />
                      {expandedProductId == product.id && <ProductDetails expandedProductId={expandedProductId} productId={product.id} setExpandedProductId={setExpandedProductId} />}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          }
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ProductsPage;