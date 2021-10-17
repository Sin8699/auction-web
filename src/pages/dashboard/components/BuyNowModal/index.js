import { Confirm } from 'react-st-modal'
import SuiButton from 'components/SuiButton'

export default function BuyNowModal({ biddingProduct }) {
  const { buyNowPrice } = biddingProduct
  return (
    <SuiButton
      size="small"
      buttonColor="error"
      onClick={async () => {
        const result = await Confirm(
          `Product with price : ${buyNowPrice} $`,
          'Are you sure to buy now ?'
        )

        if (result) {
        } else {
        }
      }}
    >
      Buy Now!
    </SuiButton>
  )
}
