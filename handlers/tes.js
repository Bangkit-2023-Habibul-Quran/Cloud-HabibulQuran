const { data: alquran } = require('../data/tes.json');

class tesHandler {
    static getAllTes(req, res) {
      const data = alquran.map((item) => {
        const tes = { ...item };
        return tes;
      });
      return res.status(200).send({
        code: 200,
        status: 'Sukses',
        error: false,
        message: 'Sukses mengambil juz',
        data,
      });
    }

    static getListTes(req, res) {
        const data = alquran.map((item) => {
          const tes = { ...item };
          delete tes.verses;
          return tes;
        });
        return res.status(200).send({
          code: 200,
          status: 'Sukses',
          error: false,
          message: 'Sukses mengambil list tes',
          data,
        });
      }
}

module.exports = { tesHandler };