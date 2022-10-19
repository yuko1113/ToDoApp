import { useState, useEffect } from 'react';
import Link from "next/link";
import axios, { AxiosResponse, AxiosError } from "axios";
import { SiAddthis } from 'react-icons/si';
import { FaTrash } from 'react-icons/fa';

// JSONの型定義
import category from "./category.json";
type Category = typeof category;

const generateError = (message: string, code: number): never => {
  throw { message: message, errorCode: code };
}

export default function categoryManagement() {
 
  const [categoryArr, setCategoryArr] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [postCategory, setPostCategory] = useState<string>("");

  // 全てのカテゴリー名を取得
  // Category nameの取得 OK
  useEffect(() => {
    axios.get('http://localhost:3001/categories')
    .then((res: AxiosResponse<Category[]>) => {
      setCategoryArr(res.data);
    })
    .catch((e: AxiosError<{ error: string }>) => generateError(e.message, 500)) //システム内部エラー
  }, [])
  
  // 新規カテゴリー登録　OK
  const postData = () => {
      axios.post('http://localhost:3001/categories', {
          name: postCategory,
        }).then((res: AxiosResponse<Category>) => console.log('Posting data', res))
        .catch((e: AxiosError<{ error: string }>) => generateError(e.message, 500)) //システム内部エラー
        window.location.reload();        
    }

  // 投稿削除　OK
  const postDelete = (id: Category["id"]) => {
    axios.delete(`http://localhost:3001/categories/${id}`)
    .then((res: AxiosResponse<number>) => {
      console.log('Deleted data', res);
    })
    .catch((e: AxiosError<{ error: string }>) => generateError(e.message, 500)) //システム内部エラー
    window.location.reload();
  }
    
    // // カテゴリーの編集
    // const updateData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: Category["id"]) => {
    //     // e.preventDefault(); //リロードさせない
    //     axios.patch(`http://localhost:3001/categories/${id}`, {
    //         name: categoryName,
    //     }).then((res: AxiosResponse<Category>) => console.log('Updating data', res))
    //     .catch((e: AxiosError<{ error: string }>) => generateError(e.message, 500)) //システム内部エラー
    //     // .finally(() => router.push('/'))
    // }
    
    // Categoryの一覧表示
    const categoriesList = categoryArr.map((category: Category) => {
      return (
        <span key={category.id}>
        {category.name}
        <button onClick={() => postDelete(category.id)}>  <FaTrash /></button>
        <hr/>
        </span>
      )
    });  
  
  return (
    <>
      <div>
        <h1>Categories List</h1>

        <br/><br/>
        <hr/>
        <label>Add Category: </label>
        <input type="text" value={postCategory} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPostCategory(e.currentTarget.value)}/>
        <button onClick={postData}>  <SiAddthis /></button>
        <hr/>
        {categoriesList}
      </div>
      <Link href="/">
        Back to TOP
      </Link>
    </>
  );
}


{/* <input 
type="text" value={categoryName} key={category.id}
onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategoryName(e.currentTarget.value)
}
/>
<button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => updateData(e, category.id)}>UPDATE</button> */}