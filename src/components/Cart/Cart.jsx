import { useState, useEffect } from 'react'
import { useCartContext } from '../../contexts/CartContext'
import {
    Paper,
    Typography,
    Box,
    Avatar,
    Grid,
    IconButton,
    InputBase,
    Divider,
    Button,
    Stack,
} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconButton: {
        padding: theme.spacing(1),
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
}))

export const Cart = () => {
    const classes = useStyles()
    const [totalPrice, setTotalPrice] = useState(0)
    const { cart, totalCount, increaseQuantity, decreaseQuantity, deleteItem } =
        useCartContext()

    useEffect(() => {
        let total = 0
        cart.forEach(i => (total += i.quantity * i.item.price))
        setTotalPrice(total)
    }, [cart])

    return (
        <>
            <Paper>
                <Box pt={5} px={10}>
                    <Stack
                        direction='row'
                        alignItems='center'
                        sx={{ mb: 2 }}
                        spacing={2}>
                        <ShoppingCartIcon />
                        <Typography
                            variant='h5'
                            sx={{
                                fontWeight: 500,
                            }}>
                            Carrito ({totalCount})
                        </Typography>
                    </Stack>
                    <Divider sx={{ mb: 5 }} />
                    {cart.length === 0 ? (
                        <Box pb={4}>
                            <Typography
                                variant='h5'
                                sx={{
                                    textAlign: 'center',
                                }}>
                                Tu carrito está vacío
                            </Typography>
                            <Typography
                                variant='body1'
                                sx={{
                                    textAlign: 'center',
                                }}>
                                ¿No sabés qué comprar? ¡Miles de productos te
                                esperan!
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            {cart.map(product => (
                                <Box py={2} key={product.item.id}>
                                    <Grid
                                        container
                                        alignItems='center'
                                        columnSpacing={5}>
                                        <Grid item xs={2} sm={1}>
                                            <Link
                                                to={`/item/${product.item.id}`}>
                                                <Avatar
                                                    alt={product.item.title}
                                                    src={
                                                        product.item.pictureUrl
                                                    }
                                                    sx={{
                                                        width: 64,
                                                        height: 64,
                                                    }}
                                                    variant='rounded'
                                                />
                                            </Link>
                                        </Grid>
                                        <Grid item xs={10} sm={6}>
                                            <Typography variant='h6'>
                                                {product.item.title}
                                            </Typography>
                                            <Typography
                                                variant='body1'
                                                noWrap
                                                sx={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    width: '100%',
                                                }}>
                                                {product.item.description}
                                            </Typography>
                                            <Button
                                                variant='text'
                                                color='secondary'
                                                size='small'
                                                startIcon={
                                                    <DeleteOutlineIcon />
                                                }
                                                onClick={() =>
                                                    deleteItem(product)
                                                }>
                                                Eliminar
                                            </Button>
                                        </Grid>
                                        <Grid
                                            container
                                            item
                                            xs={12}
                                            sm={2}
                                            justifyContent='center'>
                                            <Paper
                                                className={classes.paper}
                                                elevation={0}
                                                variant='outlined'>
                                                <IconButton
                                                    onClick={() =>
                                                        decreaseQuantity(
                                                            product
                                                        )
                                                    }
                                                    className={
                                                        classes.iconButton
                                                    }
                                                    aria-label='decrease'
                                                    disabled={
                                                        product.item.stock ===
                                                            0 ||
                                                        product.quantity === 1
                                                    }
                                                    size='large'>
                                                    <RemoveIcon />
                                                </IconButton>
                                                <InputBase
                                                    inputProps={{
                                                        style: {
                                                            textAlign: 'center',
                                                        },
                                                    }}
                                                    value={
                                                        product.item.stock === 0
                                                            ? 'Sin stock'
                                                            : product.quantity
                                                    }
                                                    readOnly
                                                />
                                                <IconButton
                                                    onClick={() =>
                                                        increaseQuantity(
                                                            product
                                                        )
                                                    }
                                                    className={
                                                        classes.iconButton
                                                    }
                                                    aria-label='increase'
                                                    disabled={
                                                        product.item.stock <=
                                                            0 ||
                                                        product.quantity ===
                                                            product.item.stock
                                                    }
                                                    size='large'>
                                                    <AddIcon />
                                                </IconButton>
                                            </Paper>
                                            <Typography
                                                variant='caption'
                                                sx={{ pt: 1 }}>
                                                {`${product.item.stock} disponibles`}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Typography
                                                variant='h5'
                                                align='right'>
                                                $
                                                {product.item.price *
                                                    product.quantity}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    {cart.length > 0 && (
                                        <Divider sx={{ py: 2 }} />
                                    )}
                                </Box>
                            ))}
                            {cart.length > 0 && (
                                <Stack>
                                    <Box py={4}>
                                        <Typography variant='h5' align='right'>
                                            Total ${totalPrice}
                                        </Typography>
                                    </Box>
                                    <Divider sx={{ py: 1 }} />
                                    <Box py={4} textAlign='right'>
                                        <Link to='/cart/checkout'>
                                            <Button
                                                variant='contained'
                                                color='secondary'
                                                disableElevation>
                                                Verificar datos
                                            </Button>
                                        </Link>
                                    </Box>
                                </Stack>
                            )}
                        </>
                    )}
                </Box>
            </Paper>
        </>
    )
}
