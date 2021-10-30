import React, {useState} from 'react'
import {Menu, MenuItem} from '@szhsin/react-menu'
import Edit from '@material-ui/icons/Edit'

import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'
import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'

import SuiBox from 'components/SuiBox'
import SuiButton from 'components/SuiButton'
import SuiTypography from 'components/SuiTypography'
import SuiInput from 'components/SuiInput'
import Flex from 'assets/styled/FlexLayout'
import dayjs from 'dayjs'

function EditUser() {
  const [role, setRole] = useState()
  const [status, setStatus] = useState()

  return (
    <DashboardLayout>
      <Header />
      <SuiBox mb={3} p={5}>
        <SuiBox mb={4}>
          <SuiTypography fontWeight="medium" variant="h3">
            Username
          </SuiTypography>
          <SuiInput fullWidth disabled={true} size="large" value={'username'} />
        </SuiBox>
        <SuiBox mb={4}>
          <SuiTypography fontWeight="medium" variant="h3">
            Date of birth
          </SuiTypography>
          <SuiInput fullWidth disabled size="large" value={dayjs().format('DD/MM/YYYY')} />
        </SuiBox>
        <SuiBox mb={4}>
          <SuiTypography fontWeight="medium" variant="h3">
            Email
          </SuiTypography>
          <SuiInput fullWidth disabled size="large" value={'email'} />
        </SuiBox>
        <SuiBox mb={4}>
          <SuiTypography fontWeight="medium" variant="h3">
            Full name
          </SuiTypography>
          <SuiInput fullWidth disabled size="large" value={'full name'} />
        </SuiBox>
        <SuiBox mb={4}>
          <SuiTypography fontWeight="medium" variant="h3">
            Status
          </SuiTypography>
          <Flex itemCenter>
            <SuiTypography style={{marginRight: 30}} fontWeight="regular">
              {status}
            </SuiTypography>
            <Menu
              menuButton={
                <SuiButton variant="text" buttonColor="secondary" endIcon={<Edit />}>
                  Edit
                </SuiButton>
              }
            >
              <MenuItem onClick={() => setStatus('VERIFIED')}>Verified</MenuItem>
              <MenuItem onClick={() => setStatus('NOT_VERIFIED')}>Not verify</MenuItem>
              <MenuItem onClick={() => setStatus('DISABLED')}>Disable</MenuItem>
            </Menu>
          </Flex>
        </SuiBox>
        <SuiBox mb={4}>
          <SuiTypography fontWeight="medium" variant="h3">
            Role
          </SuiTypography>
          <Flex itemCenter>
            <SuiTypography style={{marginRight: 30}} fontWeight="regular">
              {role}
            </SuiTypography>
            <Menu
              menuButton={
                <SuiButton variant="text" buttonColor="secondary" endIcon={<Edit />}>
                  Edit
                </SuiButton>
              }
            >
              <MenuItem onClick={() => setRole('ADMIN')}>Admin</MenuItem>
              <MenuItem onClick={() => setRole('SELLER')}>Seller</MenuItem>
              <MenuItem onClick={() => setRole('BIDDER')}>Bidder</MenuItem>
            </Menu>
          </Flex>
        </SuiBox>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  )
}

export default EditUser
