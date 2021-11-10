import {combineReducers} from 'redux'
import {ExampleReducer} from './example'
import {UserReducer} from './user'
import {AlertReducer} from './alert'
import {CategoryReducer} from './category'
import {SubCategoryReducer} from './subcategory'
import {ProductReducer} from './product'
import {SearchReducer} from './search'
import {BiddingProductReducer} from './bidding-product'
import {BiddingRecordReducer} from './bidding-record'

const rootReducer = combineReducers({
  exampleSate: ExampleReducer,
  userState: UserReducer,
  alertState: AlertReducer,
  categoryState: CategoryReducer,
  subCategoryState: SubCategoryReducer,
  productState: ProductReducer,
  searchState: SearchReducer,
  biddingProductState: BiddingProductReducer,
  biddingRecordState: BiddingRecordReducer
})

export default rootReducer
