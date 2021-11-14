import {useSelector, useDispatch} from 'react-redux'
import SuiButton from 'components/SuiButton'
import {Prompt, Alert} from 'react-st-modal'
import {useContext} from 'react'
import {SocketContext} from '../../../../context/socket/SocketIOProvider'
import {openAlert} from 'redux/actions/alert'

export default function BidModal({
  biddingProductId,
  productName,
  stepPrice,
  initPrice,
  currentPrice,
  buyNowPrice
}) {
  const dispatch = useDispatch()

  const userProfile = useSelector(state => state.userState.profile)

  const {biddingProduct: biddingProductSocket, buyNowProduct: buyNowProductSocket} =
    useContext(SocketContext)

  const handleBidding = async () => {
    const priceValid = stepPrice + (currentPrice || initPrice)
    const price = await Prompt('How much do you want to bidding?', {
      isRequired: true,
      defaultValue: priceValid
    })
    const canBid = priceValid <= price

    if (price > buyNowPrice) {
      buyNowProductSocket({biddingProductId: biddingProductId, userId: userProfile._id})
    } else {
      if (price && canBid) {
        if (biddingProductId) {
          biddingProductSocket({
            biddingProductId: biddingProductId,
            price,
            userId: userProfile._id
          })
          Alert(`Bidding ${price} $`, `Product ${productName}`)
        } else {
          const text = `Can't bid`
          const infoAlert = {messageAlert: text, typeAlert: 'error'}
          dispatch(openAlert(infoAlert))
        }
      } else {
        const text = `Price is invalid`
        const infoAlert = {messageAlert: text, typeAlert: 'warning'}
        dispatch(openAlert(infoAlert))
      }
    }
  }

  return (
    <SuiButton size="small" buttonColor="info" variant="outlined" onClick={handleBidding}>
      Bid
    </SuiButton>
  )
}
