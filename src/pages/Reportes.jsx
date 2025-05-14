import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import BalanceCard from '../components/BalanceCard';
import ExpenseChart from '../components/ExpenseChart';
import IncomeChart from '../components/IncomeChart';
import RecentTransactions from '../components/RecentTransactions';
import FinancialSummary from '../components/FinancialSummary';
import DownloadReport from '../components/DownloadReport';

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
            <Row className="mb-4">
                <Col md={6}><DownloadReport /></Col>
            </Row>
            <Row>
                <Col><RecentTransactions /></Col>
            </Row>
        </Container>
    );
};

export default Reportes;