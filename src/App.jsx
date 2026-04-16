import { useState } from 'react';
import { Button, Nav, Navbar, Container } from 'react-bootstrap'; // 부트스트랩에서 각 컴포넌트 import해야 함
import { Routes, Route, Link, useNavigate } from 'react-router-dom' // 라우터 관련 컴포넌트, 함수 import
import axios from 'axios'; // ajax GET 요청을 위한 axios 컴포넌트 import

import './App.css';
import bgImg from './assets/bg-1.png'; // 이미지 경로 설정
import data from './data.js';

// 페이지들을 컴포넌트로 만들고 각각 파일로 관리
import EventPage from './routes/Event.jsx';
import AboutPage from './routes/About.jsx';
import DetailPage from './routes/Detail.jsx';
import CartPage from './routes/Cart.jsx';

function App() {
  let [shoes, setShoes] = useState(data);

  // navigate는 변수에 저장하여 사용
  let navigate = useNavigate();

  function AddCard(data) {
    let temp = shoes;
    let changed = false

    data.data.forEach((a) => {
      let inter = temp.find((x) => { return x.id == a.id });
      if (inter == undefined) {
        temp.push(a);
        changed = true;
      }
    });

    //setState할 때 배열, 오브젝트는 꼭 비구조화할 것...!
    if (changed) setShoes([...temp]);
  }

  return (
    // bootstrap 사용하는 법 (index.html 파일에 link 추가해야 됨)
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark" style={{ paddingLeft: '20px' }}>
        <Navbar.Brand href="#home">안녕안녕신발가게</Navbar.Brand>
        <Nav className="me-auto">
          {/* 아래처럼 사용해도 되지만 링크 타고 이동 시 state(redux의 slice)가 초기값으로 초기화 됨 */}
          {/* <Nav.Link href="/">Home</Nav.Link> */}

          {/* 링크 태그로 페이지 이동 버튼 만들기 (디자인 구려서 안쓰고 navifate 함수 이용) */}
          {/* <Link to="/">홈</Link> */}
          {/* <Link to="/detail">상세페이지</Link> */}

          {/* 따라서 navigater 사용해서 아래와 같이 사용 */}
          {/* 물론 Nav.Link 컴포넌트에는 필요 없지만 다른 컴포넌트에 적용 가능 */}
          {/* navigate(-1), navigate(1) 이런 식으로 숫자를 전달하면 이전 이후 페이지로 이동 */}
          <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
          <Nav.Link onClick={() => navigate('/cart')}>Cart</Nav.Link>
          <Nav.Link onClick={() => navigate('/detail/0')}>Detail</Nav.Link>
        </Nav>
      </Navbar>

      {/* 라우터로 페이지 나누는 법 */}
      <Routes>
        {/* Route 태그로 경로 지정하고 element에 html 내용 입력 */}
        {/* element 외부에 적힌 내용들은 모든 페이지에 포함됨 */}
        <Route path='/' element={<MainPage shoes={shoes} AddCard={AddCard} />} />

        {/* URL 파라미터 */}
        {/* 콜른(:) 이후에 URL 파라미터 작명하여 사용 (여러개 사용 가능) */}
        <Route path="/detail/:id" element={<DetailPage shoes={shoes} />} />

        <Route path='/cart' element={<CartPage />} />

        {/* Nested Route */}
        <Route path='/about' element={<AboutPage />}>
          {/* 포함된 하위 페이지는 상위 페이지에 포함되어 보여진다.*/}
          {/* 정확히는 상위 페이지의 Outlet 태그가 파위 페이지 내용으로 대체 */}

          {/* 아래는 /about/member */}
          <Route path='member' element={<div>멤버입니다.</div>} />
          {/* 아래는 /about/location */}
          <Route path='location' element={<div>위치입니다.</div>} />
        </Route>

        {/* 숙제 */}
        <Route path='event' element={<EventPage />}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path='two' element={<div>생일 기념 쿠폰</div>} />
        </Route>

        {/* 404페이지(없는 페이지) 처리 */}
        <Route path='*' element={<div>없는 페이지입니다.</div>} />
      </Routes>
    </div>
  )
}

function MainPage(props) {
  let [load, setLoad] = useState(false)
  let [get_cnt, setGet_cnt] = useState(2);
  return (
    <>
      {/* 이미지 첨부하는 법 */}
      <div className='main-bg' style={{ backgroundImage: `url(${bgImg})` }}></div>
      {/* public 폴더에 있는 이미지 첨부에 대해서는 아래와 같이 입력 */}
      {/* <div className='main-bg' style={{backgroundImage : `url(${process.env.PUBLIC_URL + '/bg-1.png'})`}}></div> */}

      <div className='Container'>
        <div className='row' style={{ width: '100%' }}>
          {
            props.shoes.map(function (a, i) {
              return (<ShoesCard shoes={a} img={i + 1} key={i} />);
            })
          }
        </div>
      </div>
      {load ? <div className="alert alert-warning">로딩 중</div> : null}
      <button onClick={() => {
        setLoad(true); // 로딩 UI
        //(setTimeout은 서버요청 시간 임의 구현)
        setTimeout(() => {
          //axios 컴포넌트로 ajax get요청~ 
          axios.get(`https://codingapple1.github.io/shop/data${get_cnt}.json`)
            .then((data) => {
              props.AddCard(data);
              setGet_cnt(get_cnt + 1);
              setLoad(false);
            })
            .catch(() => { console.log('failed'); setLoad(false) })
        }, 500);

        // 그 외 ajax 요청
        // ajax post 요청: axios.post('경로', {name:'kim'});
        // 여러 개의 ajax 요청 동시 처리: Promise.all([axios.get('경로1'), axios.get('경로2')]).then(() => { '실행할 코드' })
      }}>버튼</button >
    </>
  );
}

function ShoesCard(props) {
  return (
    <div className='col-md-12 col-sm-4'>
      <img src={`https://codingapple1.github.io/shop/shoes${props.img}.jpg`} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App
