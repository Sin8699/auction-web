import {useMemo} from 'react'

import PropTypes from 'prop-types'

import {Doughnut} from 'react-chartjs-2'

import Card from '@material-ui/core/Card'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

import configs from 'component-pages/Charts/DoughnutCharts/DefaultDoughnutChart/configs'

function DefaultDoughnutChart({title, description, height, chart}) {
  const {data, options} = configs(chart.labels, chart.datasets, chart.cutout)

  const renderChart = (
    <SuiBox p={2}>
      {title || description ? (
        <SuiBox px={description ? 1 : 0} pt={description ? 1 : 0}>
          {title && (
            <SuiBox mb={1}>
              <SuiTypography variant="h6">{title}</SuiTypography>
            </SuiBox>
          )}
          <SuiBox mb={2}>
            <SuiTypography variant="button" fontWeight="regular" textColor="text">
              {description}
            </SuiTypography>
          </SuiBox>
        </SuiBox>
      ) : null}
      {useMemo(
        () => (
          <SuiBox height={height}>
            <Doughnut data={data} options={options} />
          </SuiBox>
        ),
        [chart, height]
      )}
    </SuiBox>
  )

  return title || description ? <Card>{renderChart}</Card> : renderChart
}

// Setting default values for the props of DefaultDoughnutChart
DefaultDoughnutChart.defaultProps = {
  title: '',
  description: '',
  height: '19.125rem'
}

// Typechecking props for the DefaultDoughnutChart
DefaultDoughnutChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired
}

export default DefaultDoughnutChart
