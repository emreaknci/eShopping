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
import { FeatureValueDto } from '../../../dtos/features/featureValueDto';
import { toast } from 'react-toastify';
import { ProductListDto } from '../../../dtos/products/productListDto';
import { ProductDetailDto } from '../../../dtos/products/productDetailDto';
import { LoadingComponent } from '../../../components/common/LoadingComponent';
import CategoryService from '../../../services/category.service';

const baseImagePath = import.meta.env.VITE_API_GATEWAY + '/' + import.meta.env.VITE_CATALOG_IMAGES + '/';
import categories from './../../../mock/category';
import { CategoryListDto } from '../../../dtos/categories/categoryListDto';
import FilterBox from '../../../components/userLayout/productsPage/FilterBox';

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductListDto[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [expandedProductId, setExpandedProductId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const [isLoading, setIsLoading] = useState(true);
  const [initialFilters, setInitialFilters] = useState<ProductFilterOptions>({
    featureValueIds: [],
    brandIds: [],
    minPrice: 0,
    maxPrice: 0,
    sortType: SortType.DEFAULT,
    pageNumber: 1,
    pageSize: 10,
    categoryIds: []
  });
  const [filters, setFilters] = useState<ProductFilterOptions>(initialFilters);
  const [selectedFeatureValues, setSelectedFeatureValues] = useState<FeatureValueDto[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [currentProductDetail, setCurrentProductDetail] = useState<ProductDetailDto | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initalFilters = { ...initialFilters }
    setInitialFilters(initalFilters);
    getProductsByFilter(filters);

    return () => {
      setIsLoading(false);
      setSelectedFeatureValues([]);
      setProducts([]);
    }
  }, []);

  useEffect(() => {
    getProductsByFilter(filters);
  }, [filters]);

  useEffect(() => {
    const getProductDetail = async (productId: number) => {
      setIsLoading(true);
      ProductService.getProductById(productId).then((response) => {
        setCurrentProductDetail(response.data.data);
        setExpandedProductId(productId);
      }).catch((error) => {
        toast.info(error.response.data.message || "Ürün detayları getirilirken bir hata oluştu.")
        setCurrentProductDetail(null);
        setExpandedProductId(null);
      }).finally(() => {
        setIsLoading(false);
      });
    }
    if (expandedProductId)
      getProductDetail(expandedProductId);
  }, [expandedProductId]);

  const getProductsByFilter = async (filters: ProductFilterOptions) => {
    setIsLoading(true);

    await ProductService.getProducts(filters)
      .then(async (response) => {
        const dto = response.data.data;
        setProducts(dto!);
        setCurrentPage(response.data.pageNumber);
        console.log(dto);
      })
      .catch((error) => {
        console.error(error);
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

  const renderTableBodyParentRow = (product: ProductListDto) => {
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



  const renderTableBodySubRow = (productId: number) => {

    if (isLoading)
      return <LoadingComponent />;

    if (currentProductDetail === null)
      return null;

    return (
      <TableRow >
        <TableCell colSpan={4}>
          <Collapse in={expandedProductId === currentProductDetail.id} timeout="auto" unmountOnExit>
            <Grid container spacing={3}>
              <Grid item md={4} >
                <Typography variant="h6" fontWeight={"bold"}>
                  Ürün Bilgileri
                </Typography>
                <Grid container>
                  <Grid item xs={12}>
                    <p>
                      <strong>Açıklama:</strong> {currentProductDetail.description}
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    <p>
                      <strong>Stok Miktarı:</strong> {currentProductDetail.unitsInStock} adet
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    <p>
                      <strong style={{ fontSize: "1.2rem", marginBottom: ".5rem" }}>Ürün Özellikleri</strong>
                    </p>
                    {currentProductDetail.features.map((feature, index) => (
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
                  {currentProductDetail.images.map((image, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                      <CardMedia
                        component="img"
                        height="250"
                        image={baseImagePath + image.url}
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

  const handleSearchQuery = (e: any) => {
    setSearchQuery(e.target.value);
    setPage(0);
  }

  const [categories, setCategories] = useState<CategoryListDto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(null);





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
        {isLoading && <LoadingComponent />}

        {!isLoading &&
          <TableContainer component={Paper}>
            <FilterBox initialFilters={initialFilters} setFilters={setFilters} filters={filters}/>
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
                    {renderTableBodySubRow(product.id)}
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
          </TableContainer>}
      </Grid>
    </Grid>
  );
};


export default ProductsPage;