import { ThemeProvider, StyledEngineProvider, CssBaseline } from '@mui/material'
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#242526',
        },
        secondary: {
            main: '#2D88FF',
        },
        text: {
            primary: '#FFF',
        },
    },
    typography: {
        h1: {
            '@media (max-width: 600px)': {
                fontSize: '3rem',
            },
        },
        fontFamily: 'Roboto',
    },
})

export const Theme = ({ children }) => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    )
}
