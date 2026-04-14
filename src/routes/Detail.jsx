import { useParams } from "react-router-dom"; // URL 파라미터 관련 함수 import
import styled from 'styled-components'; // styled-components 관련 컴포넌트 import
import { useEffect, useState } from "react"; // useEffect import

// styeld로 css 작성 없이 스타일 입력 가능 (변수 작명 시 첫 문자는 대문자로)
// props 문법 사용 가능 (아래와 같이 'props =>'로 시작하며 사용)
// 삼항연산자로 간단한 조건문 사용 가능
let Btn = styled.button`
  background : ${props => props.bg};
  color : ${props => props.bg == 'blue' ? 'white' : 'black'};
  padding : 10px
`;

// 이전에 정의한 스타일 복사 가능
let TempBtn = styled(Btn)`
  padding : 20px;
`;

function DetailPage(props) {
  let [alert, SetAlert] = useState(5);
  let [input, SetInput] = useState('');
  let [temp, SetTemp] = useState(false);

  // useEffect: 해당 컴포넌트가 mount, update 시 실행 콜백함수 실행
  useEffect(() => {
    let a = setInterval(() => {
      if (alert > 0) SetAlert(alert - 1);
      else clearInterval(a);
    }, 1000);
    // return 작성하면
    return () => { clearInterval(a) } // useEffet 살행 전에 실행됨 (일반적으로 clean-up 코드를 작성)

  }, [alert]); // []안에 dependency state를 지정 가능
  // dependency를 지정하면 컴포넌트 update 시가 아닌 해당 스테이트가 변할 때 실행됨(mount 시에는 자동 실행)
  // dependency를 []로 지정하면 mount 시에만 실행됨

  useEffect(() => {
    if (/^$|^[0-9]+$/.test(input)) SetTemp(false);
    else SetTemp(true);
  }, [input]);

  // URL 파라미터 정보를 위한 함수 useParams
  // 작명한 URL 파라미터를 이름 그대로 사용
  let { id } = useParams();
  let product = props.shoes.find((x) => { return x.id == id });

  if (product != undefined)
    return (
      <div className="container">
        {/* <Btn bg="blue"> 버튼</Btn>
        <Btn bg="yellow"> 버튼</Btn>
        <Btn bg="green"> 버튼</Btn>
        <TempBtn bg="red">버튼</TempBtn> */}

        {alert > 0 ? <div className="alert alert-warning">{alert}초 이내 구매 시 할인</div> : null}
        <div className="row">
          <div className="col-md-6">
            <img src={`https://codingapple1.github.io/shop/shoes${product.id + 1}.jpg`} width="100%" />
            {temp ? <div className="alert alert-warning">숫자만 입력하세요</div> : null}
            <input type="text" placeholder='입력' onChange={(e) => { SetInput(e.target.value); }} />
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{product.title}</h4>
            <p>{product.content}</p>
            <p>{product.price}</p>
            <button className="btn btn-danger">주문하기</button>
          </div>
        </div>
      </div>
    );

  return (
    <div>존재하지 않는 상품입니다.</div>
  )
}

export default DetailPage;