import { MomentTimezone } from 'moment-timezone'

export interface Album {
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
