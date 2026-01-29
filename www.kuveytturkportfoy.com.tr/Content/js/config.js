/**
 * Environment Configuration
 * Production vs Development API URL detection
 */
(function () {
    const isProduction = window.location.hostname !== 'localhost' &&
        window.location.hostname !== '127.0.0.1';

    // Render.com Backend URL
    const RENDER_API_URL = 'https://ips-system-5hwh.onrender.com/api';

    window.IPS_CONFIG = {
        // Backend API URL
        baseUrl: isProduction
            ? RENDER_API_URL
            : 'http://127.0.0.1:8001/api',

        // PDF Generation endpoint
        pdfUrl: isProduction
            ? RENDER_API_URL + '/ips/generate-pdf'
            : 'http://localhost:8001/api/ips/generate-pdf',

        // PDF Health check endpoint
        pdfHealthUrl: isProduction
            ? RENDER_API_URL + '/ips/pdf-health'
            : 'http://localhost:8001/api/ips/pdf-health',

        timeoutMs: 60000
    };

    console.log('[Config] Environment:', isProduction ? 'PRODUCTION' : 'DEVELOPMENT');
    console.log('[Config] API Base URL:', window.IPS_CONFIG.baseUrl);
})();
