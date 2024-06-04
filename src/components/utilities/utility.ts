import { AudioFile } from '../../stubbs/files';

export const setJwtToken = (token: string) => {
  localStorage.setItem('jwt', token);
};

export const getJwtToken = () => {
  return localStorage.getItem('jwt');
};

export const removeJwtToken = () => {
  return localStorage.removeItem('jwt');
};

export const sampleJwtToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNpbW9uIE5peG9uIiwiaWF0IjoxNTE2MjM5MDIyfQ.uAtBWmANdDtnj-heMCuWroQYzW0L-GUajjEeXYkvE38';

export const isAuthenticated = () => !!getJwtToken();

export const getTitleFromFile = (file: File) => file.name.split('.')[0];

export const getFileTypeFromFile = (file: File) =>
  file.type.split('/')[0] as 'audio' | 'video';

const getDisplayValue = (value: number) => (value < 10 ? `0${value}` : value);

export const getDurationInFormat = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.ceil(duration - minutes * 60);

  const minutesToDisplay = getDisplayValue(minutes);
  const secondsToDisplay = getDisplayValue(seconds);

  return `${minutesToDisplay}:${secondsToDisplay}`;
};

export const areFilesInValid = (files: Partial<AudioFile>[]) =>
  !files.length ||
  files.some((file) => !file.album || !file.artist || !file.title);

export const transformFiles = (files: File[]) => {
  return files.map((file) => ({
    title: getTitleFromFile(file),
    album: '',
    artist: '',
    duration: '',
    fileType: getFileTypeFromFile(file),
  }));
};
