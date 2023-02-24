import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { BadgeCustom } from '../Customs/BadgeCustom'

export const CartWidget = ({ quantity, handleClick }) => {
    return (
        <IconButton onClick={handleClick} aria-label='cart' size='large'>
            <BadgeCustom badgeContent={quantity}>
                <ShoppingCartIcon />
            </BadgeCustom>
        </IconButton>
    )
}
