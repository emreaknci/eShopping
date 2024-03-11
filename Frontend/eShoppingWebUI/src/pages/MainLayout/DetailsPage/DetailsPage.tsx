import './DetailsPage.css';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { id } = useParams();

  return (
    <div>
      <p>DetailsPage {id}</p>
    </div>
  );
};

export default DetailsPage;
