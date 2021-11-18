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
  buyNowPrice,
  biddingFromDetail
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

    if (price) {
      const isConfirm = window.confirm(`Are you sure ?`)

      const canBid = priceValid <= price

      if (price > buyNowPrice && isConfirm) {
        buyNowProductSocket({biddingProductId: biddingProductId, userId: userProfile._id})
      } else {
        if (canBid && isConfirm) {
          if (biddingProductId) {
            biddingProductSocket({
              biddingProductId: biddingProductId,
              price,
              userId: userProfile._id
            })
            Alert(`Bidding ${price} $`, `Product ${productName}`)
            biddingFromDetail && biddingFromDetail()
          } else dispatch(openAlert({messageAlert: `Can't bid`, typeAlert: 'error'}))
        } else if (!canBid)
          dispatch(openAlert({messageAlert: `Price is invalid`, typeAlert: 'warning'}))
      }
    }
  }

  return (
    <SuiButton size="small" buttonColor="info" variant="outlined" onClick={handleBidding}>
      Bid
    </SuiButton>
  )
}
