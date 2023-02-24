import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Stack,
    Container,
    Avatar,
    Divider,
} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import RestaurantLogo from '../../assets/images/logo.png'
import { CartWidget } from '../../components/Cart/CartWidget'
import { CartDrawer } from '../../components/Cart/CartDrawer'
import { Menu } from './Menu'
import { useCartContext } from '../../contexts/CartContext'

export const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [cartDrawer, setCartDrawer] = useState(false)
    const isMenuOpen = Boolean(anchorEl)
    const { cart, totalCount, setTotalCount } = useCartContext()

    const handleOpen = () => {
        setCartDrawer(!cartDrawer)
    }

    const handleClick = event => {
        setAnchorEl(anchorEl ? null : event.currentTarget)
    }

    const onHandleClose = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        let totalQuantity = 0
        cart?.forEach(i => (totalQuantity += i.quantity))
        setTotalCount(totalQuantity)
    }, [cart, setTotalCount])

    return (
        <AppBar
            position='static'
            elevation={0}
            color='primary'
            enableColorOnDark>
            <Container>
                <Toolbar>
                    <Link to='/'>
                        <Avatar alt='Restaurant' src={RestaurantLogo} />
                    </Link>
                    <Box flexGrow='1' sx={{ marginLeft: 2 }}>
                        <Typography variant='h6'>Restaurant</Typography>
                    </Box>
                    <Stack direction='row' alignItems='center' spacing={3}>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Button
                                color='inherit'
                                onClick={handleClick}
                                endIcon={<ArrowDropDownIcon />}>
                                Carta digital
                            </Button>
                        </Box>
                        <Menu
                            isMenuOpen={isMenuOpen}
                            anchorEl={anchorEl}
                            onHandleClose={onHandleClose}
                        />
                        <CartWidget
                            quantity={totalCount}
                            handleClick={() => setCartDrawer(!cartDrawer)}
                        />
                    </Stack>
                </Toolbar>
            </Container>
            <CartDrawer handleOpen={handleOpen} cartDrawer={cartDrawer} />
            <Divider />
        </AppBar>
    )
}
