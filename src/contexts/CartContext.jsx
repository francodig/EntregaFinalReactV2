import { createContext, useState, useContext } from 'react'

const CartContext = createContext([])

export const useCartContext = () => useContext(CartContext)

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [totalCount, setTotalCount] = useState(0)

    const addToCart = data => {
        let previousCart = [...cart]

        if (previousCart.some(i => i.item.id === data.item.id)) {
            previousCart.find(i => i.item.id === data.item.id).quantity +=
                data.quantity
            setCart(previousCart)
        } else {
            setCart([...cart, data])
        }
    }

    const increaseQuantity = product => {
        let previousCart = [...cart]
        let itemQuantity = previousCart.find(
            i => i.item.id === product.item.id
        ).quantity
        if (itemQuantity < product.item.stock) {
            previousCart.find(i => i.item.id === product.item.id).quantity += 1
            setCart(previousCart)
        }
    }

    const decreaseQuantity = product => {
        let previousCart = [...cart]
        let itemQuantity = previousCart.find(
            i => i.item.id === product.item.id
        ).quantity
        if (itemQuantity > 1) {
            previousCart.find(i => i.item.id === product.item.id).quantity -= 1
            setCart(previousCart)
        }
    }

    const deleteItem = product => {
        let previousCart = [...cart]
        setCart(previousCart.filter(i => i.item.id !== product.item.id))
    }

    return (
        <CartContext.Provider
            value={{
                cart: cart,
                totalCount: totalCount,
                setTotalCount,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                deleteItem,
                setCart,
            }}>
            {children}
        </CartContext.Provider>
    )
}
