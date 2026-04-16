import { useParams } from "react-router-dom"; // URL 파라미터 관련 함수 import
import styled from 'styled-components'; // styled-components 관련 컴포넌트 import
import { useEffect, useState } from "react"; // useEffect import
import { Nav } from "react-bootstrap";
import { addItem } from "../store/itemSlice";
import { useDispatch } from "react-redux";

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
  let [tab, setTab] = useState(0);
  let [load, setLoad] = useState('');
  //let [input, SetInput] = useState('');
  //let [temp, SetTemp] = useState(false);

  const dispatch = useDispatch();

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

  /* uesEffect 예시
  useEffect(() => {
    if (/^$|^[0-9]+$/.test(input)) SetTemp(false);
    else SetTemp(true);
  }, [input]);*/

  useEffect(() => {
    setLoad('end');
  }, []);

  // URL 파라미터 정보를 위한 함수 useParams
  // 작명한 URL 파라미터를 이름 그대로 사용
  let { id } = useParams();
  let product = props.shoes.find((x) => { return x.id == id });  

  if (product != undefined)
    return (
      <div className={`container start ${load}`}>
        {/* <Btn bg="blue"> 버튼</Btn>
        <Btn bg="yellow"> 버튼</Btn>
        <Btn bg="green"> 버튼</Btn>
        <TempBtn bg="red">버튼</TempBtn> */}

        {alert > 0 ? <div className="alert alert-warning">{alert}초 이내 구매 시 할인</div> : null}
        <div className="row">
          <div className="col-md-6">
            <img src={`https://codingapple1.github.io/shop/shoes${product.id + 1}.jpg`} width="100%" />
            {/*uesEffect 예시 temp ? <div className="alert alert-warning">숫자만 입력하세요</div> : null*/}
            {/* <input type="text" placeholder='입력' onChange={(e) => { SetInput(e.target.value); }} /> */}
          </div>
          <div className="col-md-6">
            <h4 className="pt-5">{product.title}</h4>
            <p>{product.content}</p>
            <p>{product.price}</p>
            <button className="btn btn-danger" onClick={()=>{
              dispatch(addItem(product));
            }}>주문하기</button>
          </div>
        </div>

        {/* tab UI */}
        <Nav variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link eventKey="link0" onClick={() => setTab(0)}>상세</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link1" onClick={() => setTab(1)}>리뷰</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link2" onClick={() => setTab(2)}>배송</Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent tab={tab} product={product} />
      </div>
    );
  return (
    <div>존재하지 않는 상품입니다.</div>
  );
}

// 탭 관련 내용 컴포넌트
function TabContent(props) {

  // fade in 애니메이션을 위한 state, 이 스테이트를 classname에 포함시킨다.
  let [fade, setFade] = useState('');

  // useEffect로 애니메이션 구현
  // 1. 이하의 useEffect는 tab 스테이트가 변경되었을 경우 실행됨
  // 2. useEffect return문에서 먼저 fade를 공백으로 초기화
  // 3. 이후 useEffect 본문에서 fade를 end로 초기화
  // 결과: classname에 end(스타일)가 없어졌다가 다시 붙으면서 opacity가 변함 => transition으로 애니메이션
  useEffect(()=>{
    // react에서는 실행 상 붙어있는 setState는 최근 명령 하나만 수행하기 때문에 timeout으로 분리
    let a = setTimeout(()=>{setFade('end')},100);
    return () =>{
      setFade('');
      clearTimeout(a);
    };
  }, [props.tab]);
  return ( 
    // 조건제어문 대신 깔끔하게 배열의 요소를 return 하는 방식
    // 전체를 하나의 div 태그로 묶어 스타일을 주기 용이하게 한다.
    // fade in 애니메이션 start: opacity:0, end: opacity 1, transition: 0.5s (App.css 참고)
    <div className={`start ${fade}`}>
      {[<div>상세설명{props.product.title}</div>,<div>리뷰</div>,<div>배송</div>][props.tab]}
    </div>
  );
}

export default DetailPage;