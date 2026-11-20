// UIT Reference Value (Peru 2026: S/ 5,150.00)
const UIT_VALUE = 5150.00;

// Municipal Ordinances for Lima Norte
const ORDINANCES = {
  'Los Olivos': {
    code: 'ORD-MDLO-512-2023',
    name: 'Régimen de Tenencia Responsable y Salubridad de Los Olivos',
    fines: {
      no_recojo_heces_primera_vez: { pct: 0.05, label: '5% UIT (Notificación Preventiva / Multa Leve)' },
      no_recojo_heces_reincidencia: { pct: 0.10, label: '10% UIT (Multa Grave por Reincidencia)' },
      orina_en_fachadas_sin_limpieza: { pct: 0.08, label: '8% UIT (Deterioro de Ornato Público)' },
      mascota_suelta_sin_correa: { pct: 0.05, label: '5% UIT (Riesgo a Transeúntes)' },
      mascota_no_empadronada: { pct: 0.04, label: '4% UIT (Omisión de Registro en Padrón)' }
    }
  },
  'Comas': {
    code: 'ORD-MDC-584-2023',
    name: 'Reglamento de Limpieza y Control Canino de Comas',
    fines: {
      no_recojo_heces_primera_vez: { pct: 0.05, label: '5% UIT' },
      no_recojo_heces_reincidencia: { pct: 0.12, label: '12% UIT (Multa Grave)' },
      orina_en_fachadas_sin_limpieza: { pct: 0.07, label: '7% UIT' },
      mascota_suelta_sin_correa: { pct: 0.06, label: '6% UIT' },
      mascota_no_empadronada: { pct: 0.05, label: '5% UIT' }
    }
  },
  'San Martín de Porres': {
    code: 'ORD-MDSMP-498-2023',
    name: 'Ordenanza de Salubridad y Convivencia Vecinal de SMP',
    fines: {
      no_recojo_heces_primera_vez: { pct: 0.05, label: '5% UIT' },
      no_recojo_heces_reincidencia: { pct: 0.10, label: '10% UIT' },
      orina_en_fachadas_sin_limpieza: { pct: 0.08, label: '8% UIT' },
      mascota_suelta_sin_correa: { pct: 0.05, label: '5% UIT' },
      mascota_no_empadronada: { pct: 0.04, label: '4% UIT' }
    }
  },
  'Independencia': {
    code: 'ORD-MDI-312-2024',
    name: 'Marco Sancionador de Higiene Urbana de Independencia',
    fines: {
      no_recojo_heces_primera_vez: { pct: 0.05, label: '5% UIT' },
      no_recojo_heces_reincidencia: { pct: 0.10, label: '10% UIT' },
      orina_en_fachadas_sin_limpieza: { pct: 0.07, label: '7% UIT' },
      mascota_suelta_sin_correa: { pct: 0.05, label: '5% UIT' },
      mascota_no_empadronada: { pct: 0.05, label: '5% UIT' }
    }
  }
};

class FineCalculatorService {
  /**
   * Calculates the municipal fine based on district, infraction type and reincidence
   */
  static calculateFine(district, infractionType, isReincident = false) {
    const districtData = ORDINANCES[district] || ORDINANCES['Los Olivos'];
    
    let key = infractionType;
    if (infractionType === 'no_recojo_heces') {
      key = isReincident ? 'no_recojo_heces_reincidencia' : 'no_recojo_heces_primera_vez';
    }

    const fineConfig = districtData.fines[key] || districtData.fines.no_recojo_heces_primera_vez;
    const fineAmount = parseFloat((fineConfig.pct * UIT_VALUE).toFixed(2));

    return {
      district,
      ordinanceCode: districtData.code,
      ordinanceName: districtData.name,
      infractionType: key,
      isReincident,
      uitPercentage: `${Math.round(fineConfig.pct * 100)}% UIT`,
      uitBaseValue: UIT_VALUE,
      fineAmount,
      isPreventive: !isReincident && fineConfig.pct <= 0.05
    };
  }

  static getDistricts() {
    return Object.keys(ORDINANCES);
  }

  static getOrdinanceByDistrict(district) {
    return ORDINANCES[district] || null;
  }
}

module.exports = FineCalculatorService;
