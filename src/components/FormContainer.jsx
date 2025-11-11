import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const FormContainer = ({ className = "" }) => {
  const navigate = useNavigate();

  const onArrowIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start pt-[2.25rem] px-[1.437rem] pb-[1.25rem] box-border relative gap-[2.418rem] max-w-full text-left text-[1rem] text-[#000] font-roboto mq750:gap-[1.188rem] ${className}`}
    >
      <div className="w-full h-full absolute !!m-[0 important] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-31xl bg-[rgba(93,44,44,0.05)] z-[1]" />
      <div className="flex flex-row items-start justify-start py-[0rem] px-[1.437rem]">
        <div className="relative z-[2]">New Password</div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pl-[1.437rem] pr-[2.062rem] box-border max-w-full">
        <div className="flex-1 flex flex-col items-start justify-start gap-[1.937rem] max-w-full mq675:gap-[0.938rem]">
          <img
            className="self-stretch relative max-w-full overflow-hidden max-h-full mt-[-0.063rem] z-[2]"
            loading="lazy"
            alt=""
            src="/line-21.svg"
          />
          <div className="flex flex-row items-start justify-start">
            <div className="relative z-[2]">Confirm Password</div>
            <div className="relative z-[3] ml-[-8.75rem]">Confirm Password</div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pl-[1.437rem] pr-[2.062rem] box-border max-w-full">
        <img
          className="flex-1 relative max-w-full overflow-hidden max-h-full mt-[-0.063rem] z-[2]"
          loading="lazy"
          alt=""
          src="/line-21.svg"
        />
      </div>
      <div className="rounded-31xl bg-[#6344cc] flex flex-row items-start justify-start py-[0.75rem] pl-[0.875rem] pr-[0.562rem] gap-[0.375rem] z-[2] text-[1.125rem]">
        <div className="h-[2.875rem] w-[8rem] relative rounded-31xl bg-[#6344cc] hidden" />
        <div className="relative z-[3]">Submit</div>
        <div className="h-[1.375rem] flex flex-col items-start justify-start pt-[0.687rem] px-[0rem] pb-[0rem] box-border">
          <img
            className="w-[2.438rem] h-[0.919rem] relative cursor-pointer z-[3]"
            loading="lazy"
            alt=""
            src="/arrow-61.svg"
            onClick={onArrowIconClick}
          />
        </div>
      </div>
    </div>
  );
};

FormContainer.propTypes = {
  className: PropTypes.string,
};

export default FormContainer;
