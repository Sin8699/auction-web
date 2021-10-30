import {Link} from 'react-router-dom'

import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'
import Icon from '@material-ui/core/Icon'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

import colors from 'assets/theme/base/colors'
import typography from 'assets/theme/base/typography'
import SuiInput from 'components/SuiInput'

function ProfileInfoCard({title, description, info, social, action, editing = false}) {
  const labels = []
  const values = []
  const {socialMediaColors} = colors
  const {size} = typography

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach(el => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find(i => i.match(/[A-Z]+/))
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`)

      labels.push(newElement)
    } else {
      labels.push(el)
    }
  })

  // Push the object values into the values array
  Object.values(info).forEach(el => values.push(el))

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <SuiBox key={label} display="flex" alignItems="baseline" py={1} pr={2}>
      <SuiTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </SuiTypography>

      {editing ? (
        <SuiInput
          placeholder={label}
          autoComplete="password"
          label={label}
          defaultValue={values[key]}
        />
      ) : (
        <SuiTypography variant="button" fontWeight="regular" textColor="text">
          &nbsp;{values[key]}
        </SuiTypography>
      )}
    </SuiBox>
  ))

  // Render the card social media icons
  const renderSocial = (social || []).map(({link, icon, color}) => (
    <SuiBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color={socialMediaColors[color].main}
      pr={1}
      pl={0.5}
      mt={-0.1}
    >
      {icon}
    </SuiBox>
  ))

  return (
    <Card className="h-100">
      <SuiBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <SuiTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SuiTypography>
        {action.route ? (
          <SuiTypography component={Link} to={action.route} variant="body2" textColor="secondary">
            <Tooltip title={action.tooltip} placement="top">
              <Icon className="material-icons-round">edit</Icon>
            </Tooltip>
          </SuiTypography>
        ) : (
          <SuiTypography onClick={action.onClick} variant="body2" textColor="secondary">
            <Tooltip title={action.tooltip} placement="top">
              {editing ? (
                <Icon className="material-icons-round">save</Icon>
              ) : (
                <Icon className="material-icons-round">edit</Icon>
              )}
            </Tooltip>
          </SuiTypography>
        )}
      </SuiBox>
      <SuiBox p={2}>
        <SuiBox mb={2} lineHeight={1.5}>
          <SuiTypography variant="button" textColor="text" fontWeight="regular">
            {description}
          </SuiTypography>
        </SuiBox>
        <SuiBox opacity={0.3}>
          <Divider />
        </SuiBox>
        <SuiBox>
          {renderItems}
          {(social || []).length > 0 && (
            <SuiBox display="flex" py={1} pr={2}>
              <SuiTypography variant="button" fontWeight="bold" textTransform="capitalize">
                social: &nbsp;
              </SuiTypography>
              {renderSocial}
            </SuiBox>
          )}
        </SuiBox>
      </SuiBox>
    </Card>
  )
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  social: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }).isRequired,
  editing: PropTypes.bool
}

export default ProfileInfoCard
