import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../types';
import { AllFilesState } from '../../models/all-files';
import { getAllFiles } from '../../api';
import { AllFile } from '../../stubbs/files';
import { setLoaderVisibility } from './loader-slice';

const initialState: AllFilesState = {
  allFiles: [],
  searchValue: '',
  cachedAllFiles: [],
};

const AllFilesSlice = createSlice({
  initialState,
  name: 'all-files',
  reducers: {
    setAllFiles: (state: AllFilesState, action) => {
      state.allFiles = action.payload;
    },

    setCachedAllFiles: (state: AllFilesState, action) => {
      state.cachedAllFiles = action.payload;
    },

    updateFile: (
      state: AllFilesState,
      action: PayloadAction<{
        title?: string;
        album?: string;
        artist?: string;
        index: number;
      }>,
    ) => {
      const {
        payload: { album, artist, title, index },
      } = action;
      state.allFiles[index] = {
        ...state.allFiles[index],
        album,
        artist,
        title,
      };
      state.cachedAllFiles = state.allFiles;
    },

    deleteFile: (state: AllFilesState, action: PayloadAction<number>) => {
      const { payload } = action;
      const files = state.allFiles.filter((e, index) => index !== payload);
      state.allFiles = files;
      state.cachedAllFiles = files;
    },

    updateSearchValue: (
      state: AllFilesState,
      action: PayloadAction<string>,
    ) => {
      state.searchValue = action.payload;
    },
  },
});

// // Thunks
const fetchAllFilesAsync = createAsyncThunk(
  'home/allFiles',
  async (): Promise<AllFile[]> => {
    return getAllFiles();
  },
);

export const searchByInput =
  (searchValue: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(updateSearchValue(searchValue));
    const { cachedAllFiles } = allFilesStateSelector(getState());
    if (searchValue) {
      const resultFiles = cachedAllFiles.filter(({ title, album, artist }) => {
        return (
          (title && title.toLowerCase().includes(searchValue.toLowerCase())) ||
          (album && album.toLowerCase().includes(searchValue.toLowerCase())) ||
          (artist && artist.toLowerCase().includes(searchValue.toLowerCase()))
        );
      });

      dispatch(setAllFiles(resultFiles));
    } else {
      dispatch(setAllFiles(cachedAllFiles));
    }
  };

export const fetchAllFiles = () => async (dispatch: AppDispatch) => {
  dispatch(setLoaderVisibility(true));
  const { payload } = await dispatch(fetchAllFilesAsync());
  dispatch(setAllFiles(payload));
  dispatch(setCachedAllFiles(payload));
  dispatch(setLoaderVisibility(false));
};

export const {
  setAllFiles,
  setCachedAllFiles,
  updateSearchValue,
  updateFile,
  deleteFile,
} = AllFilesSlice.actions;
export const allFilesStateSelector = (state: RootState) => state.allFiles;
export default AllFilesSlice.reducer;
