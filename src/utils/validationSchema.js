import * as Yup from 'yup'
import { get, set, forEach } from 'lodash'

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Email invalid').required('Email is required'),
  password: Yup.string().required('Password is required')
})

export const TYPE_SCHEMA = {
  LOGIN: 'loginSchema'
}

const schema = { loginSchema }

const validateData = (validateChoose, formValue, callback) => {
  return new Promise((resolve, reject) => {
    schema[validateChoose]
      .validate(formValue, { abortEarly: false })
      .then(() => {
        callback && callback(formValue)
        resolve()
      })
      .catch((err) => {
        const listError = get(err, 'inner')
        let errors = {}
        forEach(listError, (error) => {
          set(errors, error.path, get(error, 'errors[0]'))
        })
        reject(errors)
      })
  })
}

export default validateData
