import { SongCreators } from "~/interfaces/creator"
import { Album } from "~/interfaces/album"

interface Song {
  song_id: string
  parent_song_id: string
  title: string
  sub_title: string
  singer: string
  image_path: string
}

interface SongVariations {
  parent_song: Song
  variations: Array<Song>
}

interface SongDetail {
  song_id: string
  title: string
  sub_title: string
  aitube_url: Array<string>
  singer: string
  creators: SongCreators
  albums: Array<Album>
  variations: SongVariations
}

export {
  Song,
  SongVariations,
  SongDetail
}
