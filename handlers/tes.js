const { data: alquran } = require('../data/tes.json');

class tesHandler {
  static getAllTes(req, res) {
    const data = alquran.map((item) => {
      const juz = { ...item };
      return juz;
    });
    return res.status(200).send({
      code: 200,
      status: 'Sukses',
      error: false,
      message: 'Sukses mengambil juz',
      data,
    });
  }

}

module.exports = { tesHandler };