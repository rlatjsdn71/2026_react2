import { useDeferredValue, useState, useTransition } from "react";

let a = new Array(10000).fill(0);

function TestPage() {
    let [name, setName] = useState('');

    // useTransition 사용하기
    // 변수 작명은 관습적으로 isPending, startTransition
    let [isPending, startTransition] = useTransition();

    // useDeferredValue 사용하기
    // 아규먼트로 state를 전달하고 변수에 저장하여 사용
    // 변수에는 해당 state 값이 저장된다. 다만, useTransition처럼 늦게 처리됨
    let name_defferd = useDeferredValue(name)
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
        </div>
    );
}

export default TestPage