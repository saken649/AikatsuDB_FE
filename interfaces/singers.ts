interface SingerAbout {
  singer_io: string
  name: string
  is_current: boolean
}

interface Singers {
  group_id: string
  group_name: string
  singers: Array<SingerAbout>
}

export {
  SingerAbout,
  Singers
}
