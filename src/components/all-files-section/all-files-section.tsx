import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux-utilities/types';
import { fetchAllFiles } from '../../redux-utilities/slices/all-files-slice';
import { loaderStateSelector } from '../../redux-utilities/slices/loader-slice';
import { Grid } from '@mui/material';
import AllFilesTableComponent from '../all-files-table/all-files-table';
import AllFilesHeaderComponent from '../all-files-header/all-files-header';
import AllFilesModalsComponent from '../all-files-modals/all-files-modals';

export default function AllSectionComponent() {
  const { isLoaderVisible } = useSelector(loaderStateSelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllFiles());
  }, []);

  return (
    <>
      {isLoaderVisible ? null : (
        <Grid container padding={4} rowGap={2}>
          <AllFilesHeaderComponent />
          <Grid container item>
            <AllFilesTableComponent />
          </Grid>
          <AllFilesModalsComponent />
        </Grid>
      )}
    </>
  );
}
