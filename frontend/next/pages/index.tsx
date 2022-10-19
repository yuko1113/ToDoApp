import { useState, useEffect } from 'react';
import NextLink from "next/link";
import axios, { AxiosResponse, AxiosError } from "axios";
import { SiAddthis } from 'react-icons/si';
import { FaTrash } from 'react-icons/fa';

// JSONの型定義
import task from "./task.json";
import category from "./category.json";
type Task = typeof task;
type Category = typeof category;

// errorを発生させてコードをクラッシュさせることをnever型で明示
const generateError = (message: string, code: number): never => {
  throw { message: message, errorCode: code };
}

export default function index() {
  const [data, setData] = useState<Task[]>([]);
  const [postTitle, setTitle] = useState<string>("");
  const [postContent, setContent] = useState<string>("");
  const [postCategoryId, setCategoryId] = useState<string>("");
  const [categoryArr, setCategoryArr] = useState<Category[]>([]);

  // レンダリング全件表示　OK
  useEffect(() => {
      axios.get('http://localhost:3001/tasks')
      .then((res: AxiosResponse<Task[]>) => {
        setData(res.data)
      })
      .catch((e: AxiosError<{ error: string }>) => generateError(e.message, 500)) //システム内部エラー
  }, [])

  // Categoryの取得 OK
  useEffect(() => {
    axios.get('http://localhost:3001/categories')
    .then((res: AxiosResponse<Category[]>) => {
      setCategoryArr(res.data);
    })
    .catch((e: AxiosError<{ error: string }>) => generateError(e.message, 500)) //システム内部エラー
  }, [])  

  
  // 新規投稿　OK
  const postData = () => {
    axios.post('http://localhost:3001/tasks', {
      title: postTitle,
      content: postContent,
      categoryId: postCategoryId,
    }).then((res: AxiosResponse<Task>) => console.log('Posting data', res))
    .catch((e: AxiosError<{ error: string }>) => generateError(e.message, 500)) //システム内部エラー
  }

  // 投稿削除　OK
  const postDelete = (id: Task["id"]) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
    .then((res: AxiosResponse<number>) => {
      console.log('Deleted data', res);
    })
    .catch((e: AxiosError<{ error: string }>) => generateError(e.message, 500)) //システム内部エラー
    window.location.reload();
  }

  // 完了・未完了の変更　OK
  const handleCheckbox = (task: Task) => {
    const newStatusId = task.statusId === 1 ? 2 : 1;
    axios.put(`http://localhost:3001/tasks/${task.id}/status`, {
      statusId : newStatusId,
    }).then((res: AxiosResponse<Task[]>) => console.log('Updating data', res))
    .catch((e: AxiosError<{ error: string }>) => generateError(e.message, 500)) //システム内部エラー
  }

  // TODOリストの作成
  const listArr = data.map((task: Task) => {

    return (
      <span key={task.id}>
      <label>
        <input
          defaultChecked={task.statusId === 1 ? true : false}
          type="checkbox"
          onChange={() => handleCheckbox(task)}
        />
      </label>      
      <NextLink 
        as={`./tasks/${task.id}`}
        href={{ pathname: `./tasks/[id]`, query: { id: task.id, categoryId: task.categoryId } }}
      >
          <a>{task.title}</a>
      </NextLink>
      <button onClick={() => postDelete(task.id)}>  <FaTrash /></button>
      <br/>
      <br/>
      </span>
      )
  })

  // Categoryの選択リスト作成
  const categorySelect = categoryArr.map((category: Category) => {
    return (
      <option value={category.id} key={category.id}>{category.name}</option>
    )
  })

  // 新規投稿フォーム
  return (
    <>
      <h1>To Do List</h1>
      <form>
        <label>  Title: </label>
        <input type="text" value={postTitle} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}/>
        <label>  Content: </label>
        <input type="text" value={postContent} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.currentTarget.value)}/>
        <label>  Category: </label>
        <select value={postCategoryId} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryId(e.currentTarget.value)}>
          <option value="999">Please Select</option>
          {categorySelect}
        </select>
        <button onClick={postData}>  <SiAddthis /></button>
      </form>
      <hr/>
      {listArr}
      <hr/>
      <NextLink href="/category">
        Categories List
      </NextLink>
    </>
  );
}