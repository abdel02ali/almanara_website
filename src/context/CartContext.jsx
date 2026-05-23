import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        item => item.id === action.payload.id
      )
      if (existingIndex > -1) {
        const newItems = [...state.items]
        newItems[existingIndex].quantity += action.payload.quantity || 1
        return { ...state, items: newItems }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }]
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'LOAD_CART':
      return { ...state, items: action.payload }
    default:
      return state
  }
}

const initialState = {
  items: []
}

const getStoredCartItems = () => {
  try {
    const savedCart = localStorage.getItem('manara-cart')
    if (!savedCart) return []

    const parsedCart = JSON.parse(savedCart)
    if (Array.isArray(parsedCart)) return parsedCart
  } catch (err) {
    console.warn('Ignoring corrupted cart storage', err)
  }

  try {
    localStorage.removeItem('manara-cart')
  } catch (removeErr) {
    console.warn('Unable to clear corrupted cart storage', removeErr)
  }
  return []
}

const initCartState = () => ({
  items: getStoredCartItems()
})

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, initCartState)

  useEffect(() => {
    try {
      localStorage.setItem('manara-cart', JSON.stringify(state.items))
    } catch (err) {
      console.warn('Unable to persist cart storage', err)
    }
  }, [state.items])

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item })
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id })
  const updateQuantity = (id, quantity) => 
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const total = state.items.reduce(
    (sum, item) => sum + (Number.parseFloat(item.price) || 0) * item.quantity, 0
  )
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      items: state.items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}



