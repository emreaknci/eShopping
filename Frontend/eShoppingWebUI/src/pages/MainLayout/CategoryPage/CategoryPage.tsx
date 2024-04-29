import React, { useEffect, useState } from 'react';
import './CategoryPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../../styles';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Close from '@mui/icons-material/Close';
import ExpandMore from '@mui/icons-material/ExpandMore';
import categories from '../../../mock/category';
import { ProductCardComponent } from '../../../components/common/ProductCardComponent';
import { LoadingComponent } from '../../../components/common/LoadingComponent';
import { FeatureDto } from '../../../dtos/features/featureDto';
import CategoryService from '../../../services/category.service';
import { CategoryListDto } from '../../../dtos/categories/categoryListDto';
import FeatureService from '../../../services/feature.service';
import { FeatureValueDto } from '../../../dtos/features/featureValueDto';
import { BrandListDto } from '../../../dtos/brands/brandListDto';
import { ProductFilterOptions, SortType } from '../../../dtos/products/productFilterOptions';
import ProductService from '../../../services/product.service';
import { ProductListDto } from '../../../dtos/products/productListDto';
import { toast } from 'react-toastify';



const CategoryPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const navigate = useNavigate();
  const theme = useTheme();
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
  const [category, setCategory] = useState<CategoryListDto>();
  const [products, setProducts] = useState<ProductListDto[]>([]);
  const [selectedFeatureValues, setSelectedFeatureValues] = useState<FeatureValueDto[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<BrandListDto[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<ProductFilterOptions>(initialFilters);
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [expandedFilter, setExpandedFilter] = useState(isMediumScreen ? false : true);


  const [selectedSortType, setSelectedSortType] = useState<SortType>(SortType.DEFAULT);

  useEffect(() => {
    const initalFilters = { ...initialFilters, categoryIds: [Number(id)] }
    setInitialFilters(initalFilters);
    getCategoryById(Number(id));
    getProductsByFilter(Number(id), initalFilters);
    return () => {
      setIsLoading(false);
      setSelectedFeatureValues([]);
      setProducts([]);
    }
  }, [id]);


  const getCategoryById = async (id: number) => {
    setIsLoading(true);
    await CategoryService.getById(id)
      .then(async (response) => {
        const dto = response.data.data!;
        setCategory(dto);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {


  }, [filters])


  const getProductsByFilter = async (categoryId: number, filters: ProductFilterOptions) => {
    setIsLoading(true);

    await ProductService.getProducts(filters)
      .then(async (response) => {
        const dto = response.data.data;
        setProducts(dto!);
        setCurrentPage(response.data.pageNumber);
        setIsLoading(false);
        console.log(dto);
      })
      .catch((error) => {
        // console.error(error);
        toast.info(error.response.data.message || "Ürünler getirilirken bir hata oluştu.")
        if (error.response.data) {
          setProducts([]);
        }
      }).finally(() => {
        setIsLoading(false);
      });
  }
  const handleSortType = (event: any) => {
    setSelectedSortType(event.target.value);
  };

  const handleSelectedFeatureValue = (featureValue: FeatureValueDto) => {
    const copy = [...selectedFeatureValues];
    if (copy.includes(featureValue)) {
      const index = copy.indexOf(featureValue);
      copy.splice(index, 1);
    }
    else {
      copy.push(featureValue);
    }
    setSelectedFeatureValues(copy);
    setFilters({ ...filters, featureValueIds: copy.map((value) => value.id) });
  }


  const handleApplyFilters = async () => {
    await getProductsByFilter(Number(id), filters);
  }

  const renderFeatureAccordion = (feature: FeatureDto) => {
    return (
      <div style={{ marginBottom: "1rem" }}>
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id={`panel1a-header_${feature.id}`}
          >
            <Typography fontWeight={"bold"}>{feature.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {feature.values && feature.values.map((value, index) => (
                <FormControlLabel key={index}
                  control={<Checkbox checked={selectedFeatureValues.includes(value)} onChange={() => handleSelectedFeatureValue(value)} />}
                  label={value.value} />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }

  const handleSelectedBrand = (brand: BrandListDto) => {
    const copy = [...selectedBrands];
    if (copy.includes(brand)) {
      const index = copy.indexOf(brand);
      copy.splice(index, 1);
    }
    else {
      copy.push(brand);
    }
    setSelectedBrands(copy);
    setFilters({ ...filters, brandIds: copy.map((brand) => brand.id) });
  }
  const renderBrandAccordion = () => {
    const brands = category?.brands;


    return (
      <div style={{ marginBottom: "1rem" }}>
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id={`panel1a-header_brands`}
          >
            <Typography fontWeight={"bold"}>Markalar</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {brands && brands.map((brand: BrandListDto, index: number) => (
                <FormControlLabel key={index}
                  control={<Checkbox checked={selectedBrands.includes(brand)} onChange={() => handleSelectedBrand(brand)} />}
                  label={brand.name} />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }

  const renderPriceAccordion = () => {
    const handleMinPriceChange = (event: any) => {
      setMinPrice(event.target.value);
      setFilters({ ...filters, minPrice: Number(event.target.value) });
    };

    const handleMaxPriceChange = (event: any) => {
      setMaxPrice(event.target.value);
      setFilters({ ...filters, maxPrice: Number(event.target.value) });
    };

    return (
      <div style={{ marginBottom: "1rem" }}>
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id={`panel1a-header_brands`}
          >
            <Typography fontWeight={"bold"}>Fiyat Aralığı</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <TextField
                label="Minimum Fiyat"
                type="number"
                value={minPrice}
                onChange={handleMinPriceChange}
                variant="outlined"
                fullWidth
                sx={{ mb: 1 }}
                inputProps={{ min: 0 }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₺</InputAdornment>,
                }}
              />
              <TextField
                label="Maksimum Fiyat"
                type="number"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                variant="outlined"
                sx={{ mt: 1 }}
                fullWidth
                inputProps={{ min: 0 }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₺</InputAdornment>,
                }}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </div>
    );

  }

  const renderSubCategoriesAccordion = (subCategories: CategoryListDto[]) => {
    return (
      <div style={{ marginBottom: "1rem" }}>
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id={`panel1a-header_brands`}
          >
            <Typography fontWeight={"bold"}>Kategoriler</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {subCategories.map((category: CategoryListDto, index: number) => (
                <FormControlLabel key={index}
                  control={<Checkbox onClick={() => navigate(`/category/${category.id}`)} />}
                  label={category.name} />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }

  const renderProductsList = () => {
    return (
      <Grid container spacing={3}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ProductCardComponent product={product} />
          </Grid>
        ))}
      </Grid>
    );
  }

  const handleClearAllFilters = async () => {
    setFilters(initialFilters);
    setSelectedBrands([]);
    setSelectedFeatureValues([]);
    setMinPrice('');
    setMaxPrice('');
    await getProductsByFilter(Number(id), initialFilters);
  };

  const renderSelectedFilters = () => {
    const checkIfFiltersEmpty = () => {
      if (filters) {
        if (filters.brandIds && filters.brandIds.length > 0)
          return true;

        if (filters.featureValueIds && filters.featureValueIds.length > 0)
          return true;

        if (filters.minPrice && filters.minPrice > 0)
          return true;

        if (filters.maxPrice && filters.maxPrice > 0)
          return true;

      }
      return false;
    }

    return (
      <>
        {checkIfFiltersEmpty() &&
          <Grid item xs={12} sm={12}>
            Seçilen Filtreler:
            <Button
              variant="contained"
              size="small"
              sx={{ margin: '0.5rem' }}
              onClick={handleClearAllFilters}
            >
              Tüm Filtreleri Kaldır
            </Button>

            {filters.brandIds && filters.brandIds.length > 0 && filters.brandIds.map((brandId, index) => (
              <Button
                key={index}
                variant="contained"
                size="small"
                sx={{ margin: '0.5rem' }}
                onClick={() => {
                  const copy = [...selectedBrands];
                  const index = copy.findIndex((brand) => brand.id === brandId);
                  copy.splice(index, 1);
                  setSelectedBrands(copy);
                  setFilters({ ...filters, brandIds: copy.map((brand) => brand.id) });
                }}
              >
                {selectedBrands.find((brand) => brand.id === brandId)?.name}
                <Close />
              </Button>
            ))}

            {filters.featureValueIds && filters.featureValueIds.length > 0 && filters.featureValueIds.map((featureValueId, index) => (
              <Button
                key={index}
                variant="contained"
                size="small"
                sx={{ margin: '0.5rem' }}
                onClick={() => {
                  const copy = [...selectedFeatureValues];
                  const index = copy.findIndex((value) => value.id === featureValueId);
                  copy.splice(index, 1);
                  setSelectedFeatureValues(copy);
                  setFilters({ ...filters, featureValueIds: copy.map((value) => value.id) });
                }}
              >
                {selectedFeatureValues.find((value) => value.id === featureValueId)?.value}
                <Close />
              </Button>
            ))}

            {filters.minPrice && filters.minPrice > 0 && <Button
              variant="contained"
              size="small"
              sx={{ margin: '0.5rem' }}
              onClick={() => {
                setMinPrice('');
                setFilters({ ...filters, minPrice: initialFilters.minPrice });
              }}
            >
              Min: ₺ {filters.minPrice}
              <Close />
            </Button>
            }

            {filters.maxPrice && filters.maxPrice > 0 && <Button
              variant="contained"
              size="small"
              sx={{ margin: '0.5rem' }}
              onClick={() => {
                setMaxPrice('');
                setFilters({ ...filters, maxPrice: initialFilters.maxPrice });
              }}
            >
              Max: ₺ {filters.maxPrice}
              <Close />
            </Button>
            }
          </Grid>
        }
      </>
    )
  }

  const renderFilterSection = () => {
    return (
      <>
        <Button
          variant="contained" size="large"
          onClick={handleApplyFilters} fullWidth
          color='primary'
          sx={{ mb: 2 }}
        >
          FİLTRELE
        </Button>
        {category && category.subCategories && category.subCategories?.length > 0 && renderSubCategoriesAccordion(category.subCategories)}
        {category && category.brands && category.brands.length > 0 && renderBrandAccordion()}
        {renderPriceAccordion()}
        {category && category.features && category.features.map((feature, index) => (
          <div key={index}>
            {renderFeatureAccordion(feature)}
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      {isLoading ? <LoadingComponent /> :
        <Box sx={styles.mainBoxPadding}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={9}>
              <h2>{category?.name}</h2>
            </Grid>
            <Grid item xs={12} sm={12} md={3} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
              <Grid container spacing={3}>
                {isMediumScreen &&
                  <Grid item xs={12} sm={6} >
                    <IconButton onClick={() => setExpandedFilter(!expandedFilter)} sx={{ "&:hover": { backgroundColor: "transparent" } }}>
                      <FilterListIcon /> Filtrele
                    </IconButton>
                    {expandedFilter && renderFilterSection()}
                  </Grid>
                }
                <Grid item xs={12} sm={6} md={12}>
                  <FormControl fullWidth size="medium">
                    <InputLabel >Sırala</InputLabel>
                    <Select
                      label="sortBy"
                      value={selectedSortType}
                      onChange={handleSortType}
                    >
                      <MenuItem value={SortType.DEFAULT}>Varsayılan</MenuItem>
                      <MenuItem value={SortType.DESC_PRICE}>Fiyata Göre Artan</MenuItem>
                      <MenuItem value={SortType.INC_PRICE}>Fiyata Göre Azalan</MenuItem>
                      <MenuItem value={SortType.NEW_TO_OLD}>Yeniden Eskiye</MenuItem>
                      <MenuItem value={SortType.OLD_TO_NEW}>Eskiden Yeniye</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

              </Grid>
            </Grid>

            {renderSelectedFilters()}

            {!isMediumScreen && <Grid item xs={12} md={3}>
              {renderFilterSection()}
            </Grid>
            }


            {products && <Grid item xs={12} md={9}>
              {renderProductsList()}
            </Grid>}
          </Grid>
        </Box>
      }
    </>
  );
};

export default CategoryPage;