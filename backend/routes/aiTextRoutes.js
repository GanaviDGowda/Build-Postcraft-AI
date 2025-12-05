// backend/routes/aiTextRoutes.js
const router = require("express").Router();
const ctrl = require("../controllers/aiTextController");

router.post("/caption", ctrl.caption);
router.post("/cta", ctrl.cta);
router.post("/copy", ctrl.copy);
router.post("/hooks", ctrl.hooks);
router.post("/script", ctrl.script);
router.post("/calendar", ctrl.calendar);
router.post("/strategy", ctrl.strategy);
router.post("/brief", ctrl.brief);
router.post("/palette", ctrl.palette);
router.post("/persona", ctrl.persona);
router.post("/abtest", ctrl.abtest);

module.exports = router;

