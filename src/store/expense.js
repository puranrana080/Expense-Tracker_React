import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenseData: {},
  formCheck: false,
  isEditing: false,
  editData: {},
};
const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {
    setExpense(state,action){
        state.expenseData=action.payload||{}
    },
    addExpense(state,action) {
        const {id,newExpense}=action.payload
        state.expenseData[id]=newExpense
    },
    toggleFormCheck(state) {
      state.formCheck = !state.formCheck;
    },
    toggleEditing(state){
        state.isEditing=!state.isEditing
    },
    editExpense(state,action){
        const {id,updatedExpense}=action.payload
        state.expenseData[id]=updatedExpense
    },
    setEditData(state,action){
        state.editData=action.payload||{}
    }
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
