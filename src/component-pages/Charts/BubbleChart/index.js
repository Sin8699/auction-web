import {useMemo} from 'react'

import PropTypes from 'prop-types'

import {Bubble} from 'react-chartjs-2'

import Card from '@material-ui/core/Card'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

import configs from 'component-pages/Charts/BubbleChart/configs'

import colors from 'assets/theme/base/colors'

function BubbleChart({title, description, height, chart}) {
  const chartDatasets = chart.datasets.map(dataset => ({
    ...dataset,
    tension: 0.4,
    borderWidth: 3,
    pointRadius: 2,
    pointBackgroundColor: colors[dataset.color].main,
    borderColor: colors[dataset.color].main,
    maxBarThickness: 6
  }))

  const {data, options} = configs(chart.labels, chartDatasets)

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
            <Bubble data={data} options={options} />
          </SuiBox>
        ),
        [chart, height]
      )}
    </SuiBox>
  )

  return title || description ? <Card>{renderChart}</Card> : renderChart
}

// Setting default values for the props of BubbleChart
BubbleChart.defaultProps = {
  title: '',
  description: '',
  height: '100%'
}

// Typechecking props for the BubbleChart
BubbleChart.propTypes = {
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.array).isRequired
}

export default BubbleChart
