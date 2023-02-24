import Typography from '@mui/material/Typography'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'
export const NoMatchRoute = () => {
    return (
        <>
            <Typography variant='h1' color='initial'>
                <ReportGmailerrorredIcon sx={{ fontSize: 45 }} /> Error 404
            </Typography>
            <Typography variant='h4' color='initial'>
                Not found.
            </Typography>
        </>
    )
}
