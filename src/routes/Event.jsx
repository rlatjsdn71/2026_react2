import { Outlet } from "react-router-dom";

function EventPage() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>

      {/* 이 위치에 하위 페이지 내용 채워짐 */}
      <Outlet></Outlet>

    </div>
  );
}

export default EventPage;