import { useState } from 'react';
import './App.css';
import { Button, Nav, Navbar, Container } from 'react-bootstrap'; // 부트스트랩에서 각 컴포넌트 import해야 함
import bgImg from './assets/bg-1.png'; // 이미지 경로 설정
import { data } from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom' // 라우터 관련 컴포넌트 import

function App() {

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  return (
    // bootstrap 사용하는 법 (index.html 파일에 link 추가해야 됨)
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark" style={{ paddingLeft: '20px' }}>
        <Navbar.Brand href="#home">안녕안녕신발가게</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#features">Cart</Nav.Link>
          {/* navigater 사용해서 아래와 같이 사용 가능 */}
          {/* 물론 Nav.Link 컴포넌트에는 필요 없지만 다른 컴포넌트에 적용 가능 */}
          {/* navigate(-1), navigate(1) 이런 식으로 숫자를 전달하면 이전 이후 페이지로 이동 */}
          <Nav.Link onClick={() => navigate('/detail')}>Detail</Nav.Link>

        </Nav>
        {/* 링크 태그로 페이지 이동 버튼 만들기 */}
        {/* <Link to="/">홈</Link> */}
        {/* <Link to="/detail">상세페이지</Link> */}
      </Navbar>

      {/* 라우터로 페이지 나누는 법 */}
      <Routes>
        {/* Route 태그로 경로 지정하고 element에 html 내용 입력 */}
        {/* element 외부에 적힌 내용들은 모든 페이지에 포함됨 */}
        <Route path='/' element={<MainPage shoes={shoes} />} />
        <Route path="/detail" element={<DetailPage />} />

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
    </>
  );
}

function DetailPage() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">상품명</h4>
          <p>상품설명</p>
          <p>120000원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div>
      <h4>회사정보임</h4>

      {/* 이 위치에 하위 페이지 내용 채워짐 */}
      <Outlet></Outlet>

    </div>
  );
}

function EventPage() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>

      {/* 이 위치에 하위 페이지 내용 채워짐 */}
      <Outlet></Outlet>

    </div>
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
