import '../Css/MainPage.css';
import FooterBar from '../Components/FooterBar';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();
  
  return (
    <div className="main-page-box">
      <div className="main-intro-box">
        <div className="main-first-intro">
          <div className="img-box">
            <img src="Images/sample.gif" />
          </div>
          <div className="text-box">
            <p>당신의 즐거운 식사를 만드는 곳 바로 여기야!</p>
            <button onClick={() => navigate('/mappage')}>직접 확인하기</button>
          </div>
        </div>
        <div className="main-second-intro">
          <div className="img-box">
            <img src="Images/sample.gif" />
          </div>
          <div className="text-box">
            <p>새로운 맛집을<br/>찾으셨나요?</p>
            <p>발견한 맛집을 다른 사람들에게 알리세요!</p>
            <button onClick={() => navigate('/mappage')}>직접 확인하기</button>
          </div>
        </div>
        <div className="main-third-intro">
          <div className="img-box">
            <img src="Images/sample.gif" />
          </div>
          <div className="text-box">
            <p>나만의 맛집 목록을 만들어보세요!</p>
            <p>여러 의견을 참고해서,<br/>새로운 맛집을 나만의 공간에 담아보세요!</p>
            <button onClick={() => navigate('/mappage')}>직접 확인하기</button>
          </div>
        </div>
        <FooterBar />
      </div>
    </div>
  );
}

export default MainPage;
