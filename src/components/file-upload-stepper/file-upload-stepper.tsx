import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {
  Button,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import './file-upload-stepper.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFiles,
  fileUploadStepperStateSelector,
  removeFile,
  setActiveStep,
  updateFileInputFields,
} from '../../redux-utilities/slices/file-upload-stepper-slice';
import { AppDispatch } from '../../redux-utilities/types';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import {
  getDurationInFormat,
  getFileTypeFromFile,
  transformFiles,
} from '../../utilities/utility';
import { isFunction, isObject } from 'lodash';

export default function FileUploadStepperComponent() {
  const { activeStep, files } = useSelector(fileUploadStepperStateSelector);
  const dispatch = useDispatch<AppDispatch>();

  function createAudioDOMElementAndSetFiles(
    uploadedFile: File,
    index: number,
    uploadedFilesValues: File[],
  ) {
    const fileType = getFileTypeFromFile(uploadedFile);
    const transformedFiles = transformFiles(uploadedFilesValues);
    const temporarilyCreatedElement = document.createElement(fileType);
    temporarilyCreatedElement.src = URL.createObjectURL(uploadedFile);
    // wait for file to load metadata to calculate file duration
    temporarilyCreatedElement.addEventListener('loadedmetadata', function () {
      transformedFiles[index].duration = getDurationInFormat(
        temporarilyCreatedElement.duration,
      );

      // Dispatch action after processing all files selected to upload in the file uploader
      if (index === uploadedFilesValues.length - 1) {
        dispatch(addFiles(transformedFiles));
      }
    });
  }

  function handleFileOnChange(uploadedFiles: FileList) {
    const uploadedFilesValues = Object.values(uploadedFiles).filter(
      (uploadedFile) => isObject(uploadedFile) && !isFunction(uploadedFile),
    );
    uploadedFilesValues.forEach((uploadedFile, index) => {
      createAudioDOMElementAndSetFiles(
        uploadedFile,
        index,
        uploadedFilesValues,
      );
    });
  }

  function handleFieldChange(index: number, prop: string, value: string) {
    dispatch(updateFileInputFields({ index, prop, value }));
  }

  function handleRemoveFile(index: number) {
    dispatch(removeFile(index));
    if (files.length === 1) {
      dispatch(setActiveStep(0));
    }
  }

  return (
    <Grid container gap={2}>
      <Grid item xs={12}>
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>Upload</StepLabel>
          </Step>
          <Step>
            <StepLabel>Verify data and save</StepLabel>
          </Step>
        </Stepper>
      </Grid>
      {activeStep === 0 ? (
        <Grid container item justifyContent={'center'} gap={2}>
          <Grid
            container
            item
            xs={12}
            gap={2}
            className="upload-file-container"
            direction={'column'}
            alignItems={'center'}
          >
            <Grid
              item
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <input
                title=" "
                multiple
                className="file-input"
                id="file"
                type="file"
                accept=".mp3,.aac,.wav,.mp4,.mov,.avi"
                onChange={({ target: { files: fileList } }) =>
                  handleFileOnChange(fileList as FileList)
                }
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                Accepted formats - .mp3,.aac,.wav,.mp4,.mov,.avi
              </Typography>
            </Grid>
          </Grid>
          <Grid item>{files.length && files.length} files selected</Grid>
        </Grid>
      ) : null}
      {activeStep === 1 ? (
        <Grid container item gap={3} className="file-details-container">
          {files.map(({ album, artist, duration, fileType, title }, index) => {
            return (
              <Grid item xs={12} key={index}>
                <Paper variant="outlined" className="file-details">
                  <Grid container item gap={2}>
                    <Grid container item justifyContent={'space-between'}>
                      <Grid item xs={6}>
                        <TextField
                          name="title"
                          label="Title"
                          variant="outlined"
                          value={title}
                          fullWidth
                          onChange={({ target: { value, name } }) =>
                            handleFieldChange(index, name, value)
                          }
                          required
                          error={!title}
                        />
                      </Grid>
                      <Grid item>
                        <Chip label={duration} />
                        {fileType === 'audio' ? (
                          <AudioFileIcon
                            color="primary"
                            className="align-middle mx-2"
                          />
                        ) : (
                          <VideoFileIcon
                            color="secondary"
                            className="align-middle mx-2"
                          />
                        )}
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="album"
                        label="Album"
                        variant="outlined"
                        value={album}
                        fullWidth
                        onChange={({ target: { value, name } }) =>
                          handleFieldChange(index, name, value)
                        }
                        required
                        error={!album}
                      />
                    </Grid>
                    <Grid
                      container
                      item
                      justifyContent={'space-between'}
                      alignItems={'flex-end'}
                    >
                      <Grid item xs={6}>
                        <TextField
                          name="artist"
                          label="Artist"
                          variant="outlined"
                          fullWidth
                          value={artist}
                          onChange={({ target: { value, name } }) =>
                            handleFieldChange(index, name, value)
                          }
                          required
                          error={!artist}
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          onClick={() => handleRemoveFile(index)}
                        >
                          Remove
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      ) : null}
      <Grid container item justifyContent={'space-between'}>
        <Grid item>
          {activeStep === 1 ? (
            <Button
              variant="text"
              onClick={() => dispatch(setActiveStep(activeStep - 1))}
            >
              Back
            </Button>
          ) : null}
        </Grid>
        <Grid item>
          {activeStep === 0 ? (
            <Button
              variant="text"
              onClick={() => dispatch(setActiveStep(activeStep + 1))}
              disabled={!files.length}
            >
              Next
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
}
