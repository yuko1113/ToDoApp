import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from "axios";
import Link from 'next/link'

// JSONの型定義
import task from "../task.json";
import category from "../category.json";
type Task = typeof task;
type Category = typeof category;

const generateError = (message: string, code: number): never => {
  throw { message: message, errorCode: code };
}

export default function details() {
  const router = useRouter();
  
  const [data, setData] = useState<Task>({
    id: 0,
    title: "",
    content: "",
    categoryId: 0,
    statusId: 0,
  });
  const [categoryName, setCategoryName] = useState<string>("");
  const [updateTitle, setTitle] = useState<string>(data.title);
  const [updateContent, setContent] = useState<string>(data.content);

  // idをもとに情報取得(データまるごとTopページからqueryで渡していたのを変更)
  useEffect(() => {
    axios.get(`http://localhost:3001/tasks/${router.query.id}`)
    .then((res: AxiosResponse<Task>) => {
      setData(res.data)
      setTitle(res.data.title)
      setContent(res.data.content)
    })
    .catch((e: AxiosError<{ error: string }>) => generateError(e.message, 500)) //システム内部エラー
  }, [])
  
  // カテゴリーを番号ではなくテキストで表示
  useEffect(() => {
    axios.get(`http://localhost:3001/categories/${router.query.categoryId}`)
    .then((res: AxiosResponse<Category>) => {
      setCategoryName(res.data.name)
    })
    .catch((e: AxiosError<{ error: string }>) => generateError(e.message, 500)) //システム内部エラー
  }, [])
  
  // 投稿の編集
  const updateData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); //リロードさせない
    axios.patch(`http://localhost:3001/tasks/${router.query.id}`, {
      title: updateTitle,
      content: updateContent,
      categoryId: data.categoryId,
    }).then((res: AxiosResponse<Task>) => console.log('Updating data', res))
    .catch((e: AxiosError<{ error: string }>) => generateError(e.message, 500)) //システム内部エラー
    .finally(() => router.push('/'))
  }

  return (
    <>
      <div>
        <h1>Details</h1>
        <div>id: {data.id}</div>
        <div>title: {data.title}</div>
        <div>content: {data.content}</div>
        <div>category: {categoryName}</div>        
        <br/><br/>
        <hr/>
        <form>
        <label>Title: </label>
        <input type="text" value={updateTitle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}/>
        <hr/>
        <label>Content: </label>
        <input type="text" value={updateContent} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.currentTarget.value)}/>
        <hr/>
        <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => updateData(e)}>UPDATE</button>
      </form>
      <hr/>
      </div>
      <Link href="/">
        Back to TOP
      </Link>
    </>
  );
}