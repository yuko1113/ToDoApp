import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ステータス登録
// async function main() {
//   const status1 = await prisma.status.upsert({
//     where: { id: 1 },
//     update: {},
//     create: {
//       name: "completed",
//     },
//   });

//   const status2 = await prisma.status.upsert({
//     where: { id: 2 },
//     update: {},
//     create: {
//       name: "not completed",
//     },
//   });
//   console.log({ status1, status2 });
// }

// カテゴリー登録
// async function main() {
//   const category1 = await prisma.category.upsert({
//     where: { id: 1 },
//     update: {},
//     create: {
//       name: "housework",
//     },
//   });

//   const category2 = await prisma.category.upsert({
//     where: { id: 2 },
//     update: {},
//     create: {
//       name: "work",
//     },
//   });

//   const category3 = await prisma.category.upsert({
//     where: { id: 3 },
//     update: {},
//     create: {
//       name: "hobby",
//     },
//   });

//   console.log({ category1, category2, category3 });
// }

// タスク登録
async function main() {
    const task1 = await prisma.task.upsert({
      where: { id: 1 },
      update: {},
      create: {
        title: "買い物に行く",
        content: "なす、たまご",
        categoryId: 1,
        statusId: 1
      },
    });
  
    const task2 = await prisma.task.upsert({
      where: { id: 2 },
      update: {},
      create: {
        title: "ミーティング出席",
        content: "15時ZOOM開始",
        categoryId: 2,
        statusId: 2
      },
    });
  
    const task3 = await prisma.task.upsert({
      where: { id: 3 },
      update: {},
      create: {
        title: "映画を観る",
        content: "19時映画館",
        categoryId: 3,
        statusId: 2
      },
    });
  
    console.log({ task1, task2, task3 });
  }

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });