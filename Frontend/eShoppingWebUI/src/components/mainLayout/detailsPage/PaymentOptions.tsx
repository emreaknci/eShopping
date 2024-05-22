import React from 'react'
import { Typography } from '@mui/material';

const PaymentOptions = ({ productPrice }: { productPrice: number }) => {
    const generatePaymentPlan = (price: number) => {
        const calculateInstallment = (price: number, installment: number) => {
            const installmentRows = [];

            for (let i = 1; i <= installment; i++) {
                const monthlyInstallment = price / i;

                installmentRows.push(
                    <tr key={i}>
                        <td>{i === 1 ? "Peşin" : `${i} Taksit`}</td>
                        <td>{monthlyInstallment.toFixed(2)}</td>
                        <td>{(monthlyInstallment * i).toFixed(2)}</td>
                    </tr>
                );
            }

            return installmentRows;
        };

        return (
            <table>
                <thead>
                    <tr>
                        <th>Taksit Sayısı</th>
                        <th>Taksit Tutarı</th>
                        <th>Toplam Fiyat</th>
                    </tr>
                </thead>
                <tbody>
                    {calculateInstallment(price, 6)}
                </tbody>
            </table>
        );
    };
    return (
        <>
            <Typography variant="h6" fontWeight={"bold"} mb={1} color="primary">
                Ödeme Seçenekleri
            </Typography>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png" alt="iyzico" style={{ width: "4rem", height: "auto" }} />
            {generatePaymentPlan(productPrice)}
        </>)
}

export default PaymentOptions