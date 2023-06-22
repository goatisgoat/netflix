import React, { useEffect } from "react";
import { useState, useRef } from "react";
import "react-multi-carousel/lib/styles.css";
import MovieSlideComponenet from "./MovieSlideComponenet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const MovieSlide = ({ item, title }) => {
  const [num, setNum] = useState(item.results);
  const [current, setCurrent] = useState(1);
  const slideContainer = useRef();
  const containerBox = useRef();

  useEffect(() => {
    if (current === 21) {
      const timer = setInterval(() => {
        slideContainer.current.style.transform = `translateX(${-1200}px)`;
        slideContainer.current.style.transition = "none";
        setCurrent(1);
      }, 500);

      return () => clearInterval(timer);
    }
  }, [current]);

  // 오른쪽으로 이동
  const right = () => {
    if (current < 21) {
      slideContainer.current.style.transform = `translateX(${
        -1200 + -current * 300
      }px)`;
      slideContainer.current.style.transition = "0.5s ease-in-out";
      setCurrent(current + 1);
    }
  };

  useEffect(() => {
    if (current <= -3) {
      const timer = setInterval(() => {
        let n = num.length - 4;
        slideContainer.current.style.transform = `translateX(${
          -1200 + -n * 300
        }px)`;
        slideContainer.current.style.transition = "none";
        setCurrent(num.length - 3);
      }, 500);

      return () => clearInterval(timer);
    }
  }, [current]);

  // 왼쪽으로 이동
  const left = () => {
    if (current > -1) {
      slideContainer.current.style.transform = `translateX(${
        -1200 + -(current - 2) * 300
      }px)`;
      slideContainer.current.style.transition = "0.5s ease-in-out";
      setCurrent(current - 1);
    } else if (-2 <= current) {
      slideContainer.current.style.transform = `translateX(${
        -1200 + -(current - 2) * 300
      }px)`;
      slideContainer.current.style.transition = "0.5s ease-in-out";
      setCurrent(current - 1);
    }
  };

  return (
    <div className="slideContainer" ref={containerBox}>
      <h2 style={{ color: "white" }}>{title}</h2>
      <div ref={slideContainer} className="second">
        {num.map((item, index) =>
          index > num.length - 5 ? (
            <div className="slideItme">
              <MovieSlideComponenet item={item} index={index} />
            </div>
          ) : (
            ""
          )
        )}

        {num.map((item, index) => (
          <div className="slideItme">
            <MovieSlideComponenet item={item} index={index} />
          </div>
        ))}

        {num.map((item, index) =>
          index < 6 ? (
            <div className="slideItme">
              <MovieSlideComponenet item={item} index={index} />
            </div>
          ) : (
            ""
          )
        )}
      </div>
      <button onClick={left} className="btn1">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button onClick={right} className="btn2">
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default MovieSlide;
