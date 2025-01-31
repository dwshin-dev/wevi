import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import backIcon from "../../assets/arrowLeft.png";
import hamburgerIcon from "../../assets/hamburgericon.png";

function TopNavigationBar({ title }) {
  return (
    <header className="flex items-center w-full sticky top-0 left-0 right-0 justify-between px-4 py-3 bg-[#FFFDFA] shadow-md z-10">
      {/* 뒤로가기로 수정하기기 */}
      <Link to="/" className="flex items-center">
        <img
          src={backIcon} // 로고 이미지 경로
          alt="arrow"
          className="h-10 w-10 object-contain" // 로고 크기 조정
        />
      </Link>

      <span className="text-lg font-bold text-gray-900">{title}</span>

      <Link to="/menu" aria-label="Menu" className="p-2">
        <img src={hamburgerIcon} alt="Menu Icon" className="h-6 w-6" />
      </Link>
    </header>
  );
}

TopNavigationBar.propTypes = {
  title: PropTypes.string.isRequired, // 검색 제목 (필수)
};

export default TopNavigationBar;
