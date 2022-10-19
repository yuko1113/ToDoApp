const express = require('express'); 
const { PrismaClient } = require('@prisma/client');
const logger = require('../winston');
const router = express.Router();

const prisma = new PrismaClient()

router.use(express.json())

// カテゴリー取得
// router.get('/', async (req, res) => {
//     const categories = await prisma.category.findMany()
//     res.json(categories);
//     logger.info(`Info: GET categories all`);
// })

module.exports = router;