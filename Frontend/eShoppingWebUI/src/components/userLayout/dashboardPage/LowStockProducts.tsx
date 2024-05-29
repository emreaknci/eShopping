import { Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { DataGridTableComponent } from '../../common/DataGridTableComponent';
import { DataGridTableComponentProps } from '../../common/DataGridTableComponent/DataGridTableComponent';
import { ProductListDto } from '../../../dtos/products/productListDto';
import ProductService from '../../../services/product.service';

const sxValues = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    p: 2,
};

const LowStockProducts = () => {

    const [products, setProducts] = useState<ProductListDto[]>([]);

    useEffect(() => {
        ProductService.getLowStockProducts(100).then(response => {
            const data = response.data.data as ProductListDto[];
            setProducts(data)
        }).catch(error => {
            console.log(error)
        })

    }, [])



    const props: DataGridTableComponentProps = {
        columns: [
            { field: 'id', headerName: 'ID', width: 90 },
            { field: 'name', headerName: 'Ürün Adı', width: 150 },
            { field: 'unitsInStock', headerName: 'Stok Miktarı', width: 150 },
            { field: 'brand', headerName: 'Marka', width: 150 },
            { field: 'price', headerName: 'Fiyat', width: 150 },
        ],
        rows: [
            ...products.map(product => {
                return {
                    id: "# "+product.id,
                    name: product.name,
                    unitsInStock: product.unitsInStock + ' adet',
                    price: product.price,
                    brand: product.brandName
                }
            })
        ]
    }
    return (
        <Paper sx={sxValues}>
            <Typography variant="h6">
                Stoğu Azalan Ürünler
            </Typography>
            {products.length > 0
                ? <DataGridTableComponent columns={props.columns} rows={props.rows} />
                : <Typography variant="body1">Stoğu azalan ürün bulunmamaktadır.</Typography>}
        </Paper>
    )
}

export default LowStockProducts