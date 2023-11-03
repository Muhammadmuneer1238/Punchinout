var express = require('express');
var router = express.Router();
const {indexedDB,punchinDb,punchoutDb,userInfo,detailPage}=require('../controller/userController')


router.get('/',indexedDB );
router.post('/punchin',punchinDb);
router.post('/punchout',punchoutDb);
router.post('/userinfo',userInfo);
router.get('/detail',detailPage)

   


module.exports = router;
