import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import { Layout } from './layout/Layout'
import { Theme } from './theme/Theme'
import { ItemListContainer } from './components/Products/ItemListContainer'
import { ItemDetailContainer } from './components/Products/ItemDetailContainer'
import { Cart } from './components/Cart/Cart'
import { CartCheckout } from './components/Cart/CartCheckout'
import { NoMatchRoute } from './pages/NoMatchRoutePage/NoMatchRoute'
import { CartContextProvider } from './contexts/CartContext'

function App() {
    return (
        <CartContextProvider>
            <Router>
                <Theme>
                    <Layout>
                        <Container>
                            <Box sx={{ py: 4 }}>
                                <Switch>
                                    <Route
                                        exact
                                        path='/'
                                        component={ItemListContainer}
                                    />
                                    <Route
                                        exact
                                        path='/category/:category'
                                        component={ItemListContainer}
                                    />
                                    <Route
                                        exact
                                        path='/item/:itemId'
                                        component={ItemDetailContainer}
                                    />
                                    <Route
                                        exact
                                        path='/cart'
                                        component={Cart}
                                    />
                                    <Route
                                        exact
                                        path='/cart/checkout'
                                        component={CartCheckout}
                                    />
                                    <Route path='*'>
                                        <NoMatchRoute />
                                    </Route>
                                </Switch>
                            </Box>
                        </Container>
                    </Layout>
                </Theme>
            </Router>
        </CartContextProvider>
    )
}

export default App
