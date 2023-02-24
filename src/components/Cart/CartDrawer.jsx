import { makeStyles } from '@mui/styles'
import {
    Drawer,
    Divider,
    Typography,
    IconButton,
    Box,
    Avatar,
    Grid,
    Stack,
    Button,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useCartContext } from '../../contexts/CartContext'
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn'
import { BadgeCustom } from '../Customs/BadgeCustom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import CloseIcon from '@mui/icons-material/Close'

const drawerWidth = 375

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}))

export const CartDrawer = ({ handleOpen, cartDrawer }) => {
    const classes = useStyles()
    const { cart, deleteItem } = useCartContext()
    return (
        <Drawer
            className={classes.drawer}
            anchor='right'
            onClose={handleOpen}
            open={cartDrawer}
            classes={{
                paper: classes.drawerPaper,
            }}>
            <div className={classes.drawerContainer}>
                <Stack
                    direction='row'
                    justifyContent='space-around'
                    alignItems='center'
                    py={2}
                    spacing={2}>
                    <ShoppingCartIcon />
                    <Typography variant='h4'>Tu carrito</Typography>
                    <CloseIcon
                        onClick={handleOpen}
                        sx={{ cursor: 'pointer' }}
                    />
                </Stack>
                <Divider />
                <Box p={3}>
                    {cart.length === 0 ? (
                        <>
                            <Typography
                                variant='h6'
                                sx={{
                                    textAlign: 'center',
                                }}>
                                Tu carrito está vacío
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    textAlign: 'center',
                                }}>
                                ¿No sabés qué comprar? ¡Miles de productos te
                                esperan!
                            </Typography>
                        </>
                    ) : (
                        <Stack>
                            {cart.map(product => (
                                <Stack key={product.item.id}>
                                    <Box py={2}>
                                        <Grid container alignItems='center'>
                                            <Grid item xs={3}>
                                                <BadgeCustom
                                                    badgeContent={
                                                        product.quantity
                                                    }
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'right',
                                                    }}>
                                                    <Avatar
                                                        alt={product.item.title}
                                                        src={
                                                            product.item
                                                                .pictureUrl
                                                        }
                                                        sx={{
                                                            width: 64,
                                                            height: 64,
                                                        }}
                                                        variant='rounded'
                                                    />
                                                </BadgeCustom>
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Typography
                                                    variant='subtitle2'
                                                    noWrap
                                                    sx={{
                                                        overflow: 'hidden',
                                                        textOverflow:
                                                            'ellipsis',
                                                        width: '100%',
                                                    }}>
                                                    {product.item.title}
                                                </Typography>
                                                <Typography
                                                    variant='body2'
                                                    noWrap
                                                    sx={{
                                                        overflow: 'hidden',
                                                        textOverflow:
                                                            'ellipsis',
                                                        width: '100%',
                                                    }}>
                                                    {product.item.description}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2} textAlign='right'>
                                                <IconButton
                                                    onClick={() =>
                                                        deleteItem(product)
                                                    }
                                                    aria-label='deleteItem'>
                                                    <DoNotDisturbOnIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Divider py={2} />
                                </Stack>
                            ))}
                            <Box pt={2} sx={{ textAlign: 'right' }}>
                                <Link onClick={handleOpen} to={'/cart'}>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        disableElevation>
                                        Revisar carrito
                                    </Button>
                                </Link>
                            </Box>
                        </Stack>
                    )}
                </Box>
            </div>
        </Drawer>
    )
}
