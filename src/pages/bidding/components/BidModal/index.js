import {useSelector} from 'react-redux'
import SuiButton from 'components/SuiButton'
import {Prompt, Alert} from 'react-st-modal'
import {useContext} from 'react'
import {SocketContext} from '../../../../context/socket/SocketIOProvider'

export default function BidModal({biddingProduct, productName}) {
  const userProfile = useSelector(state => state.userState.profile)

  const {biddingProduct: biddingProductSocket} = useContext(SocketContext)

  const handleBidding = async () => {
    const price = await Prompt('How much do you want to bidding?', {
      isRequired: true,
      defaultValue: 100
    })

    //TODO: check price cant bidding && current user
    biddingProductSocket({
      biddingProductId: biddingProduct?.product || Math.random(), //no case
      price,
      userId: userProfile._id
    })

    if (price) {
      Alert(`Bidding ${price} $`, `Product ${productName}`)
    }
  }

  return (
    <SuiButton size="small" buttonColor="info" variant="outlined" onClick={handleBidding}>
      Bid
    </SuiButton>
  )
}
