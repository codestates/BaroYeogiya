import { Link } from 'react-router-dom';
import '../Css/FooterBar.css';
import { useNavigate } from 'react-router-dom';

function FooterBar() {
  const navigate = useNavigate();

  return (
    <div className="footer-box">
      <div className="aboutus-box">
        <p className="aboutus-title">About us</p>
        <div>
          <a
            href="https://github.com/codestates/BaroYeogiya/wiki"
            target="_blank"
          >
            Wiki
          </a>
        </div>
        <div>
          <a href="https://github.com/codestates/BaroYeogiya" target="_blank">
            Repository
          </a>
        </div>
      </div>
      <div className="contact-box">
        <p className="contact-title">Contact</p>
        <div>
          <a href="https://github.com/Brian-free1" target="_blank">
            정채련 @github
          </a>
        </div>
        <div>
          <a href="https://github.com/qkrwlgh123" target="_blank">
            박지호 @github
          </a>
        </div>
        <div>
          <a href="https://github.com/amazer001" target="_blank">
            강명우 @github
          </a>
        </div>
      </div>
    </div>
  );
}

export default FooterBar;
