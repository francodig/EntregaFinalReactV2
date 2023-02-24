import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ItemList } from './ItemList'
import { Grid, Box, Typography, Skeleton, Divider } from '@mui/material'
import { Capitalize } from '../../utils/Helpers'
import { getFirestore } from '../../services/getFirebase'

export const ItemListContainer = () => {
    const [items, setItems] = useState([])
    const { category } = useParams()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const db = getFirestore()
        const itemCollection = db.collection('products')
        const query = category
            ? itemCollection.where('category', '==', category)
            : itemCollection

        query
            .get()
            .then(result =>
                setItems(result.docs.map(i => ({ id: i.id, ...i.data() })))
            )
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [category, setLoading])

    return (
        <>
            {isLoading ? (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Skeleton
                            animation='wave'
                            width='250px'
                            height='10px'
                        />
                    </Box>
                    <Divider sx={{ my: 4 }} />
                    <Grid justifyContent='center' container spacing={5}>
                        {Array.from(Array(12).keys()).map(s => (
                            <Grid key={s} item>
                                <Skeleton
                                    animation='wave'
                                    variant='rectangular'
                                    width='250px'
                                    height='250px'
                                />
                                <Box
                                    my={2}
                                    display='flex'
                                    justifyContent='center'>
                                    <Skeleton
                                        animation='wave'
                                        width='200px'
                                        height='10px'
                                    />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </>
            ) : (
                <>
                    <Typography
                        align='center'
                        variant='h1'
                        sx={{ fontWeight: 600 }}>
                        {Capitalize(category ? category : 'productos')}
                    </Typography>
                    <Divider sx={{ my: 4 }} />
                    <Grid justifyContent='center' container spacing={5}>
                        <ItemList items={items} />
                    </Grid>
                </>
            )}
        </>
    )
}
