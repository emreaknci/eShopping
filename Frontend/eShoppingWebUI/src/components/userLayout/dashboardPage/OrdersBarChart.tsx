import React from 'react'
import { OrderStatus, OrderStatusColor } from '../../../mock/order';
import { BarChart } from '@mui/x-charts';


type ChartItem = {
    pending: number;
    preparing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    dataKey: string;
}

let dataset: ChartItem[];

function generateDataset(dataKey: string) {
    if (dataKey === "year") {
        const last10years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
        dataset = last10years.map(year => ({
            pending: 2423,
            preparing: 2210,
            shipped: 764,
            delivered: 1879,
            cancelled: 1234,
            dataKey: year.toString()
        }));
    } else if (dataKey === "month") {
        const monthOfYear = Array.from({ length: 12 }, (_, i) => new Date(2021, i).toLocaleString('default', { month: 'long' }));
        dataset = monthOfYear.map(month => ({
            pending: 2423,
            preparing: 2210,
            shipped: 764,
            delivered: 1879,
            cancelled: 1234,
            dataKey: month
        }));
    } else if (dataKey === "day") {
        const daysOfWeek = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
        dataset = daysOfWeek.map(day => ({
            pending: 2423,
            preparing: 2210,
            shipped: 764,
            delivered: 1879,
            cancelled: 1234,
            dataKey: day
        }));
    }

    return dataset;
}
const OrdersBarChart = () => {
    const valueFormatter = (value: number) => `${value} adet`;
    const colors = [
        OrderStatusColor[OrderStatus.Pending],
        OrderStatusColor[OrderStatus.Preparing],
        OrderStatusColor[OrderStatus.Shipped],
        OrderStatusColor[OrderStatus.Delivered],
        OrderStatusColor[OrderStatus.Cancelled],
    ];
    return (
        <BarChart
            dataset={generateDataset("month") as any}
            xAxis={[{
                scaleType: 'band',
                labelStyle: { fontSize: "1rem", fontWeight: 'bold' },
                tickLabelStyle: { fontSize: "0.8rem" },
                data: generateDataset("month").map(d => d.dataKey),
            }]}
            margin={{ top: 100}}
            series={[
                { dataKey: 'pending', label: 'Bekliyor', valueFormatter },
                { dataKey: 'preparing', label: 'Hazırlanıyor', valueFormatter },
                { dataKey: 'shipped', label: 'Gönderildi', valueFormatter },
                { dataKey: 'delivered', label: 'Teslim Edildi', valueFormatter },
                { dataKey: 'cancelled', label: 'İptal Edildi', valueFormatter },
            ]}
            colors={colors}
            height={400}
        />
    );
}

export default OrdersBarChart