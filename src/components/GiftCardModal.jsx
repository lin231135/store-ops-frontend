import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const GiftCardModal = ({ show, onClose, subtotal, onApplyGift }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [applyAmount, setApplyAmount] = useState('');
    const [cardData, setCardData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateGiftCard = async () => {
        if (!cardNumber.trim()) {
            setError('Por favor ingrese el número de tarjeta de regalo');
            return;
        }

        setLoading(true);
        setError('');

        // Simulate API call to validate gift card
        setTimeout(() => {
            // Mock validation - replace with your actual API call
            const mockCards = {
                'GC12345': { balance: 75.50, status: 'active' },
                'GC67890': { balance: 25.00, status: 'active' },
                'GC11111': { balance: 0.00, status: 'empty' },
                'GC99999': { balance: 150.75, status: 'active' },
                'TEST123': { balance: 100.00, status: 'active' }
            };

            const card = mockCards[cardNumber.toUpperCase()];

            if (card) {
                setCardData({
                    number: cardNumber.toUpperCase(),
                    balance: card.balance,
                    status: card.status
                });
                // Set apply amount to the lesser of card balance or subtotal
                const maxApply = Math.min(card.balance, subtotal);
                setApplyAmount(maxApply.toString());
            } else {
                setError('Número de tarjeta de regalo inválido');
                setCardData(null);
            }

            setLoading(false);
        }, 1500);
    };

    const handleApply = () => {
        if (!cardData) return;

        const amount = parseFloat(applyAmount);
        if (amount <= 0 || amount > cardData.balance || amount > subtotal) {
            setError('Monto inválido para aplicar');
            return;
        }

        // Call the parent callback with the applied amount
        onApplyGift(amount);

        // Reset and close modal
        resetForm();
        onClose();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (!cardData) {
                validateGiftCard();
            } else {
                handleApply();
            }
        }
    };

    const resetForm = () => {
        setCardNumber('');
        setApplyAmount('');
        setCardData(null);
        setError('');
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-md">
                <div className="modal-content">
                    <div className="modal-header bg-success text-white">
                        <h5 className="modal-title">
                            <i className="bi bi-gift me-2"></i>
                            Validación de Tarjeta de Regalo
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={handleClose}
                        ></button>
                    </div>

                    <div className="modal-body">
                        {/* Transaction Info */}
                        <div className="alert alert-info mb-3">
                            <div className="d-flex justify-content-between">
                                <span>Total de la compra:</span>
                                <span className="fw-bold">${subtotal.toFixed(2)}</span>
                            </div>
                        </div>

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                <i className="bi bi-exclamation-triangle me-2"></i>
                                {error}
                            </div>
                        )}

                        <div className="mb-3">
                            <label htmlFor="cardNumber" className="form-label fw-bold">
                                Número de Tarjeta de Regalo
                            </label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    id="cardNumber"
                                    className="form-control form-control-lg"
                                    placeholder="Ingrese el número de tarjeta"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value.toUpperCase())}
                                    onKeyPress={handleKeyPress}
                                    disabled={loading}
                                    autoFocus
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={validateGiftCard}
                                    disabled={loading || !cardNumber.trim()}
                                >
                                    {loading ? (
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                    ) : (
                                        <i className="bi bi-search me-2"></i>
                                    )}
                                    Validar
                                </button>
                            </div>
                            <small className="text-muted">
                                Tarjetas de prueba: GC12345, GC67890, TEST123
                            </small>
                        </div>

                        {cardData && (
                            <div className="card border-success mb-3">
                                <div className="card-header bg-light">
                                    <h6 className="mb-0 text-success">
                                        <i className="bi bi-check-circle me-2"></i>
                                        Tarjeta Encontrada
                                    </h6>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-6">
                                            <small className="text-muted">Número de Tarjeta</small>
                                            <div className="fw-bold">{cardData.number}</div>
                                        </div>
                                        <div className="col-6">
                                            <small className="text-muted">Saldo Disponible</small>
                                            <div className="fw-bold text-success fs-5">
                                                ${cardData.balance.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>

                                    {cardData.status === 'empty' && (
                                        <div className="alert alert-warning mt-3 mb-0">
                                            <i className="bi bi-exclamation-triangle me-2"></i>
                                            Esta tarjeta de regalo no tiene saldo disponible.
                                        </div>
                                    )}

                                    {cardData.balance > 0 && (
                                        <div className="mt-3">
                                            <label htmlFor="applyAmount" className="form-label">
                                                Monto a Aplicar
                                            </label>
                                            <div className="input-group">
                                                <span className="input-group-text">$</span>
                                                <input
                                                    type="number"
                                                    id="applyAmount"
                                                    className="form-control"
                                                    placeholder="0.00"
                                                    value={applyAmount}
                                                    onChange={(e) => setApplyAmount(e.target.value)}
                                                    onKeyPress={handleKeyPress}
                                                    min="0"
                                                    max={Math.min(cardData.balance, subtotal)}
                                                    step="0.01"
                                                />
                                            </div>
                                            <small className="text-muted">
                                                Máximo: ${Math.min(cardData.balance, subtotal).toFixed(2)}
                                                {cardData.balance > subtotal && " (limitado por el total de compra)"}
                                            </small>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={resetForm}
                        >
                            <i className="bi bi-arrow-clockwise me-2"></i>
                            Limpiar
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={handleClose}
                        >
                            Cancelar
                        </button>
                        {cardData && cardData.balance > 0 && (
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={handleApply}
                                disabled={!applyAmount || parseFloat(applyAmount) <= 0 || parseFloat(applyAmount) > Math.min(cardData.balance, subtotal)}
                            >
                                <i className="bi bi-check-lg me-2"></i>
                                Aplicar ${parseFloat(applyAmount || 0).toFixed(2)}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftCardModal;