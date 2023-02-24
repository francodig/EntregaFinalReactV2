import { Link } from 'react-router-dom'
import {
    Card,
    Typography,
    CardMedia,
    CardContent,
    CardActionArea,
} from '@mui/material'

export const Item = ({ item }) => {
    return (
        <Card sx={{ minWidth: 250, maxWidth: 250 }}>
            <CardActionArea component={Link} to={`/item/${item.id}`}>
                <CardMedia
                    image={item.pictureUrl}
                    title={item.title}
                    sx={{ height: 200 }}
                />
                <CardContent>
                    <Typography
                        align='center'
                        variant='h6'
                        sx={{ fontWeight: 600 }}
                        noWrap>
                        {item.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
