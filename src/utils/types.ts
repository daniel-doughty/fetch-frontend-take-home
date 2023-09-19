export interface User {
  name: FormDataEntryValue | null
  email: FormDataEntryValue | null
}

export interface Dog {
  id: string
  name: string
  age: string
  breed: string
  img: string
  zip_code: string
}

export interface FilterOptions {
  breeds?: string[]
  zipCodes?: string[]
  ageMin?: number
  ageMax?: number
  sort?: string
  from: number
  size: number
}
