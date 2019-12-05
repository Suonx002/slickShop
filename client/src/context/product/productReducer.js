import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_PRODUCT,
  FILTER_PRODUCT,
  CLEAR_FILTER,
  PRODUCT_ERROR,
  GET_ONE_PRODUCT,
  GET_PRODUCTS,
  CLEAR_PRODUCTS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ONE_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
        loading: false
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product =>
          product._id === action.payload._id ? action.payload : product
        ),
        loading: false
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product._id !== action.payload
        ),
        loading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_PRODUCT:
      return {
        ...state,
        filtered: state.products.filter(product => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return product.title.match(regex) || product.description.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_PRODUCTS:
      return {
        ...state,
        product: null,
        products: null,
        filtered: null,
        error: null,
        current: null
      };

    default:
      return state;
  }
};
