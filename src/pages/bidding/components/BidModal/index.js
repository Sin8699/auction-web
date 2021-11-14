import {useSelector} from 'react-redux'
import SuiButton from 'components/SuiButton'
import {Prompt, Alert} from 'react-st-modal'
import {useContext} from 'react'
import {SocketContext} from '../../../../context/socket/SocketIOProvider'

export default function BidModal({biddingProductId, productName, stepPrice, currentPrice}) {
  const userProfile = useSelector(state => state.userState.profile)

  const {biddingProduct: biddingProductSocket} = useContext(SocketContext)

  const handleBidding = async () => {
    const price = await Prompt('How much do you want to bidding?', {
      isRequired: true,
      defaultValue: 100
    })

    const canBid = price > stepPrice

    //TODO: check price cant bidding && current user
    biddingProductSocket({
      biddingProductId: biddingProductId || Math.random(),
      price,
      userId: userProfile._id
    })

    if (!canBid) Alert(`Price is invalid!!!`)
    else if (price && canBid) Alert(`Bidding ${price} $`, `Product ${productName}`)
    else Alert(`Something wrong, please try again`)
  }

  return (
    <SuiButton size="small" buttonColor="info" variant="outlined" onClick={handleBidding}>
      Bid
    </SuiButton>
  )
}
