const express = require('express'); 
const { PrismaClient } = require('@prisma/client');
const logger = require('../winston');
const router = express.Router();

const prisma = new PrismaClient()

router.use(express.json())

// 全て取得　OK
router.get('/', async (req, res) => {
    const tasks = await prisma.task.findMany()
    res.json(tasks);
    logger.info(`Info: GET tasks all`);
})


// idが存在するかのチェック（例外処理）未完成。非同期だからかうまくいかない
// async function checkId(id) {
//   const checkTask = await prisma.task.findUnique({
//     where: { id: Number(id) },
//   })

//   if (typeof checkTask !== 'object') {
//       throw `Warn: id:${id}は存在しません`;
//   }
//   return checkTask;
// }

// router.get('/:id', async (req, res) => {
//     let targetTask;
//     const { id } = req.params

//     try {
//       targetTask = await checkId(id);
//     } catch (e) {
//       logger.warn(e);
//     }
    
//     res.json(targetTask);
//     logger.info(`Info: GET task id:${targetTask.id}`);
// });

// IDを指定して取得　OK
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const task = await prisma.task.findUnique({
        where: { id: Number(id) },
      })
      res.json(task);
      logger.info(`Info: GET task id:${task.id}`);
    } catch (e) {
      logger.warn(`Warn: id:${id}は存在しません`);
      return res.status(400).json(`id:${id}は存在しません`);      
    }
});

// タスク登録　OK
router.post(`/`, async (req, res) => {
    const { title, content, categoryId } = req.body;
    try {
        const result = await prisma.task.create({
          data: {
            title,
            content,
            categoryId: Number(categoryId),
            statusId: 2,
          },
        });
        res.json(result)
        logger.info(`Info: POST task id:${result.id}`);
    } catch (e) {
        logger.warn(e);
        return res.status(400).json(e);
    }
});

// タスク更新　OK
router.patch('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { title, content } = req.body;
    try {
      const task = await prisma.task.update({
        where: {
            id,
        },
        data: {
            title,
            content,
        },
      });
      res.json(task);
      logger.info(`Info: PUT task id:${task.id}`);
    } catch (e) {
      logger.warn(e);
      return res.status(400).json(e);
    }
});

// タスクの完了・未完了を変更する（クリックするごとに変わるイメージ）
router.put('/:id/status', async (req, res) => {
  const id = Number(req.params.id);
  const { statusId } = req.body;
  try {
    const task = await prisma.task.update({
      where: {
          id,
      },
      data: {
          statusId,
      },
    });
    res.json(task);
    logger.info(`Info: PUT task id:${task.id}`);
  } catch (e) {
    logger.warn(e);
    return res.status(400).json(e);
  }
});

// タスク削除 OK
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
      const task = await prisma.task.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      logger.warn(e);
      return res.status(400).json(e);
    }
      res.json(id);
      logger.info(`Info: DELETE task id:${id}`);
  });

module.exports = router;
