import { CircularProgress } from '@mui/material';
import './loader.scss';
import { useSelector } from 'react-redux';
import { loaderStateSelector } from '../../redux-utilities/slices/loader-slice';
export default function LoaderComponent() {
  const { isLoaderVisible } = useSelector(loaderStateSelector);
  return (
    (isLoaderVisible && (
      <div className="loader-container">
        <CircularProgress className="loader" />
      </div>
    )) ||
    null
  );
}
