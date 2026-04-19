import { useDeferredValue, useEffect, useState, useTransition } from "react";
import axios from "axios";

// import custom hook
import { useLike } from "../hooks/like";
import { useName } from "../hooks/username";

let a = new Array(0).fill(0); // 원래는 10000

function TestPage() {
    let [name, setName] = useState('');
    // useTransition 사용하기
    // 변수 작명은 관습적으로 isPending, startTransition
    let [isPending, startTransition] = useTransition();
    // useDeferredValue 사용하기
    // 아규먼트로 state를 전달하고 변수에 저장하여 사용
    // 변수에는 해당 state 값이 저장된다. 다만, useTransition처럼 늦게 처리됨
    let name_defferd = useDeferredValue(name)

    // setState는 async로 처리된다
    let [count, setCount] = useState(0);
    let [age, setAge] = useState(20);
    // useEffect 사용해서 async로 인한 버그 해결
    useEffect(() => {
        // useEffct는 페이지가 처음 마운트됐을 때도 실행되기 때문에
        // count != 0 이라는 조건 추가
        if (count != 0 && count < 3)
            setAge(age + 1);
    }, [count]);

    // custom hook에서 state, setState 불러와 사용하기
    let [like, addLike] = useLike();
    let data = useName();
    

    return (
        <div>
            <input type="text" onChange={(e) => {
                // startTranstion으로 성능 저하가 발행하는 함수를 감싸면
                // 해당 함수 실행 시점을 늦춰줌 (사용자가 인식하기에 응답속도가 빠른 것처럼 보임)
                startTransition(() => {
                    setName(e.target.value);
                });
            }} />
            {
                // isPending은 startTransition이 실행 중일 때 true 끝나면 false
                // 따라서 삼항연산자로 아래와 같이 응용 가능
                isPending ? <div>로딩중~</div> :
                    a.map((a, i) => {
                        // 1만 번 출력, 광장히 느리다
                        return <div key={i}>{name_defferd}</div>
                    })
            }


            <div>안녕하십니까 전 {age}</div>
            <button onClick={() => {
                setCount(count + 1);
                /* if (count < 3) setAge(age + 1);
                위처럼 작성하면 원래 age는 22까지 증가해야 하는데
                setCount는 async로 동작하기에 if문이 먼저 실행됨
                따라서 age는 23까지 증가하게 된다.
                useEffect 사용해서 문제 해결
                */
            }}>누르면한살먹기</button>
            <div></div>

            {/* setState 함수에 콜백함수 사용 가능 */}
            {/* 파라미터에는 기존 state 값 전달됨 */}
            {like} <span onClick={addLike}>❤️</span>
            {data}
        </div>
    );
}

export default TestPage