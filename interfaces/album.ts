import { MomentTimezone } from 'moment-timezone'

interface Album {
  id: string
  title: string
  sub_title: string
  sold_date: MomentTimezone
  image_path: string
  disc_number: number
  disc_total: number
  track_number: number
  track_total: number
}

interface AlbumSong {
  song_id: string
  title: string
  sub_title: string | null
  singer: string
  track_number: number
  disc_number: number
}

interface AlbumSongs {
  disc_number: number
  songs: Array<AlbumSong>
}

interface AlbumDetail {
  album_id: string
  title: string
  sub_title: string | null
  sold_date: MomentTimezone
  image_path: string
  total_disc: number
  songs: AlbumSongs
}

export {
  Album,
  AlbumSong,
  AlbumSongs,
  AlbumDetail
}
