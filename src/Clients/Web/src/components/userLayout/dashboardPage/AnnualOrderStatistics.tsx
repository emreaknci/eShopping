import React, { useEffect } from 'react'
import { BarChart } from '@mui/x-charts';
import { Paper, Typography } from '@mui/material';
import { OrderStatus, OrderStatusColor, OrderStatusStrings } from '../../../enums/orderStatus';
import OrderService from '../../../services/order.service';
import LatestOrdersDto, { OrderDto } from '../../../dtos/orders/latestOrdersDto';


const sxValues = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    p: 2,
};

type ChartItem = {
    Submitted: number;
    AwaitingValidation: number;
    StockConfirmed: number;
    Paid: number;
    Cancelled: number;
    dataKey: string;
    [key: number]: number;
}

function mapOrdersToChartItems(orderList:OrderDto[]) {
    const chartItems = {
        Submitted: 0,
        AwaitingValidation: 0,
        StockConfirmed: 0,
        Paid: 0,
        Cancelled: 0,
        dataKey: 'order.orderStatus'
    };

    orderList.forEach(order => {
        switch (order.orderStatus) {
            case 0:
                chartItems.Submitted++;
                break;
            case 1:
                chartItems.AwaitingValidation++;
                break;
            case 2:
                chartItems.StockConfirmed++;
                break;
            case 3:
                chartItems.Paid++;
                break;
            case 4:
                chartItems.Cancelled++;
                break;
            default:
                break;
        }
    });

    return [chartItems];
}

function generateDataset(orderList: OrderDto[], dataKey: string) {
    let dataset: ChartItem[] = [];

    if (dataKey === "year") {
        const years = Array.from(new Set(orderList.map(order => new Date(order.orderDate).getFullYear())));
        dataset = years.map(year => {
            const yearOrders = orderList.filter(order => new Date(order.orderDate).getFullYear() === year);
            return mapOrdersToChartItems(yearOrders)[0];
        });
    } else if (dataKey === "month") {
        const months = Array.from({ length: 12 }, (_, i) => new Date(2021, i).toLocaleString('default', { month: 'long' }));
        dataset = months.map(month => {
            const monthOrders = orderList.filter(order => new Date(order.orderDate).toLocaleString('default', { month: 'long' }) === month);
            console.log(monthOrders)
            return mapOrdersToChartItems(monthOrders)[0];
        });
    } else if (dataKey === "day") {
        const daysOfWeek = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
        dataset = daysOfWeek.map(day => {
            const dayOrders = orderList.filter(order => {
                const orderDayOfWeek = new Date(order.orderDate).toLocaleDateString('default', { weekday: 'long' });
                return orderDayOfWeek === day;
            });
            return mapOrdersToChartItems(dayOrders)[0];
        });
    }

    return dataset;
}

const AnnualOrderStatistics = () => {
    const [orders, setOrders] = React.useState<OrderDto[]>([]);

    useEffect(() => {
        OrderService.getLatestOrdersDto(11).then((response) => {
            const data = response.data as LatestOrdersDto;
            const orders = data.orders;
            setOrders(orders);
           
        });
    }, [])

    const valueFormatter = (value: number) => `${value} adet`;
    const colors = [
        OrderStatusColor[OrderStatus.Submitted],
        OrderStatusColor[OrderStatus.AwaitingValidation],
        OrderStatusColor[OrderStatus.StockConfirmed],
        OrderStatusColor[OrderStatus.Paid],
        OrderStatusColor[OrderStatus.Cancelled],
    ];

    return (
        <Paper sx={{ ...sxValues }}>
            <Typography variant="h6">
                Siparişler
            </Typography>
            <BarChart
                dataset={generateDataset(orders,"month") as any}
                xAxis={[{
                    scaleType: 'band',
                    labelStyle: { fontSize: "1rem", fontWeight: 'bold' },
                    tickLabelStyle: { fontSize: "0.8rem" },
                    data: generateDataset(orders,"month").map(d => d.dataKey),
                }]}
                margin={{ top: 100 }}
                series={[
                    { dataKey: 'Submitted', label: OrderStatusStrings[OrderStatus.Submitted], valueFormatter },
                    { dataKey: 'AwaitingValidation', label: OrderStatusStrings[OrderStatus.AwaitingValidation], valueFormatter },
                    { dataKey: 'StockConfirmed', label: OrderStatusStrings[OrderStatus.StockConfirmed], valueFormatter },
                    { dataKey: 'Paid', label: OrderStatusStrings[OrderStatus.Paid], valueFormatter },
                    { dataKey: 'Cancelled', label: OrderStatusStrings[OrderStatus.Cancelled], valueFormatter },
                ]}
                colors={colors}
                height={400}
            />
        </Paper>
    );
}

export default AnnualOrderStatistics