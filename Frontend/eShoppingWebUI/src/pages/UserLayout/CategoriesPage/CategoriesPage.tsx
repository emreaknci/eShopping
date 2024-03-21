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
import { SnackBarContext } from '../../../contexts/SnackBarContext';
import { Category } from './../../../mock/category';
import { DialogComponent } from '../../../components/common/DialogComponent';
import { PaginationComponent } from '../../../components/common/PaginationComponent';

const sxValues = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};
type SubmitType = 'reset' | 'add' | 'cancel' | 'edit';

const validationSchema = Yup.object({
  name: Yup.string().required('Kategori adı zorunludur'),
  subcategories: Yup.array().of(Yup.string().required('Alt kategori adı zorunludur')),
  features: Yup.array().of(Yup.object({
    name: Yup.string().required('Özellik adı zorunludur'),
    values: Yup.array().of(Yup.string().required('Özellik değeri zorunludur')),
  })),
});

const CategoriesPage = () => {
  const snackBarContext = useContext(SnackBarContext);
  const [categories, setCategories] = useState(mock.default);

  const [filteredCategories, setFilteredCategories] = useState(mock.default);
  const [filteredCategoriesCount, setFilteredCategoriesCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const [submitType, setSubmitType] = useState<SubmitType>();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');

  const [openForm, setOpenForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editing, setEditing] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const filterCategories = () => {
      const filteredCategories = categories.filter((category) => {
        const nameMatch = category.name.toLowerCase().includes(searchText.toLowerCase());
        const subCategoryMatch = category.subcategories.some((subCategory) => subCategory.toLowerCase().includes(searchText.toLowerCase()));
        const featureMatch = category.features.some((feature) => feature.name.toLowerCase().includes(searchText.toLowerCase()));
        return nameMatch || subCategoryMatch || featureMatch;
      });

      setFilteredCategoriesCount(filteredCategories.length);

      setFilteredCategories(filteredCategories
        .slice((currentPage - 1) * itemsPerPage, (currentPage) * itemsPerPage));
    }

    filterCategories();
  }, [categories, searchText, currentPage, itemsPerPage]);



  const formik = useFormik({
    initialValues: {
      name: '',
      subcategories: [''],
      features: [{ name: '', values: [''] }],
    },
    validationSchema,
    onSubmit: (values) => {
      setSubmitted(true);
      if (submitType === 'add') {
        addCategory(values);
      }
      else if (submitType === 'edit') {
        if (currentIndex !== undefined) {
          editCategory(values);
        }
      }


      setOpenForm(false);
      setEditing(false);
      formik.resetForm();
    },
  });



  const addCategory = (values: any) => {
    const newCategory: Category = {
      id: (categories.length + 1).toString(),
      name: values.name,
      subcategories: values.subcategories,
      features: values.features,
      products: []
    };

    const currentCategories = [...categories];
    currentCategories.push(newCategory);
    setCategories(currentCategories);

    snackBarContext.openSnackBar('Yeni kategori bilgileri eklendi!', 'success');
  }

  const editCategory = (values: any) => {
    const newCategories = [...categories];

    newCategories[currentIndex] = {
      id: newCategories[currentIndex].id,
      name: values.name,
      subcategories: values.subcategories,
      features: values.features,
      products: []
    };

    setCategories(newCategories);

    snackBarContext.openSnackBar('Kategori bilgileri güncellendi.', 'success');
  }



  const handleOpenForm = () => {
    setOpenForm(prev => !prev);
    formik.resetForm();
    formik.values.features = [{ name: '', values: [''] }];
    formik.values.subcategories = [''];
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (submitType === 'reset') {
      handleReset();
    } else if (submitType === 'add' || submitType === 'edit') {
      formik.handleSubmit();
    } else if (submitType === 'cancel') {
      handleCancel();
    }
  };

  const handleCancel = () => {
    setOpenForm(false);
    formik.resetForm();
    formik.values.features = [{ name: '', values: [''] }];
    formik.values.subcategories = [''];
  }

  const handleReset = () => {
    formik.resetForm();
    formik.values.features = [{ name: '', values: [''] }];
    formik.values.subcategories = [''];
  }

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  }

  const handleExpandClick = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleEditCategory = (category: Category, index: any) => {
    setOpenForm(true);
    setEditing(true);
    formik.setValues({
      name: category.name,
      subcategories: category.subcategories,
      features: category.features,
    });
    setCurrentIndex(index);
  }

  const handleDeleteCategory = (index: any) => {
    const currentItem = categories[index];
    setOpenAlert(true);
    setAlertText(`'${currentItem.name}' kategorisi silinecek. Onaylıyor musunuz?`);
    setCurrentIndex(index);
  }

  const handleAlertConfirm = (index: any) => {
    setOpenAlert(false);
    const currentItem = categories[index];

    const newCategories = categories.filter((_, i) => i !== index);
    setCategories(newCategories);
    snackBarContext.openSnackBar(`'${currentItem.name}' kategorisi silindi.`, 'success');
    setExpandedIndex(null);
  }




  const renderSubCategoryTextField = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <h3>Alt Kategoriler</h3>
        </Grid>
        <Grid item xs={12}>
          <Button sx={{ mb: 2, color: 'white', fontWeight: 'bold' }}
            variant="contained" fullWidth color="success"
            onClick={() => formik.setFieldValue('subcategories', [...formik.values.subcategories, ''])}>
            Alt Kategori Ekle
          </Button>
          {formik.values.subcategories.map((subCategory, index) => (
            <TextField
              key={index}
              label={`Alt Kategori ${index + 1}`}
              variant="outlined"
              name='subcategories'
              value={formik.values.subcategories[index]}
              onChange={(e) => {
                formik.setFieldValue(`subcategories[${index}]`, e.target.value);
              }}
              size="small"
              sx={{ mb: 2 }}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {formik.touched.subcategories && formik.errors.subcategories && formik.errors.subcategories[index] && (
                      <FormHelperText sx={{ fontSize: "1rem" }} error>
                        {formik.errors.subcategories[index] || ""}
                      </FormHelperText>
                    )}
                    {index !== 0 && ( // Check if index is not the first one
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          formik.setFieldValue('subcategories', formik.values.subcategories.filter((_, i) => i !== index));
                        }}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          ))}

        </Grid>
      </Grid>
    )
  }

  const renderFeatureValueTextField = (feature: any, featureIndex: any) => {
    return (
      <>
        {feature.values.map((value: any, valueIndex: any) => (
          <div key={valueIndex}>
            <TextField
              label={`Değer ${valueIndex + 1}`}
              variant="outlined"
              value={value}
              name={`features[${featureIndex}].values[${valueIndex}]`}
              onChange={(e) => {
                const newFeatures = [...formik.values.features];
                newFeatures[featureIndex].values[valueIndex] = e.target.value;
                formik.setFieldValue('features', newFeatures);
              }}
              size="small"
              sx={{ mb: 2 }}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {formik.touched.features && formik.errors.features && formik.errors.features[featureIndex] && (
                      <FormHelperText sx={{ fontSize: "1rem" }} error>
                        {formik.errors.features[featureIndex].values[valueIndex] || ""}
                      </FormHelperText>
                    )}
                    {valueIndex !== 0 && (
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          const newFeatures = [...formik.values.features];
                          newFeatures[featureIndex].values = newFeatures[featureIndex].values.filter((_, i) => i !== valueIndex);
                          formik.setFieldValue('features', newFeatures);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    )}

                  </InputAdornment>
                ),
              }}
            />

          </div>
        ))}
        <Button
          sx={{ mb: 2, color: 'white', fontWeight: 'bold' }}
          variant="contained"
          fullWidth
          color="success"
          onClick={() => {
            const newFeatures = [...formik.values.features];
            newFeatures[featureIndex].values.push('');
            formik.setFieldValue('features', newFeatures);
          }}
        >
          Değer Ekle
        </Button>
      </>
    )
  }

  const renderFeatureTextField = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <h3>Özellikler</h3>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            color="success"
            sx={{ mb: 2, color: 'white', fontWeight: 'bold' }}
            onClick={() => {
              formik.setFieldValue('features', [...formik.values.features, { name: '', values: [''] }]);
            }}
          >
            Özellik Ekle
          </Button>
          {formik.values.features.map((feature, featureIndex) => (
            <div key={featureIndex}>
              <TextField
                label={`Özellik ${featureIndex + 1}`}
                name={`features[${featureIndex}]`}
                variant="outlined"
                value={feature.name}
                onChange={(e) => {
                  const newFeatures = [...formik.values.features];
                  newFeatures[featureIndex].name = e.target.value;
                  formik.setFieldValue('features', newFeatures);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {formik.touched.features && formik.errors.features && formik.errors.features[featureIndex]?.name && (
                        <FormHelperText sx={{ fontSize: "1rem" }} error>
                          {formik.errors.features[featureIndex].name || ""}
                        </FormHelperText>
                      )}
                      {featureIndex !== 0 && (
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            formik.setFieldValue('features', formik.values.features.filter((_, i) => i !== featureIndex));
                          }}
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
                size="small"
                sx={{ mb: 2 }}
                fullWidth
              />
              {renderFeatureValueTextField(feature, featureIndex)}

            </div>
          ))}

        </Grid>
      </Grid>
    )
  }

  const renderCategories = () => {
    return (
      <>
        {filteredCategories.map((category, index) => (
          <Grid item xs={12} sm={6} key={category.id}>
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

                <CardActions disableSpacing>
                  <Button fullWidth color="primary" onClick={() => handleDeleteCategory(index)}>
                    SİL
                  </Button>
                  <Button fullWidth color="warning" onClick={() => handleEditCategory(category, index)}>
                    DÜZENLE
                  </Button>
                </CardActions>

                <CardContent sx={{ pt: 0 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} >
                          <h3>Alt Kategoriler</h3>
                        </Grid>
                        {category.subcategories.map((subCategory, index) => (
                          <Grid item xs={12} key={subCategory}>
                            {subCategory}
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
                                {feature.values.map((value, index) => (
                                  <div key={index}> {value}</div>
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

  const renderFormCard = () => {
    return (
      <Grid item xs={12} sx={sxValues}>
        <Card >
          <CardHeader
            sx={{ pb: 0 }}
            title="Yeni Kategori Ekle"
          />
          <form onSubmit={handleSubmit}>
            <CardContent sx={{ pt: 0 }}>
              <Grid container >
                <Grid item xs={12} >
                  {renderTextField(formik, 'name', 'Kategori Adı', 'Kategori adı giriniz')}
                </Grid>
                <Grid item xs={12} >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6}>
                      {renderSubCategoryTextField()}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      {renderFeatureTextField()}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>

            </CardContent>
            <CardActions disableSpacing sx={{ m: 1, mt: 0 }}>
              <Grid container spacing={3} >
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" fullWidth
                    color="primary" type="submit"
                    sx={{ color: 'white', fontWeight: 'bold' }}
                    onClick={() => { setSubmitType('cancel'); }}
                  >
                    İptal
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" fullWidth
                    color="warning"
                    type="submit"
                    sx={{ color: 'white', fontWeight: 'bold' }}
                    onClick={() => { setSubmitType('reset'); }}
                  >
                    Sıfırla
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="success"
                    sx={{ color: 'white', fontWeight: 'bold' }}
                    onClick={() => {
                      editing ? setSubmitType('edit') : setSubmitType('add');
                    }}
                  >
                    {editing ? 'Güncelle' : 'Ekle'}
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </form>
        </Card>

      </Grid>
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
                color="primary" onClick={handleOpenForm}>
                {openForm ? 'Kapat' : 'Yeni Kategori Ekle'}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={sxValues}>
          <TextField
            label="Kategori Ara..."
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
        {openForm &&
          renderFormCard()
        }
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
      {openAlert && (
        <DialogComponent
          open={openAlert}
          handleClose={() => setOpenAlert(false)}
          handleConfirm={() => handleAlertConfirm(currentIndex)}
          text={alertText}
        />
      )}
    </>
  );
};

export default CategoriesPage;
