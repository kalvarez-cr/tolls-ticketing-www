// material-ui
import { makeStyles, withStyles } from '@material-ui/styles';
import { alpha } from '@material-ui/core/styles';
import { Collapse, CollapseProps, Theme } from '@material-ui/core';
import { TreeItem, TreeView, TreeItemProps } from '@material-ui/lab';

// third party
// web.cjs is required for IE11 support
import { animated } from 'react-spring/web.cjs';

// assets
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';
import { axiosRequest } from 'store/axios';

// tree icons
function MinusSquare(props: SvgIconProps) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </SvgIcon>
    );
}

function PlusSquare(props: SvgIconProps) {
    return (
        <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </SvgIcon>
    );
}

function CloseSquare(props: SvgIconProps) {
    return (
        <SvgIcon className="close" fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        </SvgIcon>
    );
}

// animation
function TransitionComponent(props: CollapseProps) {
    return (
        <animated.div>
            <Collapse {...props} />
        </animated.div>
    );
}

// style constant
const StyledTreeItem = withStyles((theme: Theme) => ({
    iconContainer: {
        '& .close': {
            opacity: 0.3
        }
    },
    group: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
    }
}))((props: TreeItemProps) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

const useStyles = makeStyles({
    root: {
        height: 'auto',
        flexGrow: 1,
        maxWidth: 400,
        minHeight: '79.6vh'
    }
});

// ==============================|| UI TREEVIEW - CUSTOMIZED ||============================== //

export default function CustomizedTreeView() {
    const classes = useStyles();
    const [data, setData] = React.useState<any>([])

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosRequest("get", "site/by_state/")
                console.log(data.data)
                setData(data.data)
            } catch (error) {
            }
        }
        fetchData()
    }, [])

    console.log(data)

    return (
        <TreeView
            aria-label="customized"
            className={classes.root}
            defaultExpanded={['1']}
            defaultCollapseIcon={<MinusSquare />}
            defaultExpandIcon={<PlusSquare />}
            defaultEndIcon={<CloseSquare />}
        >
            {
                data.map((state) => (
                    <StyledTreeItem nodeId={state.state} label={state.state}>
                    {
                        state.sites.map((site) => (
                            <StyledTreeItem nodeId={site.name} label={site.name} />
                        ))
                    }
                </StyledTreeItem>
                ))
            }
            
        </TreeView>
    );
}
