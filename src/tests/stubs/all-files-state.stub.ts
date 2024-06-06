import { AllFilesState } from '../../models/all-files';

export const allFilesStateStub: AllFilesState = {
  allFiles: [
    {
      album: 'testAlbum1',
      artist: 'testArtist1',
      duration: '02:12',
      fileType: 'audio',
      title: 'testTitle1',
    },
    {
      album: undefined,
      artist: 'testArtist2',
      duration: '02:12',
      fileType: 'video',
      title: 'testTitle2',
    },
  ],
  cachedAllFiles: [
    {
      album: 'testAlbum1',
      artist: 'testArtist1',
      duration: '02:12',
      fileType: 'audio',
      title: 'testTitle1',
    },
    {
      album: undefined,
      artist: 'testArtist2',
      duration: '02:12',
      fileType: 'video',
      title: 'testTitle2',
    },
  ],
  searchValue: '',
};
