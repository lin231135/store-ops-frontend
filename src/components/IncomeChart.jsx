import { Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const data = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
    datasets: [
        {
            label: 'Ingresos',
            data: [4000, 4500, 4700, 4900, 5000],
            borderColor: 'green',
            tension: 0.4
        }
    ]
};

const IncomeChart = () => (
    <Card>
        <Card.Body>
            <Card.Title>Ingresos Mensuales</Card.Title>
            <Line data={data} />
        </Card.Body>
    </Card>
);

export default IncomeChart;