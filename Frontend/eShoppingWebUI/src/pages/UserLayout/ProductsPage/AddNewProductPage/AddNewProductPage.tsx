import React, { useEffect, useState } from 'react';
import './AddNewProductPage.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Grid, MenuItem, Paper, Select, Typography } from '@mui/material';
import { CustomTextFieldComponent } from '../../../../components/common/CustomTextFieldComponent';
import { createFakeCategories } from '../../../../mock/category';
import { CustomTextAreaComponent } from '../../../../components/common/CustomTextAreaComponent';
import { ImagePickerComponent } from '../../../../components/common/ImagePickerComponent';


const validationSchema = Yup.object({
  name: Yup.string().required('Ürün adı zorunludur'),
  price: Yup.number().required('Ürün fiyatı zorunludur').notOneOf([0], 'Ürün fiyatı 0 olamaz'),
  unitOfStock: Yup.number().required('Stok adedi zorunludur').notOneOf([0], 'Stok adedi 0 olamaz'),
  description: Yup.string().required('Ürün açıklaması zorunludur'),
  categoryId: Yup.string().required('Kategori zorunludur'),
  images: Yup.array()
    .of(Yup.mixed().test('fileType', 'Resim zorunludur', value => value instanceof File)).required('Resim zorunludur')
    .required('Resim zorunludur')
    .min(1, 'En az 1 resim yükleyiniz')
});

const sxValues = {
  p: 2,
  m: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};


const AddNewProductPage = () => {
  const [categories, setCategories] = useState(createFakeCategories(5, 5));
  const [selectedCategoryId, setSelectedCategoryId] = useState('Kategori Seçiniz');
  const [selectedImages, setSelectedImages] = useState<File[] | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      price: 0,
      unitOfStock: 0,
      description: '',
      categoryId: '',
      images: selectedImages,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const handleCategoryChange = (e: any) => {
    const categoryId = e.target.value;
    setSelectedCategoryId(categoryId);
    formik.setFieldValue('categoryId', categoryId);
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={10} lg={6} >
        <Paper sx={{ ...sxValues }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} >
                <Grid container >
                  <Grid item xs={12} sm={9}>
                    <Typography variant='h4'>Ürünler</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3} sx={{ pt: { xs: 2, sm: 0 } }}>
                    <Button fullWidth variant="contained" sx={{ fontWeight: 'bold' }}
                      color="primary" type="submit" onClick={() => console.log(formik.errors)} >
                      Ekle
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} >
                <CustomTextFieldComponent formik={formik} fieldName='name' label="Ürün Adı" />
              </Grid>
              <Grid item xs={12} >
                <CustomTextFieldComponent formik={formik} type='number' fieldName='price' label='Ürün Fiyatı' />
              </Grid>
              <Grid item xs={12}>
                <Select
                  value={selectedCategoryId}
                  fullWidth
                  variant='standard'
                  onChange={handleCategoryChange}
                >
                  <MenuItem disabled value="Kategori Seçiniz">Kategori Seçiniz</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant='caption' color='error'>
                  {formik.errors.categoryId}
                </Typography>
              </Grid>
              <Grid item xs={12} >
                <CustomTextFieldComponent formik={formik} type='number' fieldName='unitOfStock' label='Ürün Stoğu' />
              </Grid>
              <Grid item xs={12}>
                <CustomTextAreaComponent
                  fieldName='description'
                  formik={formik}
                  label='Ürün Açıklaması'
                />
                <Typography variant='caption' color='error'>
                  {formik.errors.description}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <ImagePickerComponent
                  fullWidth
                  setCoverImage={setCoverImage}
                  setSelectedImages={setSelectedImages}
                  formik={formik}
                />
                <Typography variant='caption' color='error'>
                  {formik.errors.images}
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddNewProductPage;
