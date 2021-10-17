import SuiButton from 'components/SuiButton'
import { Prompt, Alert } from 'react-st-modal'

export default function BidModal({ biddingProduct, productName }) {
  console.log('biddingProduct', biddingProduct)
  return (
    <SuiButton
      size="small"
      buttonColor="info"
      variant="outlined"
      onClick={async () => {
        const age = await Prompt('How much do you want to bidding?', {
          isRequired: true,
          defaultValue: 100
        })

        if (age) {
          Alert(`Bidding ${100} $`, `Product ${productName}`)
        }
      }}
    >
      Bid
    </SuiButton>
  )
}
