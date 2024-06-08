import './HomePage.css';
import { Box, Button, Grid, Typography, Divider } from '@mui/material';
import { ProductCardComponent } from '../../../components/common/ProductCardComponent';
import { useEffect, useState } from 'react';
import { LoadingComponent } from '../../../components/common/LoadingComponent';
import styles from './../../../styles';
import Categories from '../../../components/mainLayout/Categories';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { CategoryListDto } from '../../../dtos/categories/categoryListDto';
import CategoryService from '../../../services/category.service';
import React from 'react';


const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<CategoryListDto[]>([]);
  const navigate = useNavigate();
  const theme = useTheme();
  useEffect(() => {
    getCategories()
  }, []);

  const getCategories = async () => {
    setIsLoading(true);
    await CategoryService.getCategoriesWithProducts()
      .then((response) => {
        setCategories(response.data.data!);
        console.log(response.data.data!)
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        setIsLoading(false);
      });
  }


  const renderCategoryProducts = (category: CategoryListDto) => {
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: "1rem" }}>
          <Typography variant="h4" mb={4}>
            {category.name}
          </Typography>
          <Button variant="text"
            sx={{
              mb: 4, p: 1.5,
              fontSize: "1rem", cursor: "pointer",
              border: `.1rem solid ${theme.palette.primary.main}`,
              borderRadius: "2rem", fontWeight: "bold",
            }}
            onClick={() => navigate(`/category/${category.id}`)}
          >
            Tümünü Gör
            <ArrowForward sx={{ ml: 1 }} />
          </Button>
        </div>

        <Grid container spacing={3}>
          {category.products?.slice(0, 5).map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={12 / 5} key={product.id}>
              <ProductCardComponent product={product} />
            </Grid>
          ))}
        </Grid>
      </>
    )
  }

  const renderProducts = () => {
    return (
      <Box component="main" sx={styles.mainBoxPadding}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            {categories.map((category, index) => (
              <div key={category.id}>
                {category.products  && (
                  <>
                    {renderCategoryProducts(category)}
                    {index !== categories.length - 1 && (
                      <Divider style={{ marginTop: "3rem" }} color='primary' />
                    )}
                  </>
                )}
              </div>
            ))}
          </Grid>
        </Grid>
      </Box>

    );
  };


  return (
    <>

      {isLoading ? <LoadingComponent /> :
        <>
          <Categories categories={categories} />
          {renderProducts()}
        </>
      }
    </>

  );
};

export default HomePage;
