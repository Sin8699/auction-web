/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import get from 'lodash/get'

import {Select, Card, MenuItem, Grid} from '@material-ui/core'

import SuiBox from 'components/SuiBox'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'
import SuiTypography from 'components/SuiTypography'

import Header from 'component-pages/Header'
import Footer from 'component-pages/Footer'
import DashboardLayout from 'component-pages/LayoutContainers/DashboardLayout'

import {ImageLayout} from 'assets/styled/ImageLayout'

import {requestProduct} from 'redux/actions/product'

import validateData, {TYPE_SCHEMA} from 'utils/validationSchema'
import {openAlert} from 'redux/actions/alert'

import ProductJsonApi from 'apis/products/productJson'
import ProductImageApi from 'apis/products/productImage'
import ProductDescApi from 'apis/products/productDesc'

const EditProduct = () => {
  const dispatch = useDispatch()
  const {id} = useParams()

  const {dataCategory} = useSelector(state => state.categoryState)
  const {dataSubCategory} = useSelector(state => state.subCategoryState)

  const {product} = useSelector(state => state.productState)

  useEffect(() => {
    dispatch(requestProduct(id))
  }, [id])

  const [formValue, setFormValue] = useState({})
  const [errors, setErrors] = useState({})

  const [imagePreview, setImagePreview] = useState({
    primary: '',
    extra1: '',
    extra2: '',
    extra3: ''
  })

  useEffect(() => {
    if (product.name) {
      setFormValue({
        category: get(product, 'category._id'),
        name: product.name,
        subCategory: get(product, 'subCategory._id')
      })
      setImagePreview({
        primary: product.imageUrl ? `http://${product.imageUrl}` : '',
        extra1: product.extraImages[0] ? `http://${product.extraImages[0]}` : '',
        extra2: product.extraImages[1] ? `http://${product.extraImages[1]}` : '',
        extra3: product.extraImages[2] ? `http://${product.extraImages[2]}` : ''
      })
    }
  }, [product])

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
    }
    if (status && status !== 200) {
      const infoNotify = {messageAlert: data.message || 'Something wrong', typeAlert: 'error'}
      dispatch(openAlert(infoNotify))
    }
  }

  const handleChangeForm = key => e => {
    if (
      key === 'category' &&
      dataSubCategory.filter(item => item.category === formValue.category).length !== 0
    ) {
      setFormValue({...formValue, [key]: e.target.value, subCategory: ''})
    } else setFormValue({...formValue, [key]: e.target.value})
  }

  const [description, setDescription] = useState('')
  const handleChangeDescription = e => setDescription(e.target.value)
  const [loadingUpdateDescription, setLoadingUpdateDescription] = useState(false)
  const handleSubmitDescription = async () => {
    setLoadingUpdateDescription(true)
    const {data, status, error} = await ProductDescApi.createDocument({
      rawDescription: description,
      product: product._id
    })
    handleResult(data, status, error)
    if (status === 200) setDescription('')
    setLoadingUpdateDescription(false)
  }

  const handleUpLoadImage = key => e => {
    if (!e.target.files) return
    if (!e.target.files[0]) return

    const reader = new FileReader()
    reader.onloadend = () => setImagePreview({...imagePreview, [key]: reader.result})
    reader.readAsDataURL(e.target.files[0])

    setFormValue({...formValue, [key]: e.target.files[0]})
  }

  const [loadingUpdateInfo, setLoadingUpdateInfo] = useState(false)
  const handleUpdateInfo = async () => {
    setLoadingUpdateInfo(true)
    try {
      await validateData(TYPE_SCHEMA.PRODUCT, formValue, async dataForm => {
        const {data, status, error} = await ProductJsonApi.updateDocument(
          {
            name: dataForm.name,
            category: dataForm.category,
            subCategory: dataForm.subCategory
          },
          id
        )
        handleResult(data, status, error)
      })
    } catch (errs) {
      setErrors(errs)
    }
    setLoadingUpdateInfo(false)
  }

  const [loadingUpdateImagePrimary, setLoadingUpdateImagePrimary] = useState(false)
  const handleUpdateImagePrimary = async () => {
    setLoadingUpdateImagePrimary(true)
    let formData = new FormData()
    formData.append('productId', id)
    formData.append('image', formValue.primary)
    const {data, status, error} = await ProductImageApi.updateImagePrimary(formData)
    handleResult(data, status, error)
    setLoadingUpdateImagePrimary(false)
  }

  const [loadingUpdateImageExtra, setLoadingUpdateImageExtra] = useState(false)
  const handleUpdateImageExtra = async () => {
    setLoadingUpdateImageExtra(true)
    let formData = new FormData()
    formData.append('productId', String(id))
    formData.append('images', formValue.extra1)
    formData.append('images', formValue.extra2)
    formData.append('images', formValue.extra3)
    const {data, status, error} = await ProductImageApi.updateImageExtra(formData)
    handleResult(data, status, error)
    setLoadingUpdateImageExtra(false)
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
                {dataCategory.length !== 0 && (
                  <Grid item xs={6}>
                    <SuiTypography>Sub Category</SuiTypography>
                    <Select
                      value={formValue.subCategory || ''}
                      onChange={handleChangeForm('subCategory')}
                      input={
                        <SuiInput error={Boolean(errors.subCategory)} disabled={!categoryHasSub} />
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
                )}
              </Grid>
            </SuiBox>
            <SuiBox>
              <SuiButton
                buttonColor="info"
                fullWidth
                disabled={loadingUpdateInfo}
                onClick={handleUpdateInfo}
              >
                {loadingUpdateInfo ? 'loading' : 'Save'}
              </SuiButton>
            </SuiBox>
          </SuiBox>
        </Card>

        <Card style={{marginTop: 20}}>
          <SuiBox p={5}>
            <SuiBox mb={4}>
              <SuiTypography>Description</SuiTypography>
              <SuiInput
                placeholder="Description"
                multiline
                maxRows={5}
                minRows={5}
                value={description}
                onChange={handleChangeDescription}
              />
            </SuiBox>
            <SuiBox>
              <SuiButton
                buttonColor="info"
                fullWidth
                disabled={loadingUpdateDescription}
                onClick={handleSubmitDescription}
              >
                {loadingUpdateDescription ? 'loading' : 'Save'}
              </SuiButton>
            </SuiBox>
          </SuiBox>
        </Card>

        <Card style={{marginTop: 20}}>
          <SuiBox p={5}>
            <SuiBox mb={4}>
              <SuiTypography>Primary Image</SuiTypography>
              <SuiInput type="file" accept="image/*" onChange={handleUpLoadImage('primary')} />
              {imagePreview.primary && (
                <ImageLayout src={imagePreview.primary} alt="primary-image" />
              )}
            </SuiBox>

            <SuiBox>
              <SuiButton
                buttonColor="info"
                fullWidth
                onClick={handleUpdateImagePrimary}
                disabled={loadingUpdateImagePrimary}
              >
                {loadingUpdateImagePrimary ? 'loading' : 'Save'}
              </SuiButton>
            </SuiBox>
          </SuiBox>
        </Card>

        <Card style={{marginTop: 20}}>
          <SuiBox p={5}>
            <SuiBox mb={4}>
              <SuiTypography>Extra Image</SuiTypography>
              <Grid container spacing={1}>
                <Grid item lg={4} md={4} sm={12}>
                  <SuiInput type="file" onChange={handleUpLoadImage('extra1')} />
                  {imagePreview.extra1 && (
                    <ImageLayout src={imagePreview.extra1} alt="primary-extra1" />
                  )}
                </Grid>
                <Grid item lg={4} md={4} sm={12}>
                  <SuiInput type="file" onChange={handleUpLoadImage('extra2')} />
                  {imagePreview.extra2 && (
                    <ImageLayout src={imagePreview.extra2} alt="primary-extra2" />
                  )}
                </Grid>
                <Grid item lg={4} md={4} sm={12}>
                  <SuiInput type="file" onChange={handleUpLoadImage('extra3')} />
                  {imagePreview.extra3 && (
                    <ImageLayout src={imagePreview.extra3} alt="primary-extra3" />
                  )}
                </Grid>
              </Grid>
            </SuiBox>
            <SuiBox>
              <SuiButton
                buttonColor="info"
                fullWidth
                onClick={handleUpdateImageExtra}
                disabled={loadingUpdateImageExtra}
              >
                {loadingUpdateImageExtra ? 'loading' : 'Save'}
              </SuiButton>
            </SuiBox>
          </SuiBox>
        </Card>
      </SuiBox>
      <Footer />
    </DashboardLayout>
  )
}

export default EditProduct
