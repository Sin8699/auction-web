/* eslint-disable react/prop-types */
// @material-ui core components
import Icon from '@material-ui/core/Icon'

// Soft UI Dashboard Material-UI components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiProgress from 'components/SuiProgress'

// Images
import logoSpotify from 'assets/images/small-logos/logo-spotify.svg'
import logoInvesion from 'assets/images/small-logos/logo-invision.svg'
import logoJira from 'assets/images/small-logos/logo-jira.svg'
import logoSlack from 'assets/images/small-logos/logo-slack.svg'
import logoWebDev from 'assets/images/small-logos/logo-webdev.svg'
import logoXD from 'assets/images/small-logos/logo-xd.svg'
import Table from 'component-pages/Table'
import styles from 'layouts/tables/styles'

function Completion({ value, color }) {
  return (
    <SuiBox display="flex" alignItems="center">
      <SuiTypography variant="caption" textColor="text" fontWeight="medium">
        {value}%&nbsp;
      </SuiTypography>
      <SuiBox width="8rem">
        <SuiProgress value={value} color={color} gradient noLabel />
      </SuiBox>
    </SuiBox>
  )
}

const action = (
  <Icon className="material-icons-round font-bold text-secondary cursor-pointer" fontSize="small">
    more_vert
  </Icon>
)

// eslint-disable-next-line import/no-anonymous-default-export
const data = {
  columns: [
    { key: 'project', name: 'project', align: 'left' },
    { key: 'budget', name: 'budget', align: 'left' },
    { key: 'status', name: 'status', align: 'left' },
    { key: 'completion', name: 'completion', align: 'center' },
    { key: 'action', name: 'action', align: 'center' }
  ],
  rows: [
    {
      project: [logoSpotify, 'Spotift'],
      budget: (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $2,500
        </SuiTypography>
      ),
      status: (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          working
        </SuiTypography>
      ),
      completion: <Completion value={60} color="info" />,
      action
    },
    {
      project: [logoInvesion, 'Invesion'],
      budget: (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $5,000
        </SuiTypography>
      ),
      status: (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          done
        </SuiTypography>
      ),
      completion: <Completion value={100} color="success" />,
      action
    },
    {
      project: [logoJira, 'Jira'],
      budget: (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $3,400
        </SuiTypography>
      ),
      status: (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          canceled
        </SuiTypography>
      ),
      completion: <Completion value={30} color="error" />,
      action
    },
    {
      project: [logoSlack, 'Slack'],
      budget: (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $1,400
        </SuiTypography>
      ),
      status: (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          canceled
        </SuiTypography>
      ),
      completion: <Completion value={0} color="error" />,
      action
    },
    {
      project: [logoWebDev, 'Webdev'],
      budget: (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $14,000
        </SuiTypography>
      ),
      status: (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          working
        </SuiTypography>
      ),
      completion: <Completion value={80} color="info" />,
      action
    },
    {
      project: [logoXD, 'Adobe XD'],
      budget: (
        <SuiTypography variant="button" textColor="text" fontWeight="medium">
          $2,300
        </SuiTypography>
      ),
      status: (
        <SuiTypography variant="caption" textColor="text" fontWeight="medium">
          done
        </SuiTypography>
      ),
      completion: <Completion value={100} color="success" />,
      action
    }
  ]
}

const RelatedProductsTable = () => {
  const classes = styles()
  const { columns, rows } = data

  return (
    <SuiBox customClass={classes.tables_table}>
      <Table columns={columns} rows={rows} />
    </SuiBox>
  )
}

export default RelatedProductsTable