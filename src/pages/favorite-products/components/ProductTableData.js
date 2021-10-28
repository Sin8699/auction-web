// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

// Images
import logoSpotify from 'assets/images/small-logos/logo-spotify.svg'
import logoInvesion from 'assets/images/small-logos/logo-invision.svg'
import logoJira from 'assets/images/small-logos/logo-jira.svg'
import logoSlack from 'assets/images/small-logos/logo-slack.svg'
import logoWebDev from 'assets/images/small-logos/logo-webdev.svg'
import logoXD from 'assets/images/small-logos/logo-xd.svg'
import styles from './styles'
import Card from '@material-ui/core/Card'
import Table from 'component-pages/Table'

const data = {
  columns: [
    { name: 'product', align: 'left' },
    { name: 'budget', align: 'left' },
    { name: 'status', align: 'left' }
  ],
  rows: [
    {
      product: [logoSpotify, 'Spotift'],
      budget: (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $2,500
        </SuiTypography>
      ),
      status: (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          working
        </SuiTypography>
      )
    },
    {
      product: [logoInvesion, 'Invesion'],
      budget: (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $5,000
        </SuiTypography>
      ),
      status: (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          done
        </SuiTypography>
      )
    },
    {
      product: [logoJira, 'Jira'],
      budget: (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $3,400
        </SuiTypography>
      ),
      status: (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          canceled
        </SuiTypography>
      )
    },
    {
      product: [logoSlack, 'Slack'],
      budget: (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $1,400
        </SuiTypography>
      ),
      status: (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          canceled
        </SuiTypography>
      )
    },
    {
      product: [logoWebDev, 'Webdev'],
      budget: (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $14,000
        </SuiTypography>
      ),
      status: (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          working
        </SuiTypography>
      )
    },
    {
      product: [logoXD, 'Adobe XD'],
      budget: (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $2,300
        </SuiTypography>
      ),
      status: (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          done
        </SuiTypography>
      )
    }
  ]
}

const ProductTableData = () => {
  const classes = styles()

  const { columns, rows } = data

  return (
    <Card>
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SuiTypography variant="h6">Favorite Products</SuiTypography>
      </SuiBox>
      <SuiBox customClass={classes.tables_table}>
        <Table columns={columns} rows={rows} />
      </SuiBox>
    </Card>
  )
}

export default ProductTableData
