import React, {useState} from 'react'
import {Checkbox} from '@material-ui/core'

import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'

import SuiBox from 'components/SuiBox'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'
import SuiTypography from 'components/SuiTypography'
import Flex from 'assets/styled/FlexLayout'
import CoverLayout from 'assets/styled/CoverLayout'

function NewCategory() {
  const [status, setStatus] = useState('close')
  const [subCategory, setSubCategory] = useState('')
  const [subCategories, setSubCategories] = useState(['example1', 'example2'])

  const handleChangeStatus = value => setStatus(value)

  const handleChangeValue = e => setSubCategory(e.target.value)

  const handleBtnAddSubCategory = () => {
    setSubCategories([...subCategories, subCategory])
    setSubCategory('')
  }

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
                  onChange={() => handleChangeStatus('open')}
                />
                <SuiTypography fontWeight="regular">Open</SuiTypography>
              </Flex>
            </SuiBox>
            <SuiBox ml={2}>
              <Flex itemCenter>
                <Checkbox
                  color="secondary"
                  checked={status === 'close'}
                  onChange={() => handleChangeStatus('close')}
                />
                <SuiTypography fontWeight="regular">Close</SuiTypography>
              </Flex>
            </SuiBox>
          </Flex>
        </SuiBox>
        <SuiBox mb={4}>
          <SuiTypography fontWeight="medium" variant="h3">
            Sub category
          </SuiTypography>
          <Flex itemCenter>
            <SuiInput
              fullWidth
              placeholder="Name sub"
              size="large"
              value={subCategory}
              onChange={handleChangeValue}
            />
            <CoverLayout marginLeft="10px">
              <SuiButton buttonColor="info" onClick={handleBtnAddSubCategory}>
                Add
              </SuiButton>
            </CoverLayout>
          </Flex>
          <CoverLayout margin="10px 0 0 20px">
            <ul>
              {subCategories.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CoverLayout>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  )
}

export default NewCategory
