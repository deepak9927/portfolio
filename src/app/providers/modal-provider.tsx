'use client'
import { PricesList, TicketDetails } from '@/lib/types'
import { createContext, useContext, useEffect, useState } from 'react'

// Define local types to remove Prisma dependency
export type User = {
  id: string
  name: string
  email: string
  image: string
}

export type Agency = {
  id: string
  name: string
  users: User[]
}

export type Contact = {
  id: string
  name: string
  email: string
}

export type Plan = 'price_1' | 'price_2' | 'price_3'

interface ModalProviderProps {
  children: React.ReactNode
}

export type ModalData = {
  user?: User
  agency?: Agency
  ticket?: TicketDetails[0]
  contact?: Contact
  plans?: {
    defaultPriceId: Plan
    plans: PricesList['data']
  }
}
type ModalContextType = {
  data: ModalData
  isOpen: boolean
  setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => void
  setClose: () => void
}

export const ModalContext = createContext<ModalContextType>({
  data: {},
  isOpen: false,
  setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => {},
  setClose: () => {},
})

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<ModalData>({})
  const [showingModal, setShowingModal] = useState<React.ReactNode>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const setOpen = async (
    modal: React.ReactNode,
    fetchData?: () => Promise<any>
  ) => {
    if (modal) {
      if (fetchData) {
        setData({ ...data, ...(await fetchData()) })
      }
      setShowingModal(modal)
      setIsOpen(true)
    }
  }

  const setClose = () => {
    setIsOpen(false)
    setData({})
  }

  if (!isMounted) return null

  return (
    <ModalContext.Provider value={{ data, setOpen, setClose, isOpen }}>
      {children}
      {showingModal}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within the modal provider')
  }
  return context
}

export default ModalProvider
