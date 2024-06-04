interface Album {
  title: string;
  songs: { title: string; duration: string }[];
  description: string;
}

type FileType = 'audio' | 'video';
export interface MockFile {
  name: string;
  albums: Album[];
}

export interface AudioFile {
  artist: string;
  album: string;
  title: string;
  duration: string;
  fileType: FileType;
}

export interface VideoFile {
  artist: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  uploadTime: string;
  views: string;
  videoUrl: string;
  description: string;
  subscriber: string;
  isLive: boolean;
  fileType: FileType;
}

export type AllFile = Partial<AudioFile> & Partial<VideoFile>;

export const mockFiles: MockFile[] = [
  {
    name: 'Radiohead',
    albums: [
      {
        title: 'The King of Limbs',
        songs: [
          {
            title: 'Bloom',
            duration: '5:15',
          },
          {
            title: 'Morning Mr Magpie',
            duration: '4:41',
          },
          {
            title: 'Little by Little',
            duration: '4:27',
          },
          {
            title: 'Feral',
            duration: '3:13',
          },
          {
            title: 'Lotus Flower',
            duration: '5:01',
          },
          {
            title: 'Codex',
            duration: '4:47',
          },
          {
            title: 'Give Up the Ghost',
            duration: '4:50',
          },
          {
            title: 'Separator',
            duration: '5:20',
          },
        ],
        description:
          '\n\tThe King of Limbs is the eighth studio album by English rock band Radiohead, produced by Nigel Godrich. It was self-released on 18 February 2011 as a download in MP3 and WAV formats, followed by physical CD and 12" vinyl releases on 28 March, a wider digital release via AWAL, and a special "newspaper" edition on 9 May 2011. The physical editions were released through the band\'s Ticker Tape imprint on XL in the United Kingdom, TBD in the United States, and Hostess Entertainment in Japan.\n      ',
      },
      {
        title: 'OK Computer',
        songs: [
          {
            title: 'Airbag',
            duration: '4:44',
          },
          {
            title: 'Paranoid Android',
            duration: '6:23',
          },
          {
            title: 'Subterranean Homesick Alien',
            duration: '4:27',
          },
          {
            title: 'Exit Music (For a Film)',
            duration: '4:24',
          },
          {
            title: 'Let Down',
            duration: '4:59',
          },
          {
            title: 'Karma Police',
            duration: '4:21',
          },
          {
            title: 'Fitter Happier',
            duration: '1:57',
          },
          {
            title: 'Electioneering',
            duration: '3:50',
          },
          {
            title: 'Climbing Up the Walls',
            duration: '4:45',
          },
          {
            title: 'No Surprises',
            duration: '3:48',
          },
          {
            title: 'Lucky',
            duration: '4:19',
          },
          {
            title: 'The Tourist',
            duration: '5:24',
          },
        ],
        description:
          "\n\tOK Computer is the third studio album by the English alternative rock band Radiohead, released on 16 June 1997 on Parlophone in the United Kingdom and 1 July 1997 by Capitol Records in the United States. It marks a deliberate attempt by the band to move away from the introspective guitar-oriented sound of their previous album The Bends. Its layered sound and wide range of influences set it apart from many of the Britpop and alternative rock bands popular at the time and laid the groundwork for Radiohead's later, more experimental work.\n      ",
      },
    ],
  },
  {
    name: 'Portishead',
    albums: [
      {
        title: 'Dummy',
        songs: [
          {
            title: 'Mysterons',
            duration: '5:02',
          },
          {
            title: 'Sour Times',
            duration: '4:11',
          },
          {
            title: 'Strangers',
            duration: '3:55',
          },
          {
            title: 'It Could Be Sweet',
            duration: '4:16',
          },
          {
            title: 'Wandering Star',
            duration: '4:51',
          },
          {
            title: "It's a Fire",
            duration: '3:49',
          },
          {
            title: 'Numb',
            duration: '3:54',
          },
          {
            title: 'Roads',
            duration: '5:02',
          },
          {
            title: 'Pedestal',
            duration: '3:39',
          },
          {
            title: 'Biscuit',
            duration: '5:01',
          },
          {
            title: 'Glory Box',
            duration: '5:06',
          },
        ],
        description:
          '\n\tDummy is the debut album of the Bristol-based group Portishead. Released in August 22, 1994 on Go! Discs, the album earned critical acclaim, winning the 1995 Mercury Music Prize. It is often credited with popularizing the trip-hop genre and is frequently cited in lists of the best albums of the 1990s. Although it achieved modest chart success overseas, it peaked at #2 on the UK Album Chart and saw two of its three singles reach #13. The album was certified gold in 1997 and has sold two million copies in Europe. As of September 2011, the album was certified double-platinum in the United Kingdom and has sold as of September 2011 825,000 copies.\n      ',
      },
      {
        title: 'Third',
        songs: [
          {
            title: 'Silence',
            duration: '4:58',
          },
          {
            title: 'Hunter',
            duration: '3:57',
          },
          {
            title: 'Nylon Smile',
            duration: '3:16',
          },
          {
            title: 'The Rip',
            duration: '4:29',
          },
          {
            title: 'Plastic',
            duration: '3:27',
          },
          {
            title: 'We Carry On',
            duration: '6:27',
          },
          {
            title: 'Deep Water',
            duration: '1:31',
          },
          {
            title: 'Machine Gun',
            duration: '4:43',
          },
          {
            title: 'Small',
            duration: '6:45',
          },
          {
            title: 'Magic Doors',
            duration: '3:32',
          },
          {
            title: 'Threads',
            duration: '5:45',
          },
        ],
        description:
          "\n\tThird is the third studio album by English musical group Portishead, released on 27 April 2008, on Island Records in the United Kingdom, two days after on Mercury Records in the United States, and on 30 April 2008 on Universal Music Japan in Japan. It is their first release in 10 years, and their first studio album in eleven years. Third entered the UK Album Chart at #2, and became the band's first-ever American Top 10 album on the Billboard 200, reaching #7 in its entry week.\n      ",
      },
    ],
  },
];

export const mockAudioFiles: AudioFile[] = [];
mockFiles.forEach((mockFile) => {
  mockFile.albums.forEach((album) => {
    album.songs.forEach((song) => {
      mockAudioFiles.push({
        artist: mockFile.name,
        album: album.title,
        title: song.title,
        duration: song.duration,
        fileType: 'audio',
      });
    });
  });
});

export const mockVideoFiles: VideoFile[] = [
  {
    title: 'Big Buck Bunny',
    thumbnailUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png',
    duration: '8:18',
    uploadTime: 'May 9, 2011',
    views: '24,969,123',
    artist: 'Vlc Media Player',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description:
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    subscriber: '25254545 Subscribers',
    isLive: true,
    fileType: 'video',
  },
  {
    title: 'The first Blender Open Movie from 2006',
    thumbnailUrl: 'https://i.ytimg.com/vi_webp/gWw23EYM9VM/maxresdefault.webp',
    duration: '12:18',
    uploadTime: 'May 9, 2011',
    views: '24,969,123',
    artist: 'Blender Inc.',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description:
      'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
    subscriber: '25254545 Subscribers',
    isLive: true,
    fileType: 'video',
  },
  {
    title: 'For Bigger Blazes',
    thumbnailUrl: 'https://i.ytimg.com/vi/Dr9C2oswZfA/maxresdefault.jpg',
    duration: '8:18',
    uploadTime: 'May 9, 2011',
    views: '24,969,123',
    artist: 'T-Series Regional',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description:
      'Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series',
    subscriber: '25254545 Subscribers',
    isLive: true,
    fileType: 'video',
  },
  {
    title: 'For Bigger Escape',
    thumbnailUrl:
      'https://img.jakpost.net/c/2019/09/03/2019_09_03_78912_1567484272._large.jpg',
    duration: '8:18',
    uploadTime: 'May 9, 2011',
    views: '24,969,123',
    artist: 'T-Series Regional',
    videoUrl:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description:
      " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
    subscriber: '25254545 Subscribers',
    isLive: false,
    fileType: 'video',
  },
];
