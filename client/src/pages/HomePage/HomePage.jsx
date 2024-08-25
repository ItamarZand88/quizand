import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    function createStars() {
      const stars = document.getElementById("stars");
      const count = 200;

      for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        stars.appendChild(star);
      }
    }

    createStars();
  }, []);

  return (
    <>
      <div className="background"></div>
      <div className="stars" id="stars"></div>
      <div className="container">
        <div className="content">
          <h1>QuizMe</h1>
          <p>
            A wise man once said,
            <br />
            "Learning Shouldn't Be Rocket Science"
          </p>
        </div>
      </div>
      <div className="bottom-content">
        <button className="learn-more" onClick={() => navigate("/quiz")}>
          Let's QuizMe
        </button>
        <div className="icons">
          <svg
            className="icon"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="200"
              height="200"
            >
              <path
                d="M120 0H80V80H0V120H80V200H120V120H200V80H120V0Z"
                fill="#364ECC"
              />
              <path
                d="M43.4314 15.1472L15.1472 43.4315L71.7157 100L15.1472 156.569L43.4314 184.853L100 128.284L156.569 184.853L184.853 156.569L128.284 100L184.853 43.4315L156.569 15.1472L100 71.7157L43.4314 15.1472Z"
                fill="#364ECC"
              />
            </mask>
            <g mask="url(#mask0)">
              <rect x="-23" y="-23" width="266" height="266" fill="#ffffff" />
            </g>
          </svg>

          <svg
            className="icon"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask1"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="200"
              height="200"
            >
              <path
                d="M100 200V0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200Z"
                fill="#06AB97"
              />
              <path
                d="M200 200V0C144.772 0 100 44.7715 100 100C100 155.228 144.772 200 200 200Z"
                fill="#06AB97"
              />
            </mask>
            <g mask="url(#mask1)">
              <rect width="281" height="281" fill="#ffffff" />
            </g>
          </svg>

          <svg
            className="icon"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask2"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="200"
              height="200"
            >
              <path
                d="M82.3963 14.0889C87.7132 19.388 94.0562 28.1333 100 38.3799C105.944 28.1333 112.286 19.388 117.604 14.0889C136.453 -4.69632 167.014 -4.69632 185.863 14.0889C204.712 32.8742 204.712 63.3343 185.863 82.1195C180.445 87.5181 171.438 93.9785 160.904 99.9991C171.438 106.02 180.445 112.482 185.863 117.88C204.712 136.666 204.712 167.126 185.863 185.911C167.014 204.696 136.453 204.696 117.604 185.911C112.286 180.612 105.944 171.867 100 161.62C94.0562 171.867 87.7132 180.612 82.3963 185.911C63.5473 204.696 32.9861 204.696 14.1371 185.911C-4.71237 167.126 -4.71237 136.666 14.1371 117.88C19.5549 112.482 28.5624 106.022 39.0963 100.001C28.5624 93.9803 19.5549 87.5181 14.1371 82.1195C-4.71237 63.3343 -4.71237 32.8742 14.1371 14.0889C32.9861 -4.69632 63.5473 -4.69632 82.3963 14.0889Z"
                fill="#98E8E8"
              />
            </mask>
            <g mask="url(#mask2)">
              <rect x="-18" y="-28" width="255" height="255" fill="#ffffff" />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

export default HomePage;
