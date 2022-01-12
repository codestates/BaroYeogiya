import { Link } from "react-router-dom";
import '../Css/NavBar.css'

function UserNavBar({ handleResponse, handleIsLogin }) {

  const onLogout = () => { // props로 받은 함수를 실행하여 상태를 변경 시킨다.
    handleResponse({
      userInfo : null
    });
    handleIsLogin(false);
  }

  return(
    <div className="nav-box">
      <div className="logo-img-box">
        <Link to='/'>
          <button className='bt'>로고</button>
        </Link>
      </div>
      <div className="nav-menue-box">
        <div className="menue-box">
          <Link to='/mappage'>
            <button className='bt' >지도</button>
          </Link>
          <Link to='/mypage'>
            <button className="bt">My Page</button>
          </Link>
            <button className="bt" onClick={() => onLogout()} >Logout</button>
        </div>
      </div>
    </div>
  )
}

export default UserNavBar;