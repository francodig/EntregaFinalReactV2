import { Box } from '@mui/material'
import { Footer } from './Footer/Footer'
import { Header } from './Header/Header'

export const Layout = ({ children }) => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            style={{ minHeight: '100vh' }}>
            <Header />
            {children}
            <Footer />
        </Box>
    )
}
