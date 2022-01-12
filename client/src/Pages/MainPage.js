import '../Css/MainPage.css'
import NavBar from '../Components/NavBar';

function MainPage() {
  return (
    <div className="main-page-box">
        <div className="main-intro-box">
          <div className="main-first-intro">
            <p>전국 식당들 평점을 편리하게 확인 해 보세요</p>
          </div>
          <div className="main-second-intro">
            <p>미리 방문해서 실망할 일을 줄일 수 있어요</p>
          </div>
          <div className="main-third-intro">
            <p>멀리 여행갈 때 어느 식당을 방문할지 미리 확인하세요</p>
          </div>
          <p>About us, Concat</p>
        </div>
    </div>
  );
};

export default MainPage;