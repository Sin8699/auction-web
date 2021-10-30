import Card from '@material-ui/core/Card'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'component-pages/Navbars/DashboardNavbar'
import Footer from 'component-pages/Footer'
import Table from 'component-pages/Table'

import styles from 'layouts/tables/styles'

// Data
import authorsTableData from 'layouts/tables/data/authorsTableData'
import projectsTableData from 'layouts/tables/data/projectsTableData'

function Tables() {
  const classes = styles()
  const {columns, rows} = authorsTableData
  const {columns: prCols, rows: prRows} = projectsTableData

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SuiBox py={3}>
        <SuiBox mb={3}>
          <Card>
            <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SuiTypography variant="h6">Authors table</SuiTypography>
            </SuiBox>
            <SuiBox customClass={classes.tables_table}>
              <Table columns={columns} rows={rows} />
            </SuiBox>
          </Card>
        </SuiBox>
        <Card>
          <SuiBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SuiTypography variant="h6">Projects table</SuiTypography>
          </SuiBox>
          <SuiBox customClass={classes.tables_table}>
            <Table columns={prCols} rows={prRows} />
          </SuiBox>
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  )
}

export default Tables
