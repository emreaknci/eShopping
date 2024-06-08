import React from 'react'
import { Typography } from '@mui/material';

const WarrantyInformations = () => {
    return (
        <>
            <Typography variant="h6" fontWeight={"bold"} mb={1} color="primary">
                Garanti Bilgileri
            </Typography>
            <Typography variant="body1">
                xx.com'da satışa sunulan tüm ürünler en az 2 yıl olmak üzere üretici ya da distribütör garantisi altındadır. Bu süre bazı markalar tarafından sunulan ek garantilerle uzatılabilir.
            </Typography>
        </>
    )
}

export default WarrantyInformations