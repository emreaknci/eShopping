import { TableRow, TableCell, Collapse, Grid, Typography, CardMedia, TextField, Button, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { LoadingComponent } from '../../common/LoadingComponent';
import { ProductDetailDto } from '../../../dtos/products/productDetailDto';
import ProductService from '../../../services/product.service';
import { toast } from 'react-toastify';


const baseImagePath = import.meta.env.VITE_API_GATEWAY + '/' + import.meta.env.VITE_CATALOG_IMAGES + '/';

export interface ProductDetailsProps {
    expandedProductId: number | null;
    setExpandedProductId: any;
    productId: number;

}


const ProductDetails = (props: ProductDetailsProps) => {
    const [currentProductDetail, setCurrentProductDetail] = useState<ProductDetailDto | null>(null);
    const [updateStock, setUpdateStock] = useState<boolean>(false);
    const [newStock, setNewStock] = useState<number>(0);

    useEffect(() => {
        const getProductDetail = async (productId: number) => {
            ProductService.getProductById(productId).then((response) => {
                setCurrentProductDetail(response.data.data);
                props.setExpandedProductId(productId);
            }).catch((error) => {
                toast.info(error.response.data.message || "Ürün detayları getirilirken bir hata oluştu.")
                setCurrentProductDetail(null);
                props.setExpandedProductId(null);
            }).finally(() => {
            });
        }
        if (props.expandedProductId)
            getProductDetail(props.expandedProductId);
    }, [props])


    const handleStockUpdate = async () => {
        if (!updateStock)
            setUpdateStock(true);
        else {
            const newStockValue = currentProductDetail!.unitsInStock + newStock;
            if (newStockValue < 0) {
                toast.error("Stok miktarı negatif olamaz.");
                return;
            }

            stockUpdateFunc(currentProductDetail!.id, newStockValue);
        }
    }

    const stockUpdateFunc = (id: number, newStock: number) => {
        ProductService.updateStock(id, newStock).then((response) => {
            toast.success("Stok güncellendi.");
            setCurrentProductDetail({ ...currentProductDetail!, unitsInStock: newStock });
        }).catch((error) => {
            toast.error(error.response.data.message || "Stok güncellenirken bir hata oluştu.");
        }).finally(() => {
            setUpdateStock(false);
            setNewStock(0);
        });
    }

    if (currentProductDetail === null)
        return null;

    return (
        <TableRow >
            <TableCell colSpan={4}>
                <Collapse in={props.expandedProductId === currentProductDetail.id} timeout="auto" unmountOnExit>
                    <Grid container spacing={3}>
                        <Grid item md={4} >
                            <Typography variant="h5" fontWeight={"bold"}>
                                Ürün Bilgileri
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    {currentProductDetail.description &&
                                        <Typography variant="h6" >
                                            <br />
                                            <strong>Açıklama:</strong> {currentProductDetail.description}
                                        </Typography>
                                    }
                                    <Typography variant="h6" >
                                        <strong>Stok Miktarı:</strong> {currentProductDetail.unitsInStock} adet
                                        <Button variant="contained" color="success" style={{ marginLeft: "1rem", marginRight: "1rem" }} onClick={() => handleStockUpdate()}>Stok Düzenle</Button>
                                        {updateStock && <Button variant="contained" color="warning" onClick={() => setUpdateStock(false)}>Vazgeç</Button>}
                                    </Typography>
                                    {updateStock &&
                                        <Typography variant="h6" >

                                            <TextField
                                                type="number"
                                                label="Stok Ekle/Çıkar"
                                                fullWidth
                                                value={newStock}
                                                onChange={(e) => setNewStock(parseInt(e.target.value))}
                                                style={{ marginTop: "1rem" }}
                                            />

                                        </Typography>
                                    }
                                </Grid>
                                {currentProductDetail.features && currentProductDetail.features.length > 1 && < Grid item xs={12}>
                                    <Typography variant="h5" >
                                        <strong >Ürün Özellikleri</strong>
                                    </Typography>
                                    <br />
                                    {currentProductDetail.features.map((feature, index) => (
                                        <Typography variant="h6" key={index}>
                                            <strong>{feature.name}:</strong> {feature.value}
                                        </Typography>
                                    ))}
                                </Grid>}

                            </Grid>

                        </Grid>
                        <Grid item md={8}>
                            <Typography variant="h5" fontWeight={"bold"}  >
                                Ürün Resimleri
                            </Typography>
                            <br /> <br />
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
        </TableRow >
    )
}

export default ProductDetails