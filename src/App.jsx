import {
    useAddTodoMutation,
    useDeleteTodoMutation,
    useEditTodoMutation,
    useGetTodosQuery
} from "./redux/features/todo/TodoApi.js";
import {useState} from "react";

const App = () => {


    const {
        data,
        error,
    } = useGetTodosQuery();

    const todos = data?.data || [];

    const [addTodo, {isLoading, error:responseError}] = useAddTodoMutation();
    const [name, setName] = useState("");
    const [editMode, setEditMode] = useState(false)
    const [editId, setEditId] = useState("")
    const [deleteTodo, {isError}] = useDeleteTodoMutation();
    const [editTodo, result] = useEditTodoMutation();



    //addtodo
    const handleAdd = () => {
        if(name !==""){
            addTodo({
                name
            })
            setName("");
        }
    }

    //editTodo
    const handleEdit = () => {
        editTodo({
            id:editId,
            data:{
                name:name
            }
        })
        setEditMode(false);
        setName("")
    }

    //deleteTodo
    const handleDelete = (id) => {
        deleteTodo(id);
        setEditMode(false);
        setName("")
    }



    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="mt-4">
                            <input value={name} onChange={(e)=>setName(e.target.value)} />
                            <button onClick={editMode ? handleEdit : handleAdd} className="mx-2 btn btn-primary">
                                {editMode ? "Edit" : "Add"}
                            </button>
                            {editMode && (
                                <button
                                    onClick={()=> {
                                        setEditMode(false);
                                        setName("");
                                        setEditId("")
                                    }}
                                    className="btn btn-danger"
                                >
                                    Cancel Delete
                                </button>
                            )}
                        </div>
                        <br/> <br/>
                        {
                            todos?.length > 0 && (
                                todos.map((item,i)=>(
                                    <div key={i.toString()} className="mb-2">
                                        {Number(i+1)} <button className="btn btn-success">{item?.name}</button>
                                        <button onClick={()=>handleDelete(item?._id)} className="btn btn-danger mx-1">Delete </button>
                                        <button
                                            onClick={()=>{
                                                setEditMode(true);
                                                setName(item?.name);
                                                setEditId(item?._id)
                                            }}
                                            className="btn btn-secondary mx-1"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                ))
                            )
                        }

                    </div>
                </div>
            </div>
        </>
    );
};

export default App;