export const dateUtils = {
    // Formatear fecha a string legible
    formatDate: (date) => {
        if (!date) return '';
        return new Date(date).toLocaleDateString('es-GT', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    // Calcular días hasta la expiración
    getDaysUntilExpiration: (expirationDate) => {
        if (!expirationDate) return null;
        const today = new Date();
        const expDate = new Date(expirationDate);
        const diffTime = expDate.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },

    // Determinar estado de expiración
    getExpirationStatus: (expirationDate, warningDays = 7) => {
        if (!expirationDate) return 'no-expiry';

        const daysUntil = dateUtils.getDaysUntilExpiration(expirationDate);

        if (daysUntil < 0) return 'expired';
        if (daysUntil === 0) return 'expires-today';
        if (daysUntil <= warningDays) return 'expires-soon';
        return 'fresh';
    },

    // Obtener clase CSS según estado
    getExpirationBadgeClass: (expirationDate, warningDays = 7) => {
        const status = dateUtils.getExpirationStatus(expirationDate, warningDays);
        switch (status) {
            case 'expired': return 'bg-danger';
            case 'expires-today': return 'bg-danger';
            case 'expires-soon': return 'bg-warning';
            case 'fresh': return 'bg-success';
            default: return 'bg-secondary';
        }
    },

    // Obtener texto del estado
    getExpirationText: (expirationDate, warningDays = 7) => {
        const status = dateUtils.getExpirationStatus(expirationDate, warningDays);
        const days = dateUtils.getDaysUntilExpiration(expirationDate);

        switch (status) {
            case 'expired': return `Vencido (${Math.abs(days)} días)`;
            case 'expires-today': return 'Vence hoy';
            case 'expires-soon': return `Vence en ${days} días`;
            case 'fresh': return `${days} días restantes`;
            default: return 'Sin fecha';
        }
    },

    // Validar si una fecha es válida
    isValidDate: (dateString) => {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    },

    // Obtener fecha en formato YYYY-MM-DD para inputs
    toInputDate: (date) => {
        if (!date) return '';
        return new Date(date).toISOString().split('T')[0];
    }
};