import { Outlet } from "react-router-dom";

function AboutPage() {
  return (
    <div>
      <h4>회사정보임</h4>

      {/* 이 위치에 하위 페이지 내용 채워짐 */}
      <Outlet></Outlet>

    </div>
  );
}

export default AboutPage;