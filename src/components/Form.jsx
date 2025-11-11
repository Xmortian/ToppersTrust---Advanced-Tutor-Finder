import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Form = ({ className = "" }) => {
  const navigate = useNavigate();

  const onArrowIconClick = useCallback(() => {
    navigate("/otp");
  }, [navigate]);

  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start pt-[4.187rem] px-[1.437rem] pb-[1.25rem] box-border relative gap-[4.875rem] max-w-full text-left text-[1rem] text-[#000] font-roboto mq450:gap-[1.188rem] mq750:gap-[2.438rem] ${className}`}
    >
      <div className="w-full h-full absolute !!m-[0 important] top-[0rem] right-[0rem] bottom-[0rem] left-[0rem] rounded-31xl bg-[rgba(93,44,44,0.05)] z-[1]" />
      <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pl-[1.437rem] pr-[2.062rem] box-border max-w-full">
        <div className="flex-1 flex flex-col items-start justify-start gap-[3.687rem] max-w-full mq675:gap-[1.813rem]">
          <div className="relative whitespace-pre-wrap z-[2]">{`Email   `}</div>
          <img
            className="self-stretch relative max-w-full overflow-hidden max-h-full mt-[-0.063rem] z-[2]"
            loading="lazy"
            alt=""
            src="/line-21.svg"
          />
        </div>
      </div>
      <div className="rounded-31xl bg-[#6344cc] flex flex-row items-start justify-start py-[0.75rem] pl-[0.875rem] pr-[0rem] gap-[0.937rem] z-[2] text-[1.125rem]">
        <div className="h-[2.875rem] w-[8rem] relative rounded-31xl bg-[#6344cc] hidden" />
        <div className="relative z-[3]">Submit</div>
        <div className="h-[1.375rem] flex flex-col items-start justify-start pt-[1.125rem] px-[0rem] pb-[0rem] box-border">
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

Form.propTypes = {
  className: PropTypes.string,
};

export default Form;
