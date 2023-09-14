"use client"

export default function TodoItem(props: any) {

    const { todoItem, todoKey, handleDelete, handleDone } = props

    return (
        <li className="relative flex justify-between items-center p-3 border-[#E0E0E0] border-b-[1px]">
            <div className='flex items-center'>
                <input type="checkbox" checked={todoItem.done} onChange={handleDone(todoKey)} name="" id="" />
                <p className={`pl-3 ${todoItem.done ? 'line-through' : ''}`}>{todoItem.item}</p>
            </div>
            <button onClick={handleDelete(todoKey)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.66829 18.332C1.66829 19.25 2.41453 20 3.33658 20H16.6712C17.5893 20 18.3395 19.2539 18.3395 18.332V7.5H1.66829V18.332ZM14.1707 10H15.839V17.5H14.1707V10ZM9.16975 10H10.838V17.5H9.16975V10ZM4.16878 10H5.83707V17.5H4.16878V10ZM19.1717 3.33203H14.1707V1.66797C14.1707 0.746094 13.4206 0 12.5024 0H7.50145C6.58331 0 5.83316 0.746094 5.83316 1.66797V3.33594H0.832193C0.371166 3.33203 0 3.70703 0 4.16797V5C0 5.46094 0.371166 5.83203 0.832193 5.83203H19.1678C19.6288 5.83203 20 5.46094 20 5V4.16797C20.0039 3.70703 19.6327 3.33203 19.1717 3.33203ZM12.5024 3.33203H7.50145V1.66797H12.5024V3.33203Z" fill="#E0E0E0" />
                </svg>
            </button>
        </li>
    )
}
