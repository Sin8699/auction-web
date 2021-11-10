import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import {Select, Card, MenuItem, Grid} from '@material-ui/core'

import SuiBox from 'components/SuiBox'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'
import SuiTypography from 'components/SuiTypography'

import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'
import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'

import ProductJsonApi from 'apis/products/productJson'

import validateData, {TYPE_SCHEMA} from 'utils/validationSchema'
import {openAlert} from 'redux/actions/alert'

import {ROUTER_DEFAULT} from 'constants/router'

const NewProduct = () => {
  const dispatch = useDispatch()
  const navigate = useHistory()
  const {dataCategory} = useSelector(state => state.categoryState)
  const {dataSubCategory} = useSelector(state => state.subCategoryState)

  const [formValue, setFormValue] = useState({})

  const categoryHasSub =
    dataSubCategory.filter(item => item.category === formValue.category).length !== 0

  const handleResult = (data, status, error) => {
    if (error) {
      const infoNotify = {messageAlert: error, typeAlert: 'error'}
      dispatch(openAlert(infoNotify))
    }
    if (status === 200) {
      const infoNotify = {messageAlert: data.message || 'success', typeAlert: 'success'}
      dispatch(openAlert(infoNotify))
      navigate.push(`${ROUTER_DEFAULT.PRODUCT_MANAGER_SELLER_EDIT}/${data._id}`)
    }
    if (status && status !== 200) {
      const infoNotify = {messageAlert: data.message || 'Something wrong', typeAlert: 'error'}
      dispatch(openAlert(infoNotify))
    }
  }

  const handleChangeForm = key => e => {
    setErrors({...errors, [key]: ''})
    if (
      key === 'category' &&
      dataSubCategory.filter(item => item.category === formValue.category).length !== 0
    ) {
      setFormValue({...formValue, [key]: e.target.value, subCategory: ''})
    } else setFormValue({...formValue, [key]: e.target.value})
  }

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const handleSubmit = async () => {
    setLoading(true)
    try {
      await validateData(TYPE_SCHEMA.PRODUCT, formValue, async dataForm => {
        const {data, status, error} = await ProductJsonApi.createDocument({
          name: dataForm.name,
          category: dataForm.category,
          subCategory: dataForm.subCategory
        })
        handleResult(data, status, error)
      })
    } catch (errs) {
      setErrors(errs)
    }
    setLoading(false)
  }

  return (
    <DashboardLayout>
      <Header />
      <SuiBox mb={3}>
        <Card>
          <SuiBox p={5}>
            <SuiBox mb={4}>
              <SuiTypography>Name Product</SuiTypography>
              <SuiInput
                placeholder="Name"
                value={formValue.name || ''}
                onChange={handleChangeForm('name')}
                error={Boolean(errors.name)}
              />
            </SuiBox>
            <SuiBox mb={4}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <SuiTypography>Category</SuiTypography>
                  <Select
                    value={formValue.category || ''}
                    onChange={handleChangeForm('category')}
                    input={<SuiInput error={Boolean(errors.category)} />}
                  >
                    {dataCategory.map(category => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>

                <Grid item xs={6}>
                  <SuiTypography>Sub Category</SuiTypography>
                  <Select
                    value={formValue.subCategory || ''}
                    onChange={handleChangeForm('subCategory')}
                    input={
                      <SuiInput disabled={!categoryHasSub} error={Boolean(errors.subCategory)} />
                    }
                  >
                    {dataSubCategory
                      .filter(item => item.category === formValue.category)
                      .map(category => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))}
                  </Select>
                </Grid>
              </Grid>
            </SuiBox>
            <SuiBox>
              <SuiButton buttonColor="info" fullWidth onClick={handleSubmit} disabled={loading}>
                {loading ? 'send...' : 'Create product'}
              </SuiButton>
              <SuiBox display="flex" justifyContent="center">
                <SuiTypography textTransform="uppercase">and continue step 2</SuiTypography>
              </SuiBox>
            </SuiBox>
          </SuiBox>
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  )
}

export default NewProduct
