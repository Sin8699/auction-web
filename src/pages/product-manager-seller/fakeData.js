const products = [...Array(50)].map((_, index) => ({
  _id: index + 1,
  name: `MacBook Pro ${index + 1}`,
  subCategory: 'Laptop',
  image:
    'https://cdn.tgdd.vn/Products/Images/44/236131/apple-macbook-pro-m1-2020-z11c000cj-600x600.jpg'
}))

export default products
