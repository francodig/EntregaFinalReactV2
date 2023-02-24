import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'
import {
    Typography,
    Grid,
    Popover,
    List,
    ListItem,
    ListItemText,
} from '@mui/material'

const links = {
    foods: [
        'Pizzas',
        'Empanadas',
        'Porciones',
        'Calzones',
        'Tartas',
        'Sandwichs',
        'Cocina',
        'Ensaladas',
        'Pastas',
        'Postres',
    ],
    drinks: ['Gaseosas', 'Cervezas', 'Vinos'],
}

const useStyles = makeStyles(theme => ({
    list: {
        padding: theme.spacing(2),
    },
    link: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
        '&:hover': {
            color: theme.palette.secondary.main,
        },
    },
}))

export const Menu = ({ isMenuOpen, anchorEl, onHandleClose }) => {
    const classes = useStyles()
    return (
        <Popover
            open={isMenuOpen}
            anchorEl={anchorEl}
            onClose={onHandleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            elevation={3}
            onClick={onHandleClose}>
            <Grid container>
                <Grid item>
                    <List className={classes.list} dense>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <Typography variant='h6' color='secondary'>
                                        COMIDAS
                                    </Typography>
                                }
                            />
                        </ListItem>
                        {links.foods.map(food => (
                            <Link
                                to={`/category/${food.toLowerCase()}`}
                                className={classes.link}
                                key={food}>
                                <ListItem>
                                    <ListItemText primary={`${food}`} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Grid>
                <Grid item>
                    <List className={classes.list} dense>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <Typography variant='h6' color='secondary'>
                                        BEBIDAS
                                    </Typography>
                                }
                            />
                        </ListItem>
                        {links.drinks.map(drink => (
                            <Link
                                to={`/category/${drink.toLowerCase()}`}
                                className={classes.link}
                                key={drink}>
                                <ListItem>
                                    <ListItemText primary={`${drink}`} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Popover>
    )
}
