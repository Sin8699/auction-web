import {useSelector} from 'react-redux'
import {Confirm} from 'react-st-modal'
import SuiButton from 'components/SuiButton'
import {SocketContext} from '../../../../context/socket/SocketIOProvider'
import {useContext} from 'react'

export default function BuyNowModal({biddingProduct, priceBuyNow}) {
  const userProfile = useSelector(state => state.userState.profile)

  const {buyNowProduct: buyNowProductSocket} = useContext(SocketContext)

  const handleBuyNow = async () => {
    const isOk = await Confirm(`Product with price : ${priceBuyNow} $`, 'Are you sure to buy now ?')

    //TODO:  current user
    if (isOk) {
      buyNowProductSocket({
        biddingProductId: biddingProduct,
        userId: userProfile._id
      })
    }
  }

  return (
    <SuiButton style={{width: '100%'}} size="small" buttonColor="error" onClick={handleBuyNow}>
      Buy Now with {priceBuyNow}$
    </SuiButton>
  )
}
