const { data: alquran } = require('../data/alquran.json');

class SuratHandler {
  static getAllSurat(req, res) {
    const data = alquran.map((item) => {
      const surat = { ...item };
      return surat;
    });
    return res.status(200).send({
      code: 200,
      status: 'OK',
      error: false,
      message: 'Sukses mengambil semua surat',
      data,
    });
  }

  static getListSurat(req, res) {
    const data = alquran.map((item) => {
      const surat = { ...item };
      delete surat.verses
      return surat;
    });
    return res.status(200).send({
      code: 200,
      status: 'OK',
      error: false,
      message: 'Sukses mengambil semua surat',
      data,
    });
  }

  static getSurat(req, res) {
    const { surat } = req.params;
    const data = alquran[surat - 1];
    if (data) {
      return res.status(200).send({
        code: 200,
        status: 'OK',
        error: false,
        message: 'Sukses mengambil surat',
        data,
      });
    }
    return res.status(404).send({
      code: 404,
      status: 'Gagal',
      error: true,
      message: `Surat "${surat}" tidak ditemukan`,
      data: {},
    });
  }

  static getAyat(req, res) {
    const { surat, ayat } = req.params;
    const cekSurat = alquran[surat - 1];
    if (!cekSurat) {
      return res.status(404).send({
        code: 404,
        status: 'Gagal',
        error: true,
        message: `Surat "${surat}" tidak ditemukan`,
        data: {},
      });
    }
    const cekAyat = cekSurat.verses[ayat - 1];
    if (!cekAyat) {
      return res.status(404).send({
        code: 404,
        status: 'Gagal',
        error: true,
        message: `Ayat "${ayat}" is tidak ditemukan`,
        data: {},
      });
    }

    const dataSurat = { ...cekSurat };
    // delete dataSurat.verses;
    const data = { ...cekAyat, surat: dataSurat };
    return res.status(200).send({
      code: 200,
      status: 'Sukses',
      message: 'Sukses',
      data,
    });
  }
}

module.exports = { SuratHandler };
