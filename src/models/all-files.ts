import { AllFile } from '../stubs/files';

export interface AllFilesState {
  allFiles: AllFile[];
  searchValue: string;
  // used only to reset
  cachedAllFiles: AllFile[];
}
