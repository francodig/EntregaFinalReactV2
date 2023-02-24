import * as React from 'react'
import { Snackbar, Alert as MuiAlert } from '@mui/material'
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const SnackbarCustom = props => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={4000}
            {...props}>
            <Alert onClose={props.onClose} severity='success'>
                {props.text}
            </Alert>
        </Snackbar>
    )
}
