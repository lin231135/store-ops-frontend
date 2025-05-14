import { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';

const EmailAutomation = () => {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría lógica real de envío a backend o API
        setSent(true);
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>Automatización de Correos</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="ejemplo@correo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button type="submit" variant="success">Activar</Button>
                </Form>
                {sent && <Alert variant="success" className="mt-3">¡Automatización activada correctamente!</Alert>}
            </Card.Body>
        </Card>
    );
};

export default EmailAutomation;
