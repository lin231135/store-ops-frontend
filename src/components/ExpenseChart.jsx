import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const data = {
    labels: ['Renta', 'Utilidades', 'Comida', 'Transporte', 'Otros'],
    datasets: [
        {
            label: 'Gastos',
            data: [800, 300, 600, 200, 400],
            backgroundColor: 'rgba(255, 99, 132, 0.6)'
        }
    ]
};

const ExpenseChart = () => (
    <Card>
        <Card.Body>
            <Card.Title>Panel de Gastos</Card.Title>
            <Bar data={data} />
        </Card.Body>
    </Card>
);

export default ExpenseChart;