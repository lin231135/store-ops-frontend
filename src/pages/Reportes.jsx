import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import FinancialSummary from '../components/FinancialSummary';

const Reportes = () => {
    return (
        <Container fluid className="p-4">
            <Header />
            <Row className="mb-4">
                <Col md={4}><BalanceCard /></Col>
                <Col md={8}><FinancialSummary /></Col>
            </Row>
        </Container>
    );
};

export default Reportes;