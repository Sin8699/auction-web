import io from 'socket.io-client'
import React, { useEffect, useState } from 'react'
import { EMIT_KEYS, ENDPOINT_SOCKET } from './constants'

export const SocketContext = React.createContext('auction-socket')

const SocketContainer = ({ children }) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(ENDPOINT_SOCKET)

    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  const biddingProduct = (data) => {
    if (!socket) return
    socket.emit(EMIT_KEYS.BIDDING, data)
  }

  const buyNowProduct = (data) => {
    if (!socket) return
    socket.emit(EMIT_KEYS.BUY_NOW, data)
  }

  return (
    <SocketContext.Provider value={{ biddingProduct, buyNowProduct }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContainer