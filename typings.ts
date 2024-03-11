export interface RootObject {
  data: Datum[]
  meta: Meta
}

export interface Datum {
  attributes: DatumAttributes
  id: number
}

export interface DatumAttributes {
  Image: Image
  Name: string
  createdAt: Date
  publishedAt: Date
  updatedAt: Date
}

export interface Image {
  data: Data
}

export interface Data {
  attributes: DataAttributes
  id: number
}

export interface DataAttributes {
  alternativeText: null
  caption: null
  createdAt: Date
  ext: string
  formats: Formats
  hash: string
  height: number
  mime: string
  name: string
  previewUrl: null
  provider: string
  provider_metadata: ProviderMetadata
  size: number
  updatedAt: Date
  url: string
  width: number
}

export interface Formats {
  large: Large
  medium: Large
  small: Large
  thumbnail: Large
}

export interface Large {
  ext: string
  hash: string
  height: number
  mime: string
  name: string
  path: null
  provider_metadata: ProviderMetadata
  size: number
  url: string
  width: number
}

export interface ProviderMetadata {
  public_id: string
  resource_type: string
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageCount: number
  pageSize: number
  total: number
}
