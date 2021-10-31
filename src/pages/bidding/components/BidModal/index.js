import {useSelector} from 'react-redux'
import SuiButton from 'components/SuiButton'
import {Prompt, Alert} from 'react-st-modal'
import {useContext} from 'react'
import {SocketContext} from '../../../../context/socket/SocketIOProvider'

export default function BidModal({biddingProduct, productName}) {
  const userProfile = useSelector(state => state.userState.profile)
  console.log('userProfile: ', userProfile)

  const {biddingProduct: biddingProductSocket} = useContext(SocketContext)

  const handleBidding = async () => {
    const price = await Prompt('How much do you want to bidding?', {
      isRequired: true,
      defaultValue: 100
    })

    //TODO: check price cant bidding && current user
    biddingProductSocket({
      productID: biddingProduct?.product || Math.random(), //no case
      priceBid: price,
      userID: '616d634cc14b31b6b9097f78'
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
