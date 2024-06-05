import { AudioFile } from '../stubs/files';

export interface FileUploadStepperState {
  activeStep: number;
  files: Partial<AudioFile>[];
}
