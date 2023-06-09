import React, { useRef } from "react";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";

function DetailModal({ isOpen, setIsOpen }) {
  const { trailerAction } = useSelector((state) => state.detail);
  const modalRef = useRef();

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) {
      setIsOpen(false);
    }
  };
  // console.log(modalRef.current, 'modalRef.current',e.target, 'e.target' )

  if (isOpen) {
    return (
      <div>
        {" "}
        <div
          className="ModalBox"
          ref={modalRef}
          onClick={(e) => modalOutSideClick(e)}
        ></div>
        <div className="secondModal">
          <div>
            <YouTube
              videoId={trailerAction}
              opts={{
                width: "900",
                height: "500",
                playerVars: {
                  autoplay: 1,
                  rel: 0,
                  modestbranding: 1,
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
