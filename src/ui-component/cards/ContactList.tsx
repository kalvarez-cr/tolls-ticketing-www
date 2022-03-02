// material-ui
import { makeStyles } from '@material-ui/styles';
import { Theme, useTheme } from '@material-ui/core/styles';
import { Button, Grid, Tooltip, Typography } from '@material-ui/core';

// project imports
import Avatar from '../extended/Avatar';
import { gridSpacing } from 'store/constant';
import { UserProfile } from '_mockApis/user-profile/types';

// assets
import ChatBubbleTwoToneIcon from '@material-ui/icons/ChatBubbleTwoTone';
import PhoneTwoToneIcon from '@material-ui/icons/PhoneTwoTone';

const avatarImage = require.context('assets/images/users', true);

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    followerBlock: {
        padding: '15px 0',
        borderBottom: theme.palette.mode === 'dark' ? 'none' : '1px solid',
        borderTop: theme.palette.mode === 'dark' ? 'none' : '1px solid',
        borderColor: `${theme.palette.grey[100]}!important`
    },
    profileAvatar: {
        width: '48px',
        height: '48px'
    }
}));

// ==============================|| USER CONTACT LIST ||============================== //

export interface ContactListProps extends UserProfile {
    onActive: () => void;
}

const ContactList = ({ avatar, name, role, onActive, email, contact, location }: ContactListProps) => {
    const theme = useTheme();
    const classes = useStyles();
    const avatarProfile = avatar && avatarImage(`./${avatar}`).default;

    return (
        <div className={classes.followerBlock}>
            <Grid container alignItems="center" spacing={gridSpacing}>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    onClick={() => {
                        onActive && onActive();
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    <Grid container alignItems="center" spacing={gridSpacing} sx={{ flexWrap: 'nowrap' }}>
                        <Grid item>
                            <Avatar alt={name} src={avatarProfile} className={classes.profileAvatar} />
                        </Grid>
                        <Grid item sm zeroMinWidth>
                            <Grid container spacing={0}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" component="div">
                                        {name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption">{role}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid
                        container
                        spacing={1}
                        sx={{ justifyContent: 'flex-end', [theme.breakpoints.down('sm')]: { justifyContent: 'flex-start' } }}
                    >
                        <Grid item>
                            <Tooltip placement="top" title="Message">
                                <Button variant="outlined" sx={{ minWidth: '32px', height: '32px', p: 0 }}>
                                    <ChatBubbleTwoToneIcon fontSize="small" />
                                </Button>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip placement="top" title="Call">
                                <Button variant="outlined" color="secondary" sx={{ minWidth: '32px', height: '32px', p: 0 }}>
                                    <PhoneTwoToneIcon fontSize="small" />
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default ContactList;
