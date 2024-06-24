
export interface Emergency {
  id: string
  content: string
  frontMatter: FrontMatter
  clicked: boolean
}

export interface FrontMatter {
  category: string
  date: string
  draft: boolean
  images: string
  level: string
  location: string
  period: string
  salary: string
  site: string
  summary: string
  title: string
}
