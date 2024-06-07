import { sampleJwtToken, setJwtToken } from '../utilities/utility';
import {
  AllFile,
  AudioFile,
  VideoFile,
  mockAudioFiles,
  mockVideoFiles,
} from '../stubs/files';
import { loginCreds } from '../stubs/login-stub';

export const getSession = (e: string, p: string): Promise<boolean> => {
  const isUserExist = loginCreds.some(
    ({ email, password }) => email === e && password === p,
  );

  console.log(isUserExist);
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
    }, 4000);
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
