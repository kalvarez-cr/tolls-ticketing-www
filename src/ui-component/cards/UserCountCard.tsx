// material-ui
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Theme, Typography } from '@material-ui/core';
import { GenericCardProps } from 'types';

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    revenueCard: {
        position: 'relative',
        color: '#fff'
    },
    revenueIcon: {
        position: 'absolute',
        left: '-17px',
        bottom: '-27px',
        color: '#fff',
        transform: 'rotate(25deg)',
        '&> svg': {
            width: '100px',
            height: '100px',
            opacity: '0.35'
        }
    }
}));

// =============================|| USER NUM CARD ||============================= //

export interface UserCountCardProps {
    primary: string;
    secondary: string;
    iconPrimary: GenericCardProps['iconPrimary'];
    color: string;
}

const UserCountCard = ({ primary, secondary, iconPrimary, color }: UserCountCardProps) => {
    const classes = useStyles();

    const IconPrimary = iconPrimary!;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

    return (
        <Card style={{ background: color }} className={classes.revenueCard}>
            <CardContent>
                <Typography variant="subtitle2" className={classes.revenueIcon}>
                    {primaryIcon}
                </Typography>
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
                    <Grid item sm={12}>
                        <Typography variant="h3" align="center" color="inherit">
                            {secondary}
                        </Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography variant="body1" align="center" color="inherit">
                            {primary}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default UserCountCard;
