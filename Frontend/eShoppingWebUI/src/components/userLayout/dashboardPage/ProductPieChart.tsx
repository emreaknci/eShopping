import { Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import { CategoryDto } from '../../../dtos/categories/categoryDto';
import CategoryService from '../../../services/category.service';


const sxValues = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    p: 2,
};

const colors = ['#00FFFF', '#FFA500', '#800080', '#008000', '#800000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];


const ProductPieChart = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [pieChartData, setPieChartData] = useState<{ label: string, value: number, color: string }[]>([]);

    useEffect(() => {

        CategoryService.getCategoryNames().then(response => {
            const dtos = response.data.data as CategoryDto[];
            const pieChartData = dtos.map((dto, index) => {
                return {
                    label: dto.name,
                    value: dto.productCount,
                    color: colors[index % dtos.length]
                }
            });

            setPieChartData(pieChartData);
        }).catch(error => {
            console.log(error);
        });

    }, []);


    return (
        <Paper sx={{ ...sxValues }}>
            <Typography variant="h6">
                Ürün Porföyü
            </Typography>
            {pieChartData.length > 0 ? <>
                <Typography variant="caption">
                    Toplam Ürün Sayısı: {pieChartData.reduce((acc, curr) => acc + curr.value, 0)}
                </Typography>
                <PieChart
                    series={[
                        {
                            data: pieChartData,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 20, additionalRadius: -20, color: 'gray' },
                            innerRadius: 35, paddingAngle: 5, cornerRadius: 5,
                        },
                    ]}
                    slotProps={{
                        legend: {
                            ...(isMobile && {
                                drawingArea: {
                                    bottom: 0, left: 0,
                                    right: 0, top: 0,
                                    width: 0, height: 0,
                                }
                            }),
                            direction: 'column',
                            itemMarkHeight: 10,
                            itemMarkWidth: 10
                        }

                    }}
                    height={isMobile ? 200 : undefined}
                />
            </>
                : <Typography variant="body1">Ürün bulunmamaktadır.</Typography>
            }
        </Paper>
    )
}

export default ProductPieChart

const data = [
    { label: 'Telefonlar', value: 400, color: '#FF0000' },
    { label: 'Tabletler', value: 300, color: '#00FF00' },
    { label: 'Bilgisayarlar', value: 300, color: '#0000FF' },
    { label: 'Kameralar', value: 200, color: '#FFFF00' },
    { label: 'Kulaklıklar', value: 100, color: '#FF00FF' },

];
