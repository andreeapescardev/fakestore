import React, {createContext, useContext, useReducer} from 'react';

const initialCartState = {
    items: {},
};

const CartContext = createContext({
    cartState: initialCartState,
    dispatch: (action) => {
    },
});

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const {id} = action.payload;
            const {items} = state;

            return {
                ...state,
                items: {
                    ...items,
                    [id]: {
                        ...action.payload,
                        quantity: !items[id] ? 1 : items[id].quantity + 1
                    }
                }
            }
        }
        case 'REMOVE_FROM_CART': {
            const id = action.payload;
            const {items} = state;

            if (items[id]) {
                delete state.items[id];

                return {...state};
            }

            return state;
        }
        case 'INCREASE_QUANTITY':
            const id = action.payload;
            const {items} = state;

            if (!items[id]) {
                return state;
            }

            return {
                ...state,
                items: {
                    ...items,
                    [id]: {
                        ...items[id],
                        quantity: items[id].quantity + 1
                    }
                }
            }
        case 'DECREASE_QUANTITY': {
            const id = action.payload;
            const {items} = state;

            // don't allow to go beyond 1 item
            if (!items[id] || items[id].quantity <= 1) {
                return state;
            }

            return {
                ...state,
                items: {
                    ...items,
                    [id]: {
                        ...items[id],
                        quantity: items[id].quantity - 1
                    }
                }
            }
        }
        case 'CLEAR_CART':
            // Clear the entire cart
            return {items: {}};

        default:
            return state;
    }
};

// Create a provider component to wrap your app
export const CartProvider = ({children}) => {
    const [cartState, dispatch] = useReducer(cartReducer, initialCartState);
    // Define actions to interact with the cart

    return (
        <CartContext.Provider value={{cartState, dispatch}}>
            {children}
        </CartContext.Provider>
    );
};

// Create a custom hook to access the cart context
export const useCartContext = () => {
    return useContext(CartContext);
};
