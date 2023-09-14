"use client"
import Image from 'next/image'
import { useAuth } from './context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useFetchTodos from './hooks/requestTodos'
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { db } from '../../firebase'
import { doc, setDoc, deleteField } from 'firebase/firestore'
import TodoItem from './components/todoitem'
import Loading from './components/loading'
import EmptyScreen from './components/empty'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const { todos, setTodos, error } = useFetchTodos()
  const router = useRouter()

  interface Inputs {
    todoInput: string
  }

  interface Todos {
    [key: string]: any;
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    criteriaMode: "all",
  })

  const { logout, currentUser } = useAuth()

  useEffect(() => {
    if (!currentUser) {
      router.push('login');
    }
  }, []);

  const onLogout = async () => {
    const response = await logout()
    router.push('/login')
  }

  const handleAddTodo = async (data: Inputs) => {
    if (todos === null) return
    const currentKeys = Object.keys(todos);
    const newKey = currentKeys.length === 0 ? 1 : Math.max(...currentKeys.map((key) => parseInt(key, 10))) + 1;
    setTodos({
      ...todos, [newKey]:
      {
        item: data.todoInput,
        done: false
      }
    })

    const userRef = doc(db, 'users', currentUser.uid)
    await setDoc(userRef, {
      'todos': {
        [newKey]:
        {
          item: data.todoInput,
          done: false
        }
      }
    }, { merge: true })

    data.todoInput = ''
  }


  function handleDelete(todoKey: any) {
    return async () => {
      const tempObj: Todos = { ...todos }

      delete tempObj[todoKey]

      setTodos(tempObj)
      const userRef = doc(db, 'users', currentUser.uid)
      await setDoc(userRef, {
        'todos': {
          [todoKey]: deleteField()
        }
      }, { merge: true })

    }
  }


  function handleDone(todoKey: number) {
    if (todos === null) return
    return async () => {
      const newKey = todoKey
      setTodos({
        ...todos, [newKey]: {
          item: todos[todoKey]?.item,
          done: !todos[todoKey]?.done
        }
      })
      const userRef = doc(db, 'users', currentUser.uid)
      await setDoc(userRef, {
        'todos': {
          [newKey]: {
            item: todos[todoKey].item,
            done: !todos[todoKey].done
          }
        }
      }, { merge: true })

    }
  }


  return (
    <main className="h-screen w-full">
      <div className="w-full h-2/6 overflow-hidden">
        <Image
          src="/assets/images/bg_liquid.png"
          alt="Vercel Logo"
          className="w-full"
          width={1280}
          height={120}
        />
      </div>

      <div className="flex flex-col items-center justify-center -mt-28">
        <div className="w-4/6 bg-white rounded-md shadow-md">
          <form onSubmit={handleSubmit(handleAddTodo)} className="relative">
            <input type="text" {...register("todoInput", { required: "field is required." })} className="w-full p-3 pl-8 border rounded-md" placeholder="Add a new workout..." />
            <div className="absolute bottom-4 left-0 flex items-center pl-3 pointer-events-none">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="7" cy="7" r="6.5" stroke="#E0E0E0" />
              </svg>
            </div>

          </form>
          <ErrorMessage
            errors={errors}
            name="todoInput"
            render={({ message }) => <p className="text-danger-800 text-sm py-2 px-3">{message}</p>}
          />
        </div>

        <ul className="w-4/6 bg-white rounded-md shadow-md mt-6">
          {(!loading && Object.keys(todos).length != 0) && (
            <>
              {Object.keys(todos).map((todo, i) => {
                return (
                  <TodoItem key={i} todoKey={todo} handleDone={handleDone} todoItem={todos[parseInt(todo)]} handleDelete={handleDelete} />
                )
              })}
            </>
          )}

          {(!loading && Object.keys(todos).length === 0) && (
            <EmptyScreen />
          )}

          {(loading) && (
            <>
              <Loading />
            </>
          )}
        </ul>

        <button type="button" onClick={onLogout} className="text-danger-800 mt-6 bg-danger-400 focus:outline-none font-medium rounded-sm text-sm px-8 py-2.5 text-center inline-flex items-center mr-2 mb-2">
          Log out
          <svg width="19" className="w-6 h-5 ml-2 -mr-1" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 18C1.95 18 1.479 17.804 1.087 17.412C0.695002 17.02 0.499335 16.5493 0.500002 16V2C0.500002 1.45 0.696002 0.979002 1.088 0.587002C1.48 0.195002 1.95067 -0.000664969 2.5 1.69779e-06H9.5V2H2.5V16H9.5V18H2.5ZM13.5 14L12.125 12.55L14.675 10H6.5V8H14.675L12.125 5.45L13.5 4L18.5 9L13.5 14Z" fill="#FF5353" />
          </svg>
        </button>
      </div>
    </main>
  )
}
