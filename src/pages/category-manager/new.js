import React, {useState} from 'react'
import {Checkbox} from '@material-ui/core'

import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'

import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiInput from 'components/SuiInput'
import Flex from 'assets/styled/FlexLayout'

function NewCategory() {
  const [status, setStatus] = useState('close')

  const handleChange = value => setStatus(value)

  return (
    <DashboardLayout>
      <Header />
      <SuiBox mb={3} p={5}>
        <SuiBox mb={4}>
          <SuiTypography fontWeight="medium" variant="h3">
            Name
          </SuiTypography>
          <SuiInput fullWidth placeholder="Name" size="large" />
        </SuiBox>
        <SuiBox mb={4}>
          <SuiTypography fontWeight="medium" variant="h3">
            Status
          </SuiTypography>
          <Flex itemCenter>
            <SuiBox mr={2}>
              <Flex itemCenter>
                <Checkbox
                  color="secondary"
                  checked={status === 'open'}
                  onChange={() => handleChange('open')}
                />
                <SuiTypography fontWeight="regular">Open</SuiTypography>
              </Flex>
            </SuiBox>
            <SuiBox ml={2}>
              <Flex itemCenter>
                <Checkbox
                  color="secondary"
                  checked={status === 'close'}
                  onChange={() => handleChange('close')}
                />
                <SuiTypography fontWeight="regular">Close</SuiTypography>
              </Flex>
            </SuiBox>
          </Flex>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  )
}

export default NewCategory
