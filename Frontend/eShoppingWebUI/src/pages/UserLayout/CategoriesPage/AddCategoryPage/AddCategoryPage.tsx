import React, { useEffect, useState } from 'react';
import './AddCategoryPage.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CategoryListDto } from '../../../../dtos/categories/categoryListDto';
import CategoryService from '../../../../services/category.service';
import { FeatureDto } from '../../../../dtos/features/featureDto';
import { CustomTextFieldComponent } from '../../../../components/common/CustomTextFieldComponent';
import { Button, Grid, InputLabel, MenuItem, Paper, Select, Tooltip, Typography } from '@mui/material';
import FeatureService from '../../../../services/feature.service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CategoryCreateDto } from '../../../../dtos/categories/categoryCreateDto';


const validationSchema = Yup.object({
  name: Yup.string().required('Bu alan zorunludur'),
});

const sxValues = {
  p: 2,
  m: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};

const AddCategoryPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState<CategoryListDto[]>([]);
  const [features, setFeatures] = useState<FeatureDto[]>([]);
  const [filteredFeatures, setFilteredFeatures] = useState<FeatureDto[]>([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState<CategoryListDto | null>(null);

  const getCategory = async () => {
    await CategoryService.getCategories()
      .then((response) => {
        const data = response.data.data!;
        setCategories(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getFeatures = async () => {
    await FeatureService.getAll()
      .then((response) => {
        const data = response.data.data!;
        setFeatures(data);
        setFilteredFeatures(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    if (selectedParentCategory) {
      const copy = [...features];
      const selectedCategoryFeatures = categories.find(x => x.id === selectedParentCategory.id)?.features;

      const filterFeatures = copy.filter(f => !selectedCategoryFeatures?.some(sf => sf.id === f.id));
      setFilteredFeatures(filterFeatures);
    }
  }, [selectedParentCategory]);

  useEffect(() => {
    getCategory();
    getFeatures();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      featureIds: [] as number[],
      parentCategoryId: selectedParentCategory?.id ?? null,
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitted(true);

      if (categories.map(c => c.name.trimStart().trimEnd().toLowerCase()).includes(values.name.trimStart().trimEnd().toLowerCase())) {
        toast.error(`"${values.name}" adında bir kategori zaten mevcut.`);
        return;
      }
      await addCategory();
      console.log(values)
    },
  });

  const addCategory = async () => {
    const dto: CategoryCreateDto = {
      name: formik.values.name,
      parentCategoryId: formik.values.parentCategoryId ?? undefined,
      featureIds: formik.values.featureIds
    }
    await CategoryService.add(dto)
      .then((response) => {
        toast.success('Kategori başarıyla eklendi');
        formik.resetForm();
      })
      .catch((error) => {
        console.log(error);
      })
  }



  const handleParentCategoryChange = (e: any) => {
    setSelectedParentCategory(categories.find(x => x.id === e.target.value) ?? null);
  }

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={10} lg={6} >
        <Paper sx={{ ...sxValues }}>
          <form onSubmit={formik.handleSubmit} >
            <Grid container spacing={3}>
              <Grid item xs={12} >
                <Grid container spacing={3} >
                  <Grid item xs={12} sm={6}>
                    <Typography variant='h4'>Kategoriler</Typography>
                  </Grid>

                  <Grid item xs={12} sm={6} sx={{ pt: { xs: 2, sm: 0 } }}>
                    <Button fullWidth variant="contained" sx={{ fontWeight: 'bold' }}
                      color="primary" onClick={() => navigate("/user/add-new-feature")}>
                      Özellik Ekle
                    </Button>
                  </Grid>

                </Grid>
              </Grid>


              <Grid item xs={12} >
                <CustomTextFieldComponent formik={formik} fieldName='name' label="Kategori Adı" />
              </Grid>
              <Grid item xs={12} >
                <InputLabel id="parentCategory">Üst Kategori</InputLabel>
                <Select
                  fullWidth
                  label="Üst Kategori"
                  variant='standard'
                  value={selectedParentCategory?.id ?? ''}
                  onChange={handleParentCategoryChange}
                  displayEmpty
                >

                  {categories.filter(c => c.parentCategoryId == null).map((feature) => (
                    <MenuItem key={feature.id} value={feature.id}>
                      {feature.name}
                    </MenuItem>
                  ))}
                </Select>

              </Grid>
              <Grid item xs={12} >
                <InputLabel id="features">Özellikler {formik.values.featureIds.length > 0 && `(${formik.values.featureIds.length} tane seçildi)`} </InputLabel>
                <Select
                  fullWidth
                  multiple
                  variant='standard'
                  placeholder='Özellikler'
                  value={formik.values.featureIds}
                  onChange={(e) => {
                    formik.setFieldValue('featureIds', e.target.value);
                  }}
                  displayEmpty
                >
                  {filteredFeatures.map((feature) => (
                    <MenuItem key={feature.id} value={feature.id}>
                      {feature.name}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant='caption' color='error'>{formik.errors.featureIds}</Typography>
              </Grid>
              <Grid item xs={12} sx={{ pt: { xs: 2, sm: 0 } }}>
                <Button fullWidth variant="contained" sx={{ fontWeight: 'bold' }}
                  color="primary" type="submit" >
                  Kategori Ekle
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AddCategoryPage;
