import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setjohn, increaseStock, increaseStockItem } from "./../store.js"; // store 파일에서 정의한 변경 함수들을 import
import { increaseItem } from "../store/itemSlice.js";

function CartPage() {

    // store에 있는 모든 state(slice)를 불러오기 위해 useSelector 함수 사용
    // 변수에 저장해서 사용한다.
    let state = useSelector((state) => { return state }) // state는 store에 저장된 모든 state를 포함하는 오브젝트
    //console.log(a); // 따라서 결과는 오브젝트

    // state(slice) 변경함수를 store 파일에 요청하기 위해서 useDispatch 함수 사용
    // 변수에 저장해서 사용한다.
    const dispatch = useDispatch();
    // dispatch(setjohn()) // 이런식으로 사용

    return (
        <div>
            {/* 예시 {state.stock}
            <button onClick={() => { dispatch(increaseStock()) }}> 버튼 </button>
            <div>
                <button onClick={() => { dispatch(increaseStockItem(0)) }}> 버튼1 </button>
                <button onClick={() => { dispatch(increaseStockItem(1)) }}> 버튼2 </button>
                <button onClick={() => { dispatch(increaseStockItem(2)) }}> 버튼3 </button>
            </div> */}
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {state.item.map((a, i) => <CartItem item={a} key={i} count={i + 1} />)}
                </tbody>
            </Table>
        </div>
    );
}

function CartItem(props) {
    const dispatch = useDispatch();

    let item = props.item
    return (
        <tr>
            <td>{props.count}</td>
            <td>{item.name}</td>
            <td>{item.count}</td>
            <td><button onClick={() => {
                dispatch(increaseItem(item.id));
            }}>+</button></td>
        </tr>
    );
}

export default CartPage