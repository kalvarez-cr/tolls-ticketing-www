import * as React from 'react';

// material-ui
import { makeStyles } from '@material-ui/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { KeyedObject } from 'types';

// table columns

export interface ColumnProps {
    id: string;
    label: any;
    minWidth: number;
    align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
    format?: (value: Date | number) => string | boolean;
}
const columns: ColumnProps[] = [
    { id: 'name', label: (<div><p>hola</p><p>hola2</p></div>), minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => typeof value === 'number' && value.toFixed(2)
    }
];

// table data

const rows = [
    { name: 'India', code: 'IN', population: 1324171354, size: 3287263, density: 1 },
    { name: 'India', code: 'IN', population: 1324171354, size: 3287263, density: 1 },
    { name: 'India', code: 'IN', population: 1324171354, size: 3287263, density: 1 },
    { name: 'India', code: 'IN', population: 1324171354, size: 3287263, density: 1 },
    { name: 'India', code: 'IN', population: 1324171354, size: 3287263, density: 1 },
    { name: 'India', code: 'IN', population: 1324171354, size: 3287263, density: 1 },
    { name: 'India', code: 'IN', population: 1324171354, size: 3287263, density: 1 },
    { name: 'India', code: 'IN', population: 1324171354, size: 3287263, density: 1 },
    { name: 'India', code: 'IN', population: 1324171354, size: 3287263, density: 1 },
];

// style constant
const useStyles = makeStyles({
    root: {
        width: '100%',
        overflow: 'hidden'
    },
    container: {
        maxHeight: 440
    }
});

// ==============================|| TABLE - STICKY HEADER ||============================== //

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | undefined) => {
        setRowsPerPage(+event?.target?.value!);
        setPage(0);
    };

    return (
        <MainCard
            content={false}
            title="Sticky Header"
            secondary={<SecondaryAction link="https://next.material-ui.com/components/tables/" />}
        >
            {/* table */}
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell sx={{ py: 3 }} key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: KeyedObject) => (
                            <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* table pagination */}
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
}
