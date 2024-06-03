import { sampleJwtToken, setJwtToken } from '../components/utilities/utility';
import {
  AllFile,
  AudioFile,
  VideoFile,
  mockAudioFiles,
  mockVideoFiles,
} from '../stubbs/files';
import { loginCreds } from '../stubbs/login-stub';

export const getSession = (e: string, p: string): Promise<boolean> => {
  const isUserExist = loginCreds.some(
    ({ email, password }) => email === e && password === p,
  );

  return new Promise((res, rej) => {
    setTimeout(() => {
      if (isUserExist) {
        setJwtToken(sampleJwtToken);
        return res(isUserExist);
      }
      return rej(new Error('Invalid creds'));
    }, 4000);
  });
};

export const getAllFiles = (): Promise<AllFile[]> => {
  return new Promise((res) => {
    setTimeout(() => {
      return res([...mockAudioFiles, ...mockVideoFiles]);
    }, 100);
  });
};

export const getAudioFiles = (): Promise<AudioFile[]> => {
  return new Promise((res) => {
    setTimeout(() => {
      return res(mockAudioFiles);
    }, 4000);
  });
};

export const getVideoFiles = (): Promise<VideoFile[]> => {
  return new Promise((res) => {
    setTimeout(() => {
      return res(mockVideoFiles);
    }, 4000);
  });
};
