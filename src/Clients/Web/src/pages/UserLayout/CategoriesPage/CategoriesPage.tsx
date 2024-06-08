import React, { useContext, useEffect, useState } from 'react';
import './CategoriesPage.css';
import * as mock from '../../../mock/category';
import './CategoriesPage.css';
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Collapse, Divider, FormHelperText, Grid, IconButton, InputAdornment, TablePagination, TextField, Typography } from '@mui/material';
import { ExpandMore, ExpandCircleDown, Delete, Add } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { renderTextField } from '../../../utils/FormUtils';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Category } from './../../../mock/category';
import { DialogComponent } from '../../../components/common/DialogComponent';
import { PaginationComponent } from '../../../components/common/PaginationComponent';
import { toast } from 'react-toastify';
import CategoryService from '../../../services/category.service';
import { CategoryListDto } from '../../../dtos/categories/categoryListDto';
import { useNavigate } from 'react-router-dom';

const sxValues = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};

const CategoriesPage = () => {
  const navigate=useNavigate();
  const [categories, setCategories] = useState<CategoryListDto[]>();


  const [filteredCategories, setFilteredCategories] = useState<CategoryListDto[]>();
  const [filteredCategoriesCount, setFilteredCategoriesCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');

  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const filterCategories = () => {
      const filteredCategories = categories?.filter((category) => {
        const nameMatch = category.name.toLowerCase().includes(searchText.toLowerCase());
        const subCategoryMatch = category.subCategories?.some((subCategory) => subCategory.name.toLowerCase().includes(searchText.toLowerCase()));
        const featureMatch = category.features.some((feature) => feature.name.toLowerCase().includes(searchText.toLowerCase()));
        return nameMatch || subCategoryMatch || featureMatch;
      });

      filteredCategories && setFilteredCategoriesCount(filteredCategories.length);

      filteredCategories && setFilteredCategories(filteredCategories
        .slice((currentPage - 1) * itemsPerPage, (currentPage) * itemsPerPage));
    }

    filterCategories();
  }, [categories, searchText, currentPage, itemsPerPage]);


  const getCategories = async () => {
    await CategoryService.getCategories().then((response) => {
      const data = response.data.data!;
      setCategories(data);
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  }

  const handleExpandClick = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };


  const renderCategories = () => {
    return (
      <>
        {filteredCategories && filteredCategories.map((category, index) => (
          <Grid item xs={12} md={6} lg={4} key={category.id}>
            <Card>
              <CardHeader
                title={`Kategori: ${category.name}`}
              />
              <CardActions disableSpacing>
                <IconButton aria-label="show more" onClick={() => handleExpandClick(index)}>
                  <ExpandMore />
                </IconButton>
                Alt Kategoriler ve Özellikler
              </CardActions>
              <Collapse in={expandedIndex === index} timeout="auto" unmountOnExit>

                {/* <CardActions disableSpacing>
                  <Button fullWidth color="primary"
                  // onClick={() => handleDeleteCategory(index)}
                  >
                    SİL
                  </Button> 
                  <Button fullWidth color="warning"
                   onClick={() => handleEditCategory(category, index)}
                  >
                    DÜZENLE
                  </Button>
                </CardActions> */}

                <CardContent sx={{ pt: 0 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} >
                          <h3>Alt Kategoriler</h3>
                        </Grid>
                        {category.subCategories && category.subCategories.map((subCategory, index) => (
                          <Grid item xs={12} key={subCategory.id}>
                            {subCategory.name}
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <h3>Özellikler</h3>
                        </Grid>
                        {category.features.map((feature, index) => (
                          <Grid item xs={12} key={index}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <div>{feature.name}</div>
                              <div>
                                {feature.values && feature.values.map((value, index) => (
                                  <div key={index}> {value.value}</div>
                                ))}
                              </div>
                            </div>
                            {index !== category.features.length - 1 && <Divider />}
                          </Grid>
                        ))}
                      </Grid>

                    </Grid>
                  </Grid>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </>
    )
  }


  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={sxValues}>
          <Grid container >
            <Grid item xs={12} sm={9}>
              <Typography variant='h4'>Kategoriler</Typography>
            </Grid>
            <Grid item xs={12} sm={3} sx={{ pt: { xs: 2, sm: 0 } }}>
              <Button fullWidth variant="contained" sx={{ fontWeight: 'bold' }}
                color="primary" onClick={()=>navigate("/user/add-new-category")} >
                Yeni Kategori Ekle
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={sxValues}>
          <TextField
            label="Kategori Ara..." variant="outlined"
            value={searchText} onChange={handleSearch}
            size="medium" fullWidth
            InputProps={{
              endAdornment: (
                <SearchIcon />
              ),
            }}
          />
        </Grid>
      
        {renderCategories()}
      </Grid>
      <PaginationComponent
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => {
          setExpandedIndex(null);
          setCurrentPage(page)
        }}
        pageCount={Math.ceil(filteredCategoriesCount / itemsPerPage)}
      />
      {/* {openAlert && (
        <DialogComponent
          open={openAlert}
          handleClose={() => setOpenAlert(false)}
          handleConfirm={() => handleAlertConfirm(currentIndex)}
          text={alertText}
        />
      )} */}
    </>
  );
};

export default CategoriesPage;