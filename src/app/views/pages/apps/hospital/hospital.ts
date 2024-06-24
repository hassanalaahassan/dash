export interface Hospital {
  id: string
  content: string
  frontMatter: FrontMatter
}

export interface FrontMatter {
  date: string
  description: string
  draft: boolean
  image: string
  category: any
  image2: string
  title: string
}
