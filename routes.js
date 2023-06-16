const { Router } = require('express');
const { HurufHandler } = require('./handlers/huruf');
const { SuratHandler } = require('./handlers/surat');
const { tesHandler } = require('./handlers/tes')

const { caching } = require('./middlewares');

const router = Router();

router.use((req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate');
  next();
});

router.get('/', (req, res) => res.status(200).send({
  huruf: {
    listHuruf: '/huruf',
    spesifikHuruf: '/huruf/{huruf}',
    AllSurat: '/surat',
    ListSurat:"/listsurat", 
    spesifikSurat: '/surat/{surat}',
    spesifikAyat: '/surat/{surat}/{ayat}',
    testSurat: '/tes'
  },
}));

router.get('/huruf/', caching, HurufHandler.getAllHijaiyah);
router.get('/huruf/:huruf', caching, HurufHandler.getHijaiyah);
router.get('/surat', caching, SuratHandler.getAllSurat);
router.get('/listsurat', caching, SuratHandler.getListSurat);
router.get('/surat/:surat', caching, SuratHandler.getSurat);
router.get('/surat/:surat/:ayat', caching, SuratHandler.getAyat);
router.get('/tes', caching, tesHandler.getAllTes);

module.exports = router;
