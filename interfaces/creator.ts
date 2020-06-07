enum CreatorType {
  LYRICS = 'lyrics',
  MUSIC = 'music',
  ARRANGEMENT = 'arrangement',
  REMIX = 'remix'
}

interface SongCreator {
  creator_type: CreatorType,
  display_name: string
}

interface SongCreators {
  lyrics: SongCreator | null
  music: SongCreator | null
  arrangement: SongCreator | null
  remix: SongCreator | null
  all: Array<SongCreator>
}

export {
  CreatorType,
  SongCreator,
  SongCreators
}
