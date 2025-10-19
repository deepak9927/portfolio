export type PricesList = {
  data: any[]
}

export type TicketDetails = {
  id: string
  name: string
  description: string
}[]

export type FunnelPage = {
  id: string
  name: string
  content: any
  createdAt: Date
  updatedAt: Date
  order: number
  pathName: string
  title: string
  liveProducts: string
  description: string
  funnelId: string
  published: boolean
}
