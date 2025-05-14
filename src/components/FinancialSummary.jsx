import { Card, ListGroup } from 'react-bootstrap';

const FinancialSummary = () => (
    <Card>
        <Card.Body>
            <Card.Title>Resumen Financiero</Card.Title>
            <ListGroup variant="flush">
                <ListGroup.Item>Ingresos Mensuales: Q.5,000.00</ListGroup.Item>
                <ListGroup.Item>Gastos Mensuales: Q:2,300.00</ListGroup.Item>
                <ListGroup.Item>Ahorros: Q.2,700.00</ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
);

export default FinancialSummary;