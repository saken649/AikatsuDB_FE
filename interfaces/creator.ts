enum CreatorType {
  LYRICS = 'lyrics',
  MUSIC = 'music',
  ARRANGEMENT = 'arrangement',
  REMIX = 'remix'
}

enum CreatorTypeLabel {
  LYRICS = '作詞',
  MUSIC = '作曲',
  ARRANGEMENT = '編曲',
  REMIX = 'リミックス'
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

interface Creator {
  creator_id: string
  name: string
  name_kana: string
  creator_types: Array<CreatorType>
}

export {
  CreatorType,
  CreatorTypeLabel,
  SongCreator,
  SongCreators,
  Creator
}
