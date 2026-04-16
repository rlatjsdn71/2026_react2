import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// 파일 분할 가능~

let item = createSlice({
    name: 'item',
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers: {
        increaseItem(state, action) {
            let temp = state.findIndex((x) => { return x.id === action.payload })
            state[temp].count++;
        },
        addItem(state, action) {
            let temp = state.findIndex((x) => { return x.id === action.payload.id })            
            if (temp == -1) state.push({ id: action.payload.id, name: action.payload.title, count: 1 });
            else state[temp].count++;
        }
    }
});

export let { increaseItem, addItem } = item.actions;

export default item;