const express = require('express'); 
const { PrismaClient } = require('@prisma/client');
const logger = require('../winston');
const router = express.Router();

const prisma = new PrismaClient()

router.use(express.json())

// カテゴリー取得
router.get('/', async (req, res) => {
    const categories = await prisma.category.findMany()
    res.json(categories);
    logger.info(`Info: GET categories all`);
})

// カテゴリーIDを指定して取得　OK
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const category = await prisma.category.findUnique({
        where: { id: Number(id) },
      })
      res.json(category);
      logger.info(`Info: GET category id:${category.id}`);
    } catch (e) {
      logger.warn(`Warn: id:${id}は存在しません`);
      return res.status(400).json(`id:${id}は存在しません`);      
    }
});

// カテゴリー登録　OK
router.post(`/`, async (req, res) => {
  const { name } = req.body;
  try {
      const result = await prisma.category.create({
        data: {
          name,
        },
      });
      res.json(result)
      logger.info(`Info: POST category id:${result.id}`);
  } catch (e) {
      logger.warn(e);
      return res.status(400).json(e);
  }
});

// カテゴリー更新　OK
router.patch('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  try {
    const category = await prisma.category.update({
      where: {
          id,
      },
      data: {
          name,
      },
    });
    res.json(category);
    logger.info(`Info: PUT category id:${category.id}`);
  } catch (e) {
    logger.warn(e);
    return res.status(400).json(e);
  }
});

// カテゴリー削除 OK
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const check = await prisma.category.findUnique({
    where: { id: Number(id) },
  })
  if (check.Task) {
    throw 'There are some task!';
  }

  try {
    const category = await prisma.category.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    logger.warn(e);
    return res.status(400).json(e);
  }
    res.json(id);
    logger.info(`Info: DELETE category id:${id}`);
});

module.exports = router;