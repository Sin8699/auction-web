import {useMemo} from 'react'

import PropTypes from 'prop-types'

import {Bar} from 'react-chartjs-2'

import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

import BarReportsChartItem from 'component-pages/Charts/BarCharts/ReportsBarChart/ReportsBarChartItem'

import configs from 'component-pages/Charts/BarCharts/ReportsBarChart/configs'

function ReportsBarChart({color, title, description, chart, items}) {
  const {data, options} = configs(chart.labels, chart.datasets)

  const renderItems = items.map(({icon, label, progress}) => (
    <Grid item xs={6} sm={3} key={label}>
      <BarReportsChartItem
        color={color}
        icon={{color: icon.color, component: icon.component}}
        label={label}
        progress={{content: progress.content, percentage: progress.percentage}}
      />
    </Grid>
  ))

  return (
    <Card>
      <SuiBox padding="1rem">
        {useMemo(
          () => (
            <SuiBox
              backgroundColor={color}
              borderRadius="lg"
              py={2}
              pr={0.5}
              mb={3}
              height="12.5rem"
              backgroundGradient
            >
              <Bar data={data} options={options} />
            </SuiBox>
          ),
          [chart]
        )}
        <SuiBox px={1}>
          <SuiBox mb={2}>
            <SuiTypography variant="h6" textTransform="capitalize">
              {title}
            </SuiTypography>
            <SuiTypography variant="button" textColor="text" fontWeight="regular">
              {description}
            </SuiTypography>
          </SuiBox>
          <SuiBox py={1} px={0.5}>
            <Grid container spacing={2}>
              {renderItems}
            </Grid>
          </SuiBox>
        </SuiBox>
      </SuiBox>
    </Card>
  )
}

// Setting default values for the props of ReportsBarChart
ReportsBarChart.defaultProps = {
  color: 'dark',
  description: '',
  items: []
}

// Typechecking props for the ReportsBarChart
ReportsBarChart.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'dark']),
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
  items: PropTypes.arrayOf(PropTypes.object)
}

export default ReportsBarChart
