import { useState, useEffect, useRef } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import { db } from '../../../firebase'

export default function useFetchTodos() {
    interface Todo {
        [key: number]: {
            item: string
            done: boolean
        };
    }
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [todos, setTodos] = useState<Todo>({})

    const { currentUser } = useAuth()
    // add use effect hook "fetchData" run when use fetch todos hook called
    useEffect(() => {
        async function fetchData() {
            try {
                const docRef = doc(db, 'users', currentUser.uid)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    setTodos(docSnap.data().todos)
                } else {
                    setTodos({})
                }
            } catch (err) {
                setError('Failed to load todos')
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return { loading, error, todos, setTodos }
}