import { Grid } from '@mui/material'
import { Item } from './Item'

export const ItemList = ({ items, initial }) => {
    return (
        <>
            {items.map(product => (
                <Grid key={product.id} item>
                    <Item item={product} />
                </Grid>
            ))}
        </>
    )
}
