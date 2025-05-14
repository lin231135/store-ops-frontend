import { Button, Card } from 'react-bootstrap';

const DownloadReport = () => {
    const handleDownload = () => {
        const content = "Resumen financiero generado automáticamente.";
        const blob = new Blob([content], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'financial_report.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>Descargar Reportes</Card.Title>
                <Button variant="primary" onClick={handleDownload}>
                    Descargar como PDF
                </Button>
            </Card.Body>
        </Card>
    );
};

export default DownloadReport;
