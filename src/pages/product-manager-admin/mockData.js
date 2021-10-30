import sample from 'lodash/sample'

export const productData = [...Array(100)].map((_, index) => ({
  id: index,
  name: `name${index}`,
  owner: `owner${index}`,
  status: sample(['SOLD', 'AVAILABLE', 'EXPIRED'])
}))
