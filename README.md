
# Media Assests Management

A simple react application to manage audio and video files

## Demo

To start the app,

```bash
npm install // Installs the dependencies
npm run start // Starts the app
```
#### Login creds
```bash
  email: simon.nixon@gmail.com
  password: pMnMjX
```
## Screenshots

![Login](/screenshots/Login.png?raw=true "Login")
![Files list](/screenshots/List.png?raw=true "Files list")
![Search](/screenshots/Search.png?raw=true "Search")
![Edit](/screenshots/Edit.png?raw=true "Edit")
![Delete](/screenshots/Delete.png?raw=true "Delete")
![Upload file-1](/screenshots/UploadFile.png?raw=true "Upload file-1")
![Upload file-2](/screenshots/UploadFileValidation.png?raw=true "Upload file-2")
![Added record](/screenshots/NewlyAddedRecord.png?raw=true "Added record")


## Libraries
    Bootstrap, Material UI, Redux


## Usage
    1. User can login into the app via the login creds provided.
    2. View the list of audio and video files.
    3. Edit the metadata of the files.
    4. Delete a file.
    5. Search for files.
    6. Upload new files and can be seen in the files list.
    7. Refresh the page to reset to the default mock data.



## Limitations
To make the development time faster, following assumptions were made

    1. Authentication/Authorization isn't integrated with a backend. However I've seeded
     a login creds in the codebase for testing.
    2. API responses are mocked.
    3. SetTimeout is used to mimic API calls and it returns promises. So will be replaced
     with the actual api call if needed.
    4. An audio and video file are added in the codebase for testing upload of files. 
        You can upload your own files as well. Supported formats
     include(.mp3,.aac,.wav,.mp4,.mov,.avi)
    5. Audio and video player are not available for now and can be built as an extension.


## License

[MIT](https://choosealicense.com/licenses/mit/)