/**
 * Environment Configuration
 * Production vs Development API URL detection
 */
(function () {
    const isProduction = window.location.hostname !== 'localhost' &&
        window.location.hostname !== '127.0.0.1';

    window.IPS_CONFIG = {
        // Backend API URL - Railway deploy sonrası güncellenecek
        baseUrl: isProduction
            ? 'https://ips-system-production.up.railway.app/api'  // Placeholder - Railway URL
            : 'http://127.0.0.1:8001/api',

        // PDF Generation endpoint
        pdfUrl: isProduction
            ? 'https://ips-system-production.up.railway.app/api/ips/generate-pdf'
            : 'http://localhost:8001/api/ips/generate-pdf',

        // PDF Health check endpoint
        pdfHealthUrl: isProduction
            ? 'https://ips-system-production.up.railway.app/api/ips/pdf-health'
            : 'http://localhost:8001/api/ips/pdf-health',

        timeoutMs: 60000
    };

    console.log('[Config] Environment:', isProduction ? 'PRODUCTION' : 'DEVELOPMENT');
    console.log('[Config] API Base URL:', window.IPS_CONFIG.baseUrl);
})();
