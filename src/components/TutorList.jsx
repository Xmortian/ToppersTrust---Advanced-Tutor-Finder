import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const TutorList = ({ className = "" }) => {
  const navigate = useNavigate();

  const onButtonBackgroundClick = useCallback(() => {
    navigate("/job-posting");
  }, [navigate]);

  return (
    <div
      className={`absolute top-[13.625rem] left-[25.938rem] w-[50.338rem] h-[50.338rem] flex flex-row items-end justify-start pt-[11.687rem] pb-[0.712rem] pl-[18.25rem] pr-[9rem] box-border gap-[3.625rem] max-w-full text-left text-[0.875rem] text-[#000] font-oswald mq675:flex-wrap ${className}`}
    >
      <img
        className="w-full absolute !!m-[0 important] h-full top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-mini max-w-full overflow-hidden max-h-full object-contain"
        alt=""
        src="/pngtreecartoon-river-4760025-4@2x.png"
      />
      <div className="w-[5.5rem] flex flex-col items-start justify-start mq675:flex-1">
        <img
          className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover z-[1]"
          loading="lazy"
          alt=""
          src="/a38522fd8f3b402eb5da65d82ffc6e5e-5@2x.png"
        />
        <div className="relative [text-shadow:0px_4px_15px_4px_rgba(0,_0,_0,_0.25)] z-[2]">
          Moutmayen Nafis
        </div>
      </div>
      <div className="self-stretch flex-1 flex flex-col items-start justify-start text-[1.5rem] font-roboto">
        <div className="self-stretch h-[18.125rem] relative">
          <div
            className="absolute top-[0rem] left-[0rem] shadow-[0px_4px_20px_10px_rgba(0,_0,_0,_0.25)] rounded-3xs [background:linear-gradient(rgba(117,_117,_117,_0.7),_rgba(117,_117,_117,_0.7)),_linear-gradient(rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_#d9d9d9] border-[#3b394d] border-solid border-[1px] box-border w-full h-full cursor-pointer z-[2]"
            onClick={onButtonBackgroundClick}
          />
          <h2
            className="m-0 absolute top-[7.688rem] left-[3.875rem] text-[length:inherit] font-normal font-[inherit] inline-block min-w-[6.25rem] cursor-pointer z-[3] mq450:text-[1.188rem]"
            onClick={onButtonBackgroundClick}
          >
            Post Job
          </h2>
        </div>
      </div>
    </div>
  );
};

TutorList.propTypes = {
  className: PropTypes.string,
};

export default TutorList;
