import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Phone from "./Phone";
import PropTypes from "prop-types";

const FrameComponent = ({ className = "" }) => {
  const navigate = useNavigate();

  const onRectangleClick = useCallback(() => {
    navigate("/guardian-profile-edit-info");
  }, [navigate]);

  return (
    <div
      className={`self-stretch h-[41.375rem] rounded-11xl bg-[rgba(179,179,179,0.15)] border-[#1368a4] border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start justify-start pt-[3.187rem] pb-[7.437rem] pl-[1.5rem] pr-[1.25rem] gap-[0.875rem] max-w-full text-left text-[0.938rem] font-roboto lg:pt-[1.313rem] lg:pb-[3.125rem] lg:box-border mq750:h-auto mq750:pt-[1.25rem] mq750:pb-[2rem] mq750:box-border ${className}`}
    >
      <div className="mt-[-161.907rem] self-stretch flex flex-row items-start justify-start pt-[0rem] pb-[159.218rem] pl-[206.687rem] pr-[0rem] lg:pb-[103.5rem] lg:box-border mq1050:pb-[67.25rem] mq1050:box-border mq450:pl-[1.25rem] mq450:box-border mq750:pl-[103.313rem] mq750:pb-[43.688rem] mq750:box-border">
        <img
          className="h-[1.813rem] w-[17.813rem] relative"
          alt=""
          src="/rectangle-28.svg"
        />
      </div>
      <div className="flex flex-row items-start justify-start py-[0rem] pl-[15.25rem] pr-[15.5rem] mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border mq750:pl-[7.625rem] mq750:pr-[7.75rem] mq750:box-border">
        <img
          className="h-[4rem] w-[3.75rem] relative"
          loading="lazy"
          alt=""
          src="/person.svg"
        />
      </div>
      <div className="self-stretch flex flex-row items-start justify-end pt-[0rem] px-[2.687rem] pb-[1.437rem] mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border">
        <div className="w-[19.875rem] relative font-semibold text-transparent !bg-clip-text [background:linear-gradient(#1368a4,_#1368a4),_#000] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block shrink-0">
          Guardian/Student ID : 22014
        </div>
      </div>
      <div className="self-stretch h-[3.688rem] flex flex-row items-start justify-start pt-[0rem] px-[0rem] pb-[1rem] box-border max-w-full">
        <div className="self-stretch flex-1 flex flex-row items-start justify-start relative max-w-full">
          <div className="h-[2.313rem] w-[35.25rem] absolute !!m-[0 important] top-[-0.312rem] left-[-0.75rem] rounded-41xl flex items-center justify-center z-[0]">
            <img
              className="h-full w-full object-contain absolute left-[0rem] top-[0.25rem] [transform:scale(3.162)]"
              alt=""
            />
          </div>
          <div className="self-stretch flex-1 rounded-mini [background:linear-gradient(#e8f1fd,_#e8f1fd),_#d9d9d9] border-[#e8f1fd] border-solid border-[1px] box-border flex flex-row items-start justify-between pt-[0.687rem] pb-[0.125rem] pl-[12.875rem] pr-[4.125rem] gap-[1.25rem] max-w-full z-[1] mq450:pl-[1.25rem] mq450:box-border mq750:pl-[6.438rem] mq750:pr-[2.063rem] mq750:box-border">
            <div className="h-[2.75rem] w-[34.563rem] relative rounded-mini [background:linear-gradient(#e8f1fd,_#e8f1fd),_#d9d9d9] border-[#e8f1fd] border-solid border-[1px] box-border hidden max-w-full" />
            <div className="w-[12.125rem] relative font-semibold text-transparent !bg-clip-text [background:linear-gradient(#1368a4,_#1368a4),_#000] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block shrink-0 z-[2]">
              Profile Completed: 20%
            </div>
            <div className="flex flex-col items-start justify-start pt-[0.5rem] px-[0rem] pb-[0rem]">
              <img
                className="w-[1.25rem] h-[1.125rem] relative overflow-hidden shrink-0 z-[3]"
                loading="lazy"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch h-[4.188rem] flex flex-row items-start justify-start py-[0.812rem] pl-[13.687rem] pr-[13.375rem] box-border relative gap-[0.25rem] mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border mq750:flex-wrap mq750:pl-[6.813rem] mq750:pr-[6.688rem] mq750:box-border">
        <div
          className="h-[calc(100%_-_24px)] w-full absolute !!m-[0 important] top-[0rem] right-[0rem] bottom-[1.5rem] left-[0rem] rounded-mini [background:linear-gradient(#e8f1fd,_#e8f1fd),_#d9d9d9] cursor-pointer"
          onClick={onRectangleClick}
        />
        <div className="flex flex-col items-start justify-start pt-[0.062rem] px-[0rem] pb-[0rem]">
          <img
            className="w-[1.063rem] h-[0.875rem] relative z-[1]"
            loading="lazy"
            alt=""
            src="/edit.svg"
          />
        </div>
        <div className="flex-1 relative font-semibold text-transparent !bg-clip-text [background:linear-gradient(#1368a4,_#1368a4),_#000] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] z-[1]">
          Edit Profile
        </div>
      </div>
      <div className="w-[16.625rem] flex flex-row items-start justify-start pt-[0rem] px-[2.625rem] pb-[0.812rem] box-border mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border">
        <div className="flex-1 relative font-semibold text-transparent !bg-clip-text [background:linear-gradient(#1368a4,_#1368a4),_#000] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
          Email
        </div>
      </div>
      <div className="w-[6.25rem] h-[1.25rem] relative overflow-hidden shrink-0 hidden" />
      <div className="self-stretch flex flex-row items-start justify-end pt-[0rem] px-[3.812rem] pb-[0.562rem]">
        <img
          className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 z-[3]"
          loading="lazy"
          alt=""
        />
      </div>
      <div className="w-[14.063rem] flex flex-row items-start justify-start pt-[0rem] px-[2.625rem] pb-[3.25rem] box-border">
        <div className="flex-1 relative font-semibold text-transparent !bg-clip-text [background:linear-gradient(#1368a4,_#1368a4),_#000] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] z-[1]">
          Contact Number
        </div>
      </div>
      <Phone
        size={20}
        showPhone={false}
        phonePosition="relative"
        phoneTop="unset"
        phoneLeft="unset"
        showIcon={false}
      />
      <div className="w-[19.125rem] flex flex-row items-start justify-start py-[0rem] px-[2.187rem] box-border">
        <div className="flex-1 relative font-semibold text-transparent !bg-clip-text [background:linear-gradient(#1368a4,_#1368a4),_#000] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] whitespace-pre-wrap">
          {" "}
          Address
        </div>
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
