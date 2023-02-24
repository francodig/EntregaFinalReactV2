import { useState, useEffect } from 'react'
import { ItemDetail } from './ItemDetail'
import { useParams } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import { getFirestore } from '../../services/getFirebase'

export const ItemDetailContainer = () => {
    const [item, setItem] = useState([])
    const { itemId } = useParams()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const db = getFirestore()
        const itemOne = db.collection('products').doc(itemId)
        itemOne
            .get()
            .then(result => setItem({ id: result.id, ...result.data() }))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }, [itemId, setLoading])

    return (
        <>
            {isLoading ? (
                <Skeleton
                    variant='rectangular'
                    animation='wave'
                    width='100%'
                    height='480px'
                />
            ) : (
                <ItemDetail item={item} initial={1} />
            )}
        </>
    )
}
