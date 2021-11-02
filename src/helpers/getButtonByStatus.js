import SuiButton from 'components/SuiButton'

export const getButtonByStatus = (status) => {
  let statusComp = status

  switch (status) {
    case 'SOLD':
      statusComp = (
        <SuiButton
          size="small"
          style={{ color: 'rgb(189, 0, 0)', backgroundColor: 'rgb(252, 151, 151)' }}
        >
          SOLD
        </SuiButton>
      )
      break
    case 'AVAILABLE':
      statusComp = (
        <SuiButton
          size="small"
          style={{ background: 'rgb(205, 245, 155)', color: 'rgb(103, 177, 8)' }}
        >
          AVAILABLE
        </SuiButton>
      )
      break

    default:
      statusComp = (
        <SuiButton size="small" variant="gradient" buttonColor="dark">
          EXPIRED
        </SuiButton>
      )
      break
  }

  return statusComp
}
