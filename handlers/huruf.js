const { data: hijaiyah } = require('../data/hijaiyah.json');

class HurufHandler {
  static getAllHijaiyah(req, res) {
    const data = hijaiyah.map((item) => {
      const huruf = { ...item };
      return huruf;
    });
    return res.status(200).send({
      code: 200,
      status: 'OK.',
      error: false,
      message: 'Sukses mengambil semua huruf.',
      data,
    });
  }

  static getHijaiyah(req, res) {
    const { huruf } = req.params;
    const data = hijaiyah[huruf - 1];
    if (data) {
      return res.status(200).send({
        code: 200,
        status: 'OK.',
        error: false,
        message: 'Sukses mengambil huruf.',
        data,
      });
    }
    return res.status(404).send({
      code: 404,
      status: 'Not Found.',
      error: true,
      message: `Huruf "${huruf}" tidak ditemukan.`,
      data: {},
    });
  }
}

module.exports = { HurufHandler };
