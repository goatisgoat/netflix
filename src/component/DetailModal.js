import React, { useRef } from "react";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";


function DetailModal({ isOpen, setIsOpen }) {
  const { trailerAction } = useSelector((state) => state.detail);
  const modalRef = useRef();

 
  const modalOutSideClick = (e) => {
    if(modalRef.current === e.target) {
      setIsOpen(false)
  }  }



  if (isOpen) {
    return (
      <div>
        {" "}
        <div className="ModalBox" ref={modalRef} onClick={(e)=>modalOutSideClick(e)}></div>
        <div className="secondModal">
          <div >
            <YouTube
              videoId={trailerAction}
              opts={{
                width: "900",
                height: "500",
                playerVars: {
                  autoplay: 1, //자동재생 O
                  rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                  modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                },
              }}
              onEnd={(e) => {
                e.target.stopVideo(0);
              }}
            ></YouTube>
          </div>
        </div>
      </div>
    );
  }
}

export default DetailModal;
