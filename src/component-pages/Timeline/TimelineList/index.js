import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

import {TimelineProvider} from 'component-pages/Timeline/context'

function TimelineList({title, dark, children}) {
  return (
    <TimelineProvider value={dark}>
      <Card>
        <SuiBox backgroundColor={dark ? 'dark' : 'white'} backgroundGradient={dark}>
          <SuiBox pt={3} px={3}>
            <SuiTypography variant="h6" fontWeight="medium" textColor={dark ? 'white' : 'dark'}>
              {title}
            </SuiTypography>
          </SuiBox>
          <SuiBox p={2}>{children}</SuiBox>
        </SuiBox>
      </Card>
    </TimelineProvider>
  )
}

// Setting default values for the props of TimelineList
TimelineList.defaultProps = {
  dark: false
}

// Typechecking props for the TimelineList
TimelineList.propTypes = {
  title: PropTypes.string.isRequired,
  dark: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default TimelineList
