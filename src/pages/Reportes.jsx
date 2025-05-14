import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import ExpenseChart from '../components/ExpenseChart';
import IncomeChart from '../components/IncomeChart';
import FinancialSummary from '../components/FinancialSummary';

const Reportes = () => {
    return (
        <Container fluid className="p-4">
            <Header />
            <Row className="mb-4">
                <Col md={4}><BalanceCard /></Col>
                <Col md={8}><FinancialSummary /></Col>
            </Row>
            <Row className="mb-4">
                <Col md={6}><IncomeChart /></Col>
                <Col md={6}><ExpenseChart /></Col>
            </Row>
        </Container>
    );
};

export default Reportes;