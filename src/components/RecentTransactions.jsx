import { Card, Table } from 'react-bootstrap';

const RecentTransactions = () => (
    <Card>
        <Card.Body>
            <Card.Title>Transacciones Recientes</Card.Title>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Descripción</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2025-05-10</td>
                        <td>Abarrotería</td>
                        <td>- Q.120.00</td>
                    </tr>
                    <tr>
                        <td>2025-05-09</td>
                        <td>Salario</td>
                        <td>Q.2,000.00</td>
                    </tr>
                    <tr>
                        <td>2025-05-08</td>
                        <td>Gas</td>
                        <td>- Q.50.00</td>
                    </tr>
                </tbody>
            </Table>
        </Card.Body>
    </Card>
);

export default RecentTransactions;