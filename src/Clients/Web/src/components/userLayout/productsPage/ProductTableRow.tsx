import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { TableRow, TableCell, IconButton, Typography, TextField } from '@mui/material';
import React from 'react'
import { ProductListDto } from '../../../dtos/products/productListDto';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import ProductService from '../../../services/product.service';
import { toast } from 'react-toastify';
const ProductTableRow = ({ product, expandedProductId, handleExpand }: { product: ProductListDto, expandedProductId: number | null, handleExpand: any }) => {
    const [editing, setEditing] = React.useState(false);
    const [price, setPrice] = React.useState(product.price);
    const [newPrice, setNewPrice] = React.useState(product.price);

    

    const updatePrice = async (e: any) => {
        toast.dismiss();
        if(newPrice <= 0) {
            toast.error('Fiyat 0 dan küçük olamaz')
            setNewPrice(price)
            return;
        }

        if(newPrice !== product.price) {
            await ProductService.updatePrice(product.id, newPrice).then(res => {
                setPrice(newPrice)
                setEditing(false);
                setNewPrice(newPrice)
                toast.success(`'${product.name}' ürününün fiyatı güncellendi`)
            }).catch(err => {
                console.log(err)
                toast.error('Fiyat güncellenirken bir hata oluştu')
                setNewPrice(price)
            })
        }
    }

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
                <Typography sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {!editing && <>
                        {price} TL
                        <IconButton onClick={() => { setEditing(true) }}>
                            <EditIcon color='warning' />
                        </IconButton>
                    </>}

                    {editing && <>
                        <TextField
                            variant='standard'
                            value={newPrice}
                            fullWidth
                            onChange={(e: any) => setNewPrice(e.target.value)}
                            type='number'
                            InputProps={{
                                endAdornment: <>TL
                                    <IconButton onClick={() => { setEditing(false) }}>
                                        <CancelIcon color='primary' />
                                    </IconButton>
                                    <IconButton onClick={updatePrice}>
                                        <EditIcon color='success' />
                                    </IconButton>
                                </>
                            }}
                        />
                    </>}
                </Typography>
            </TableCell>

        </TableRow>
    )
}

export default ProductTableRow