const { v4: uuidv4 } = require('uuid');
const db = require('../data/database');
const QrService = require('../services/qrService');

class PetController {
  static async getAllPets(req, res) {
    const { district, species, search } = req.query;
    let results = [...db.pets];

    // If citizen, only list their pets unless search is performed
    if (req.user && req.user.role === 'citizen' && !search) {
      results = results.filter(p => p.ownerId === req.user.id);
    }

    if (district) {
      results = results.filter(p => p.district.toLowerCase() === district.toLowerCase());
    }

    if (species) {
      results = results.filter(p => p.species.toLowerCase() === species.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.ownerDni.includes(q)
      );
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      pets: results
    });
  }

  static async getPetById(req, res) {
    const { id } = req.params;
    const pet = db.pets.find(p => p.id === id || p.code === id);
    if (!pet) {
      return res.status(404).json({ success: false, message: 'Mascota no encontrada en el padrón.' });
    }

    return res.status(200).json({ success: true, pet });
  }

  static async verifyPetPublic(req, res) {
    const { code } = req.params;
    const pet = db.pets.find(p => p.code.toUpperCase() === code.toUpperCase());
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Código de mascota no registrado en el padrón de Lima Norte.'
      });
    }

    // Public sanitized verification (protecting owner PII)
    return res.status(200).json({
      success: true,
      verification: {
        code: pet.code,
        name: pet.name,
        species: pet.species,
        breed: pet.breed,
        district: pet.district,
        status: pet.status,
        rabiesVaccine: pet.rabiesVaccine,
        sterilized: pet.sterilized,
        emergencyContactPhone: pet.ownerPhone ? `***-***-${pet.ownerPhone.slice(-3)}` : 'Registrado en central municipal',
        verifiedAt: new Date().toISOString()
      }
    });
  }

  static async registerPet(req, res) {
    const { name, species, breed, size, gender, color, birthYear, rabiesVaccine, vaccineDate, sterilized, photoUrl } = req.body;

    if (!name || !species) {
      return res.status(400).json({
        success: false,
        message: 'El nombre y la especie son campos obligatorios.'
      });
    }

    const user = db.users.find(u => u.id === req.user.id) || req.user;
    const district = user.district || 'Los Olivos';

    // Generate district code abbreviation
    const distCodeMap = {
      'Los Olivos': 'LO',
      'Comas': 'COM',
      'San Martín de Porres': 'SMP',
      'Independencia': 'IND'
    };
    const distPrefix = distCodeMap[district] || 'LN';
    const petNum = String(db.pets.length + 1).padStart(3, '0');
    const petCode = `EHN-${distPrefix}-${petNum}`;

    const qrResult = await QrService.generatePetQrCode(petCode);

    const newPet = {
      id: `pet-${uuidv4().substring(0, 8)}`,
      ownerId: req.user.id,
      ownerName: user.name,
      ownerDni: user.dni || 'No especificado',
      ownerPhone: user.phone || 'No especificado',
      code: petCode,
      name,
      species: species.toLowerCase(),
      breed: breed || 'Mestizo',
      size: size || 'mediano',
      gender: gender || 'macho',
      color: color || 'No especificado',
      birthYear: birthYear || new Date().getFullYear(),
      rabiesVaccine: Boolean(rabiesVaccine),
      vaccineDate: vaccineDate || null,
      sterilized: Boolean(sterilized),
      district,
      status: 'activo',
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80',
      qrCodeData: qrResult.verificationUrl,
      qrImage: qrResult.qrDataUrl,
      createdAt: new Date().toISOString()
    };

    db.pets.push(newPet);

    return res.status(201).json({
      success: true,
      message: 'Mascota empadronada exitosamente con carné digital QR generado.',
      pet: newPet
    });
  }
}

module.exports = PetController;
