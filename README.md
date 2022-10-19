# ToDoApp

タスクの登録・編集・削除ができるアプリケーション

## Features

- タスクの登録・編集・削除
- タスク詳細の編集
- カテゴリーの登録・編集・削除
- タスクの完了・未完了をチェックボックスで管理

## Built With

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/ja/)
- [Node.js](https://nodejs.org/ja/)
- [Prisma](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/jp/)
- [Docker](https://www.docker.com/)

## Getting Started

1.Clone this repository

```bash
$ git clone https://github.com/yuko1113/ToDoApp.git
```

2.Move to the root directory

```bash
$ cd ToDoApp
```

3.Download dependencies

```bash
$ docker-compose run -w /app/next --rm frontend npm install
```

4.Run the App

```bash
$ docker-compose up -d
```

5.Open http://localhost:3000 with your browser to see the App

## Author

yuko1113
