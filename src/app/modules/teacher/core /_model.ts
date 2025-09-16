import { ID } from "../../../../_metronic/helpers"

export type CourtModel = {
  club_id?: ID
  name: string
  address: string
  city: string
  state: string
  country: string
  postal_code: string
  latitude: number
  longitude: number
  court_type: string
  image_url?: string
  facilities?: string
  alias?: string
  heading?: string
  sub_heading?: string
  content?: string
  short_description?: string
  is_active: boolean
  is_featured: boolean
}

// Optional default object
export const initialCourt: CourtModel = {
  name: '',
  address: '',
  city: '',
  state: '',
  country: '',
  postal_code: '',
  latitude: 0.0,
  longitude: 0.0,
  court_type: '',
  image_url: '',
  facilities: '',
  alias: '',
  heading: '',
  sub_heading: '',
  content: '',
  short_description: '',
  is_active: true,
  is_featured: false,
}
