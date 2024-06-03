import { AllFile } from '../stubbs/files';

export interface AllFilesState {
  allFiles: AllFile[];
  searchValue: string;
  // used only to reset
  cachedAllFiles: AllFile[];
}
