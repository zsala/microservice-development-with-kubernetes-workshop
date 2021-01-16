import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './title';

function createData(id, date, uuid, message) {
    return { id, date, uuid, message };
}

const rows = [
    createData(0, '16 Mar, 2019', '123e4567-e89b-12d3-a456-426614174000', 'Message 1'),
    createData(1, '17 Mar, 2019', '123e4567-e89b-12d3-a456-426614174000', 'Message 1'),
    createData(2, '17 Mar, 2019', '123e4567-e89b-12d3-a456-426614174000', 'Message 1'),
    createData(3, '18 Mar, 2019', '123e4567-e89b-12d3-a456-426614174000', 'Message 1'),
    createData(4, '18 Mar, 2019', '123e4567-e89b-12d3-a456-426614174000', 'Message 1'),
];

export default function SampleBackendData() {
    return (
        <React.Fragment>
            <Title>Sample backend data</Title>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>UUID</TableCell>
                        <TableCell>Message</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.uuid}</TableCell>
                            <TableCell>{row.message}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}
