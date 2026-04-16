// redux(모든 jsx 파일에서 state 공유 기능 제공, props 전송 필요 없음!)
// redux 사용을 위해 store.js 파일 생성(각 jsx에서 만든 state들을 이 파일에 저장 및 공유)
import { configureStore, createSlice } from "@reduxjs/toolkit"; // redux 사용을 위한 컴포넌트 import

// 파일 분할해서 관리 가능~
import item from './store/itemSlice';

// redux에서 state를 slice라고 부르며 slice 생성을 위해 createSlice함수 사용
// 변수로 지정해서 export문에서 등록 시에 사용
let user = createSlice(
    // 내부 내용은 오브젝트 (형식 정해져 있음)
    {
        name: 'user', // slice 작명
        initialState: 'kim', // slice 초기값
        // slice 변경을 위한 함수 정의
        // reducers 오브젝트에 slice 변경 함수 정의
        reducers: {
            // 함수의 state 파라미터는 기존 slice를 의미
            setjohn(state) {
                // 변경할 값을 return
                return 'john' + state;
            },
            // 변경 함수는 여러개 정의 가능
            sethello(state) {
                return 'hello' + state
            }
        }
    }
);

// 정의한 slice 변경 함수를 export 해야 다른 파일에서 사용 가능
// .actios는 위에서 정의한 함수들을 오브젝트에 담아 반환
export let { setjohn, sethello } = user.actions; // 관습적으로 destructuring 문법으로 export 한다.

let stock = createSlice({
    name: 'stock',
    initialState: [10, 11, 12],
    reducers: {

        // 오브젝트나 배열의 경우에는 return을 사용하지 않고 state 파라미터를 이용해서 직접 수정 가능
        increaseStock(state){
            state[0]++;
            state[1]++;
            state[2]++;
        },

        // 파라미터 사용가능 (관습적으로 action이라고 작명)
        increaseStockItem(state, action){
            // 파라미터를 정상적으로 사용하기 위해서는 .payload 사용
            // 파라미터는 오브젝트 자료로 함수 호출 시 전달되는 아규먼트 값은 파라미터.payload에 저장되어 전달됨
            //console.log(action);
            state[action.payload]++;
        }
    }
});

export let { increaseStock, increaseStockItem } = stock.actions;

export default configureStore({
    reducer: {
        user: user.reducer, // slice를 store에 등록(저장)
        stock: stock.reducer,
        item: item.reducer
    }
})