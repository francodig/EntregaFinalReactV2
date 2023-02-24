import { Box, Typography, Divider } from '@mui/material'
import { Link } from 'react-router-dom'

const Copyright = () => {
    return (
        <Typography variant='body2' color='textPrimary' align='center'>
            <Link to='/'>Restaurant</Link> &reg; {new Date().getFullYear()}
        </Typography>
    )
}

export const Footer = () => {
    return (
        <Box sx={{ marginTop: 'auto' }}>
            <Divider />
            <Box sx={{ bgcolor: 'primary.main', p: 6 }} component='footer'>
                <Typography variant='h6' align='center' gutterBottom>
                    Footer
                </Typography>
                <Copyright />
            </Box>
        </Box>
    )
}
