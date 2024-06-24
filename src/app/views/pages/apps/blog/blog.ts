export interface Blog {
  frontMatter: FrontMatter
  content: string
  id:string
}

export interface FrontMatter {
  title: string
  date: string
  draft: boolean
  summary: string
  category: string
  images: string
  author: Author
}

export interface Author {
  name: string
  position: string
  image: string
  isEmployee: boolean
  isVerified: boolean
}
