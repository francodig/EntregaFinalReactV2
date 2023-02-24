import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import {
    Paper,
    Typography,
    Box,
    Button,
    TextField,
    Grid,
    Divider,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { makeStyles } from '@mui/styles'
import { useCartContext } from '../../contexts/CartContext'
import { getFirestore } from '../../services/getFirebase'
import { green } from '@mui/material/colors'
import firebase from 'firebase/app'
import 'firebase/firestore'

const useStyles = makeStyles(() => ({
    root: {
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
        },
    },
}))

export const Purchased = ({ open, orderId, onConfirm, name }) => {
    const history = useHistory()

    const handleOk = () => {
        onConfirm()
        history.push('/')
    }

    return (
        <Dialog maxWidth='sm' fullWidth open={open}>
            <DialogTitle sx={{ bgcolor: green[700] }}>
                <Stack direction='row' alignItems='center' spacing={1}>
                    <CheckCircleOutlineIcon />
                    <Typography variant='h6'>Éxito</Typography>
                </Stack>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 4 }}>
                Gracias por tu compra {name}!
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <ArticleOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary={`Orden Nº ${orderId}`} />
                    </ListItem>
                </List>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={handleOk}
                    disableElevation>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export const CartCheckout = () => {
    const classes = useStyles()
    const [orderId, setOrderId] = useState('')
    const [open, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const { cart, setCart, totalCount, setTotalCount } = useCartContext()
    const history = useHistory()
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
    })

    const onConfirm = () => {
        setOrderId('')
        setCart([])
        setTotalCount(0)
        setFormData({
            name: '',
            phone: '',
            email: '',
        })
    }

    const itemsUpdateStock = () => {
        const db = getFirestore()
        const itemsToUpdate = db.collection('products').where(
            firebase.firestore.FieldPath.documentId(),
            'in',
            cart.map(i => i.item.id)
        )

        const batch = db.batch()

        itemsToUpdate.get().then(collection => {
            collection.docs.forEach(doc => {
                batch.update(doc.ref, {
                    stock:
                        doc.data().stock -
                        cart.find(product => product.item.id === doc.id)
                            .quantity,
                })
            })
            batch.commit().then(result => {
                console.log('Resultado batch: ', result)
            })
        })
    }

    const handleOnSubmit = e => {
        e.preventDefault()
        setLoading(true)
        let newOrder = {
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            total: totalCount,
            buyer: formData,
            products: [],
        }

        cart.forEach(product => {
            newOrder.products.push({
                id: product.item.id,
                title: product.item.title,
                price: product.item.price,
                quantity: product.quantity,
            })
        })

        const db = getFirestore()
        const ordersCollection = db.collection('orders')
        ordersCollection
            .add(newOrder)
            .then(result => {
                itemsUpdateStock()
                setOrderId(result.id)
                setOpen(true)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    const handleOnChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <>
            {cart.length === 0 ? (
                <Redirect to={'/'} />
            ) : (
                <>
                    <Purchased
                        open={open}
                        orderId={orderId}
                        onConfirm={onConfirm}
                        name={formData.name}
                    />
                    <Paper>
                        <Box py={5} px={10}>
                            <Stack
                                direction='row'
                                alignItems='center'
                                sx={{ mb: 2 }}
                                spacing={2}>
                                <FactCheckIcon />
                                <Typography
                                    variant='h5'
                                    sx={{
                                        fontWeight: 500,
                                    }}>
                                    Verificación de datos
                                </Typography>
                            </Stack>
                            <Divider sx={{ mb: 5 }} />
                            <Box
                                component='form'
                                autoComplete='off'
                                onSubmit={handleOnSubmit}
                                onChange={handleOnChange}>
                                <Grid
                                    container
                                    justifyContent='center'
                                    spacing={2}>
                                    <Grid item xs={12} sm={12} md={7}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                            }}>
                                            <PersonIcon
                                                sx={{
                                                    color: 'action.active',
                                                    mr: 1,
                                                    my: 0.5,
                                                }}
                                            />
                                            <TextField
                                                className={classes.root}
                                                fullWidth
                                                label='Nombre completo'
                                                name='name'
                                                variant='standard'
                                                autoFocus
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={7}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                            }}>
                                            <PhoneIcon
                                                sx={{
                                                    color: 'action.active',
                                                    mr: 1,
                                                    my: 0.5,
                                                }}
                                            />
                                            <TextField
                                                className={classes.root}
                                                fullWidth
                                                label='Número de contacto'
                                                name='phone'
                                                variant='standard'
                                                inputProps={{
                                                    inputMode: 'numeric',
                                                    pattern: '[0-9]*',
                                                }}
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={7}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                            }}>
                                            <EmailIcon
                                                sx={{
                                                    color: 'action.active',
                                                    mr: 1,
                                                    my: 0.5,
                                                }}
                                            />
                                            <TextField
                                                className={classes.root}
                                                fullWidth
                                                label='E-mail'
                                                name='email'
                                                variant='standard'
                                                required
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        sx={{ mt: 3, textAlign: 'center' }}>
                                        <Button
                                            onClick={history.goBack}
                                            variant='outlined'
                                            color='secondary'
                                            disableElevation>
                                            Volver al carrito
                                        </Button>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={6}
                                        sx={{ mt: 3, textAlign: 'center' }}>
                                        <LoadingButton
                                            type='submit'
                                            variant='contained'
                                            color='secondary'
                                            loading={isLoading}
                                            disableElevation>
                                            Finalizar compra
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Paper>
                </>
            )}
        </>
    )
}
