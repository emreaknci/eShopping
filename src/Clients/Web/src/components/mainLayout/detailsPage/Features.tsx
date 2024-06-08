import { ProductFeatureDto } from '../../../dtos/features/productFeatureDto'
import { Typography } from '@mui/material';

const Features = ({ productFeatures }: { productFeatures: ProductFeatureDto[] }) => {
  return (
    <>
      <Typography variant="h6" fontWeight="bold" mb={1} color="primary">
        Özellikler
      </Typography>
      <table>
        <tbody>
          {productFeatures.map((feature, index) => (
            <tr key={index}>
              <td style={{ fontWeight: 'bold' }}>{feature.name}:</td>
              <td>{feature.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Features