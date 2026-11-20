const QRCode = require('qrcode');

class QrService {
  /**
   * Generates a Data URL QR Code for a pet's public verification link
   * @param {string} petCode - Unique pet identification code (e.g. EHN-LO-001)
   * @param {string} baseUrl - Base URL of the app
   * @returns {Promise<string>} Base64 Data URL of the QR code
   */
  static async generatePetQrCode(petCode, baseUrl = 'https://ecohuellitas.limanorte.pe') {
    if (!petCode) {
      throw new Error('El código de la mascota es obligatorio para generar el QR.');
    }
    const verificationUrl = `${baseUrl}/verify/${encodeURIComponent(petCode)}`;
    try {
      const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        margin: 2,
        color: {
          dark: '#1b4332',
          light: '#ffffff'
        }
      });
      return {
        verificationUrl,
        qrDataUrl
      };
    } catch (error) {
      throw new Error(`Fallo en la generación de código QR: ${error.message}`);
    }
  }
}

module.exports = QrService;
