import io from 'socket.io-client'
import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {setBiddingProductsData} from 'redux/actions/bidding-product'
import {EMIT_KEYS, ENDPOINT_SOCKET, ON_KEYS} from './constants'

export const SocketContext = React.createContext('auction-socket')

const SocketContainer = ({children}) => {
  const dispatch = useDispatch()
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io(ENDPOINT_SOCKET)

    setSocket(newSocket)

    newSocket.on(ON_KEYS.NEW_BIDDING, value => {
      // console.log('value', value.payload)
      dispatch(setBiddingProductsData(value.payload))
    })

    return () => newSocket.close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const biddingProduct = data => {
    if (!socket) return
    socket.emit(EMIT_KEYS.BIDDING, data)
  }

  const buyNowProduct = data => {
    if (!socket) return
    socket.emit(EMIT_KEYS.BUY_NOW, data)
  }

  return (
    <SocketContext.Provider value={{biddingProduct, buyNowProduct}}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketContainer
