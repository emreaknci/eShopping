import { useMediaQuery, useTheme } from '@mui/material';
import { PieChart } from '@mui/x-charts';



const ProductPieChart = ({ data }: { data: any }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <PieChart
            series={[
                {
                    data,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 20, additionalRadius: -20, color: 'gray' },
                    innerRadius: 35,
                    paddingAngle: 5,
                    cornerRadius: 5,
                },

            ]}
            slotProps={{
                legend: {
                    ...(isMobile && {
                        drawingArea: {
                            bottom: 0,
                            left: 0,
                            right: 0,
                            top: 0,
                            width: 0,
                            height: 0,
                        }
                    }),

                    direction: 'column',
                    itemMarkHeight: 10,
                    itemMarkWidth: 10
                }

            }}
            height={isMobile ? 200 : undefined}
        />
    )
}

export default ProductPieChart