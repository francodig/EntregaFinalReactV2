import { useState } from 'react'
import { makeStyles } from '@mui/styles'
import {
    Paper,
    Box,
    CardMedia,
    Typography,
    Grid,
    InputBase,
    IconButton,
    Button,
    Breadcrumbs,
} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { useCartContext } from '../../contexts/CartContext'
import { Link } from 'react-router-dom'
import { Capitalize } from '../../utils/Helpers'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { grey } from '@mui/material/colors'
import { SnackbarCustom } from '../Customs/SnackbarCustom'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 500,
    },
    media: {
        height: 350,
        borderRadius: theme.spacing(1),
    },
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
    typography: {
        fontWeight: 600,
    },
}))

export const ItemDetail = ({ item, initial }) => {
    const classes = useStyles()
    const [quantity, setQuantity] = useState(initial)
    const [availableStock, setAvailableStock] = useState(item.stock)
    const [isAddedToCart, setAddedToCart] = useState(false)
    const { addToCart } = useCartContext()
    const [notification, setNotification] = useState({ open: false, text: '' })

    const onAdd = () => {
        addToCart({ item: item, quantity: quantity })
        setAddedToCart(true)
        setAvailableStock(availableStock - quantity)
        setQuantity(initial)
        setNotification({
            open: true,
            text: `Se ${quantity > 1 ? 'han' : 'ha'} agregado ${quantity} ${
                quantity === 1 ? 'un/a' : ''
            } ${
                quantity === 1
                    ? item.category.substring(0, item.category.length - 1)
                    : item.category
            } de ${item.title} al carrito.`,
        })
    }

    const increaseQuantity = () => {
        if (quantity < availableStock) setQuantity(quantity + 1)
    }

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1)
    }

    const closeNotification = (event, reason) => {
        if (reason === 'clickaway') return

        setNotification(prevState => ({
            ...prevState,
            open: false,
            text: '',
        }))
    }

    return (
        <>
            <SnackbarCustom
                onClose={closeNotification}
                open={notification.open}
                text={notification.text}
            />
            <Paper>
                <Box p={2} bgcolor='primary.main'>
                    <Breadcrumbs
                        aria-label='breadcrumb'
                        separator={
                            <KeyboardArrowRightIcon
                                fontSize='small'
                                sx={{ color: grey[500] }}
                            />
                        }
                        sx={{ fontSize: 13 }}>
                        <Link to='/'>Home</Link>
                        <Link to={`/category/${item.category}`}>
                            {Capitalize(item.category)}
                        </Link>
                        <Typography sx={{ fontSize: 13 }}>
                            {Capitalize(item.title)}
                        </Typography>
                    </Breadcrumbs>
                </Box>
                <Box p={5}>
                    <Grid container justifyContent='center' spacing={5}>
                        <Grid item xs={12} sm={9}>
                            <CardMedia
                                component='img'
                                className={classes.media}
                                image={item.pictureUrl}
                                title={item.title}
                            />
                        </Grid>
                        <Grid
                            container
                            item
                            direction='column'
                            spacing={2}
                            xs={12}
                            sm={3}>
                            <Grid item>
                                <Typography
                                    variant='h5'
                                    className={classes.typography}>
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant='caption'
                                    className={classes.typography}>
                                    {item.description}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant='h4'
                                    className={classes.typography}>
                                    ${item.price}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant='subtitle2'
                                    className={classes.typography}>
                                    {availableStock === 0
                                        ? 'Sin stock'
                                        : 'Stock disponible'}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                container
                                alignItems='center'
                                spacing={2}>
                                <Grid item xs={12}>
                                    <Paper
                                        className={classes.paper}
                                        elevation={0}
                                        variant='outlined'>
                                        <IconButton
                                            onClick={decreaseQuantity}
                                            className={classes.iconButton}
                                            aria-label='decrease'
                                            disabled={
                                                availableStock === 0 ||
                                                quantity === 1
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
                                                availableStock === 0
                                                    ? 'Sin stock'
                                                    : quantity
                                            }
                                            readOnly
                                        />
                                        <IconButton
                                            onClick={increaseQuantity}
                                            className={classes.iconButton}
                                            aria-label='increase'
                                            disabled={
                                                availableStock === 0 ||
                                                quantity === availableStock
                                            }
                                            size='large'>
                                            <AddIcon />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        disableElevation
                                        onClick={onAdd}
                                        disabled={availableStock === 0}
                                        fullWidth>
                                        Agregar al carrito
                                    </Button>
                                </Grid>
                                {isAddedToCart && (
                                    <Grid item xs={12}>
                                        <Link to={'/cart'}>
                                            <Button
                                                variant='outlined'
                                                color='secondary'
                                                disableElevation
                                                fullWidth>
                                                Finalizar compra
                                            </Button>
                                        </Link>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </>
    )
}
