import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const LoginForm = ({ className = "" }) => {
  const navigate = useNavigate();

  const onTutorButtonBackgroundClick = useCallback(() => {
    navigate("/guardian");
  }, [navigate]);

  const onTeacherButtonBackgroundClick = useCallback(() => {
    navigate("/tutor");
  }, [navigate]);

  return (
    <div
      className={`absolute top-[0rem] left-[22.563rem] w-[46.438rem] h-[53.375rem] flex flex-row items-end justify-start pt-[0rem] px-[3.937rem] pb-[22.187rem] box-border gap-[2.312rem] max-w-full text-left text-[1.5rem] text-[#000] font-roboto ${className}`}
    >
      <div className="h-[55.875rem] w-[42.813rem] !!m-[0 important] absolute top-[-4.375rem] left-[1.813rem] flex flex-row items-start justify-start max-w-full text-[1rem]">
        <div className="!!m-[0 important] absolute top-[0rem] left-[2.688rem] overflow-hidden flex flex-row items-start justify-start pt-[44.5rem] px-[0rem] pb-[0rem] z-[1]">
          <div className="relative shrink-0">{`Password `}</div>
        </div>
        <div className="self-stretch flex-1 overflow-hidden flex flex-row items-start justify-start pt-[37.75rem] px-[0rem] pb-[0rem] box-border max-w-full z-[3]">
          <div className="self-stretch flex-1 relative rounded-31xl bg-[rgba(93,44,44,0.05)] max-w-full" />
        </div>
        <div className="w-[8rem] !!m-[0 important] absolute top-[0rem] left-[2.125rem] overflow-hidden shrink-0 flex flex-row items-start justify-start z-[5]">
          <div className="flex-1 overflow-hidden flex flex-col items-start justify-end pt-[39.312rem] px-[0rem] pb-[0rem] gap-[9.375rem] z-[6]">
            <div className="self-stretch h-[2.875rem] relative rounded-31xl bg-[#6344cc] hidden" />
            <div className="flex flex-row items-start justify-start py-[0rem] px-[0.562rem]">
              <div className="relative whitespace-pre-wrap z-[7]">{`Email   `}</div>
            </div>
            <button className="cursor-pointer [border:none] p-0 bg-[#6344cc] self-stretch h-[2.875rem] relative rounded-31xl" />
          </div>
        </div>
      </div>
      <div className="h-[57.75rem] w-full absolute !!m-[0 important] top-[-4.375rem] right-[0rem] left-[0rem]">
        <img
          className="absolute top-[0rem] left-[4.438rem] w-[37.563rem] h-[48.125rem] overflow-hidden"
          alt=""
          src="/frame.svg"
        />
        <img
          className="absolute top-[0rem] left-[0rem] w-full h-full overflow-hidden z-[4]"
          alt=""
          src="/frame1.svg"
        />
      </div>
      <div className="h-[31.188rem] flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[8.562rem] box-border text-[#2320d5] mq450:hidden">
        <div className="flex flex-col items-start justify-start gap-[0.875rem]">
          <div className="overflow-hidden flex flex-row items-start justify-start pt-[23.125rem] px-[0rem] pb-[0rem] z-[7]">
            <h3 className="m-0 relative text-[length:inherit] font-semibold font-[inherit] shrink-0 mq800:text-[1.188rem]">
              Welcome !
            </h3>
          </div>
          <div className="relative text-[1rem] text-[#000] z-[7]">
            Sign In to Continue
          </div>
        </div>
      </div>
      <div className="h-[34.25rem] w-[16.063rem] absolute !!m-[0 important] top-[-4.375rem] left-[4.5rem] overflow-hidden shrink-0 z-[8] font-oswald">
        <button
          className="cursor-pointer [border:none] p-0 bg-[#959be4] absolute top-[30.188rem] left-[0rem] rounded-31xl w-[16.063rem] h-[4.063rem]"
          onClick={onTutorButtonBackgroundClick}
        />
        <h3 className="m-0 absolute top-[31.063rem] left-[3.438rem] text-[length:inherit] font-semibold font-[inherit] z-[9] mq800:text-[1.188rem]">
          I Want a Tutor
        </h3>
      </div>
      <div className="!!m-[0 important] absolute top-[-4.375rem] left-[5rem] overflow-hidden flex flex-col items-start justify-start gap-[1.812rem] z-[10] text-[1.125rem]">
        <div className="overflow-hidden flex flex-row items-start justify-start pt-[50.625rem] px-[0rem] pb-[0rem] z-[11]">
          <div className="relative shrink-0">Sign In</div>
        </div>
        <div className="relative text-[1rem]">Sign up</div>
      </div>
      <div className="flex-1 flex flex-col items-start justify-start max-w-[calc(100%_-_181px)] font-oswald mq450:max-w-full">
        <div className="self-stretch h-[34.25rem] relative">
          <div className="absolute h-full top-[0rem] bottom-[0rem] left-[10.688rem] w-[16.063rem] overflow-hidden z-[5]">
            <button
              className="cursor-pointer [border:none] p-0 bg-[#959be5] absolute top-[30.188rem] left-[0rem] rounded-31xl w-[16.063rem] h-[4.063rem]"
              onClick={onTeacherButtonBackgroundClick}
            />
            <h3 className="m-0 absolute top-[31.063rem] left-[3.5rem] text-[length:inherit] font-semibold font-[inherit] z-[6] mq800:text-[1.188rem]">
              I Want to Teach
            </h3>
          </div>
          <h1 className="m-0 absolute top-[7.063rem] left-[0rem] text-[2.25rem] leading-[2.625rem] font-normal font-[inherit] text-[#40919e] z-[9] mq800:text-[1.375rem] mq800:leading-[1.563rem] mq1325:text-[1.813rem] mq1325:leading-[2.125rem]">
            TOPPERS TRUST
          </h1>
        </div>
        <div className="flex flex-row items-start justify-start py-[0rem] pl-[17.375rem] pr-[6.625rem] text-[0.875rem]">
          <div className="relative font-semibold z-[6]">Teacher</div>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string,
};

export default LoginForm;
