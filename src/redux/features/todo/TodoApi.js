import {apiSlice} from "../api/apiSlice.js";
import {SuccessToast} from "../../../helper/ValidationHelper.js";


export const todoApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () =>
                `/todo/get-all-todos`,
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                try{
                    const res = await queryFulfilled;
                }catch(err) {
                    //do nothing
                    console.log(err);
                }
            },
        }),
        addTodo: builder.mutation({
            query: (data) => ({
                url: "/todo/create-todo",
                method: "POST",
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){
                // optimistic cache update start
                /*
              const pathResult = dispatch(
                    todoApi.util.updateQueryData(
                        "getTodos",
                        undefined,//tag/id
                        (draft) => {
                            const draftTodos = draft.data ///getTodos Array// My data
                            draftTodos.push(arg);
                            //draftTodos = [...draft.data, arg];
                            //draftTodos[0].name = "Beauti";
                            //draftConversation.timestamp = arg.data.timestamp;
                        }
                    )
                );

                 */
                // optimistic cache update end
                try{
                    const res = await queryFulfilled;
                    SuccessToast("Todo Create Success");
                    const newTodo = res?.data?.data;
                    // pessimistically cache update start
                   dispatch(
                        todoApi.util.updateQueryData(
                            "getTodos",
                            undefined,//tag/id
                            (draft) => {
                                const draftTodos = draft.data ///getTodos Array// My data
                                draftTodos.push(newTodo);
                                //draftTodos = [...draft.data, arg];
                                //draftTodos[0].name = "Beauti";
                                //draftConversation.timestamp = arg.data.timestamp;
                            }
                        )
                    );
                    // pessimistically cache update end
                }catch(err) {
                    //pathResult.undo();
                    console.log(err);
                }
            },
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/todo/delete-todo/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){

                // optimistic todos cache update start
               const pathResult = dispatch(
                    todoApi.util.updateQueryData(
                        "getTodos",
                        undefined,//tag/id
                        (draft) => {
                            const draftTodos = draft.data ///getTodos Array// My data
                            // alert(JSON.stringify(draftTodos))
                            console.log(arg)
                            draft.data = draftTodos.filter((cv)=> cv._id !== arg.toString())
                            //alert(JSON.stringify(result))
                        }
                    )
                );
                // optimistic todos cache update end

                try{
                    const res = await queryFulfilled;
                    SuccessToast("Todo Delete Success");
                    // pessimistic todos cache update start
                    /*
                    dispatch(
                        todoApi.util.updateQueryData(
                            "getTodos",
                            undefined,//tag/id
                            (draft) => {
                                const draftTodos = draft.data ///getTodos Array// My data
                               // alert(JSON.stringify(draftTodos))
                                console.log(arg)
                                draft.data = draftTodos.filter((cv)=> cv._id !== arg.toString())
                                //alert(JSON.stringify(result))
                                //draftTodos = result;
                            }
                        )
                    );
                     */
                    // pessimistic todos cache update end
                }catch(err) {
                    pathResult.undo();
                    console.log(err);
                }
            },
        }),
        editTodo: builder.mutation({
            query: ({id, data}) => ({
                url: `/todo/update-todo/${id}`,
                method: "PATCH",
                body: data
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch}){

                // optimistic todos cache update start
                const pathResult = dispatch(
                    todoApi.util.updateQueryData(
                        "getTodos",
                        undefined,//tag/id
                        (draft) => {
                            //draft.data ///getTodos Array// My data
                            // alert(JSON.stringify(draft.data))
                            console.log(arg)
                            const draftTodo = draft.data.find((cv)=>cv._id === arg.id.toString());
                            draftTodo.name = arg.data.name;
                        }
                    )
                );
                // optimistic todos cache update end

                try{
                    const res = await queryFulfilled;
                    SuccessToast("Todo Update Success");
                    // pessimistic todos cache update start
                    /*
                    dispatch(
                        todoApi.util.updateQueryData(
                            "getTodos",
                            undefined,//tag/id
                            (draft) => {
                                //draft.data ///getTodos Array// My data
                                // alert(JSON.stringify(draft.data))
                                console.log(arg)
                                const draftTodo = draft.data.find((cv)=>cv._id === arg.id.toString());
                                draftTodo.name = arg.data.name;
                            }
                        )
                    );
                     */
                    // pessimistic todos cache update end
                }catch(err) {
                    //pathResult.undo();
                    console.log(err);
                }
            },
        })
    }),
})


export const {useGetTodosQuery, useAddTodoMutation, useDeleteTodoMutation, useEditTodoMutation} = todoApi;