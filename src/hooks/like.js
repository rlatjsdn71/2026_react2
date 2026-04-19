import { useState } from "react";

// 함수 안에 useEffect, useState 같은 use... 함수가 포함되어 있으면 함수 이름을 use...이라고 지어야 한다.
// use... 함수들은 컴포넌트 혹은 use... 함수에서만 사용 가능
// 이런 식으로 만든 use... 함수를 custon hook이라고 함
export function useLike() {
    let [like, setLike] = useState(0);
    function addLike() {
        // setState 함수에 아규먼트로 콜백함수 전달가능
        // 콜백함수의 파라미터에는 기존 state 값이 전달됨
        // 따라서 다음과 같이 사용 가능 (return 중괄호 생략됨)
        setLike(a => a + 1);
    }

    return [like, addLike];

    // 오브젝트 형태로 retur 해도 되지용~
    return { 'like': like, 'addLike': addLike };
}