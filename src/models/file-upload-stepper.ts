import { AudioFile } from '../stubbs/files';

export interface FileUploadStepperState {
  activeStep: number;
  files: Partial<AudioFile>[];
}
