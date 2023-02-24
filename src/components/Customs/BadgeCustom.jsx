import { Badge } from '@mui/material'
import { withStyles } from '@mui/styles'

const StyledBadge = withStyles(theme => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.primary.main}`,
        padding: '0 4px',
    },
}))(Badge)

export const BadgeCustom = props => {
    const { badgeContent } = props
    return (
        <StyledBadge badgeContent={badgeContent} color='secondary' {...props}>
            {props.children}
        </StyledBadge>
    )
}
