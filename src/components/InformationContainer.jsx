import Edit from "./Edit";
import PropTypes from "prop-types";

const InformationContainer = ({ className = "" }) => {
  return (
    <div
      className={`w-[41.563rem] flex flex-col items-start justify-start gap-[1.093rem] max-w-full shrink-0 text-left text-[0.938rem] text-[#fff] font-roboto ${className}`}
    >
      <div className="flex flex-row items-start justify-start py-[0rem] px-[0.937rem]">
        <div className="flex flex-row items-end justify-start gap-[0.437rem]">
          <div className="w-[10.688rem] bg-[#1368a4] overflow-hidden shrink-0 flex flex-row items-start justify-start py-[0.187rem] pl-[0.375rem] pr-[0rem] box-border">
            <div className="w-[13rem] relative font-semibold inline-block shrink-0 [text-shadow:1px_0_0_#1368a4,_0_1px_0_#1368a4,_-1px_0_0_#1368a4,_0_-1px_0_#1368a4]">
              Personal Information
            </div>
          </div>
          <div className="flex flex-col items-start justify-end pt-[0rem] px-[0rem] pb-[0.125rem]">
            <Edit size={20} icon="/icon.svg" />
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start relative text-[#000]">
        <div className="w-[19rem] h-[3.75rem] relative overflow-hidden shrink-0 hidden z-[0]" />
        <div className="w-[7.625rem] absolute !!m-[0 important] top-[2.563rem] left-[0.938rem] font-semibold text-transparent !bg-clip-text [background:linear-gradient(#1368a4,_#1368a4),_#000] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block z-[1]">{` `}</div>
        <div className="absolute !!m-[0 important] top-[3.125rem] left-[0.25rem] font-semibold whitespace-pre-wrap inline-block min-w-[0.5rem]">{`  `}</div>
        <div className="w-[8.25rem] h-[1.5rem] relative overflow-hidden shrink-0 hidden z-[3]" />
        <div className="self-stretch h-[19.438rem] relative font-semibold inline-block shrink-0 z-[2] text-[#1368a4]">
          <p className="m-0 whitespace-pre-wrap">Name : Tania Afrooz</p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0 whitespace-pre-wrap">
            Contact Number : +88 01765258907
          </p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0 whitespace-pre-wrap">Email : tania02@gmail.com</p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0 whitespace-pre-wrap">Gender : Female</p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0">
            <span className="whitespace-pre-wrap">{`LinkedIn Profile Link    :  `}</span>
            <span className="text-[#c71313]">Not Given</span>
          </p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0">
            <span>{`Facebook Profile Link : `}</span>
            <span className="text-[#ab2222]">{` `}</span>
            <span className="text-[#c71313]">Not Given</span>
          </p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0 whitespace-pre-wrap">City : Dhaka</p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0 whitespace-pre-wrap">
            Address : M-65/1, Merul Badda, Dhaka-1212
          </p>
          <p className="m-0">&nbsp;</p>
          <p className="m-0 whitespace-pre-wrap">
            Relation with Student : Mother
          </p>
        </div>
      </div>
      <div className="flex flex-row items-start justify-start py-[0rem] px-[0.25rem]">
        <div className="flex flex-col items-start justify-start gap-[0.812rem]">
          <div className="w-[14.063rem] bg-[#1368a4] overflow-hidden flex flex-row items-start justify-start pt-[0.187rem] pb-[0.25rem] pl-[0.562rem] pr-[0rem] box-border">
            <div className="w-[17.875rem] relative font-semibold inline-block shrink-0 [text-shadow:1px_0_0_#1368a4,_0_1px_0_#1368a4,_-1px_0_0_#1368a4,_0_-1px_0_#1368a4]">
              Verification And Security
            </div>
            <div className="h-[1.625rem] w-[10.813rem] relative overflow-hidden shrink-0 hidden" />
          </div>
          <div className="flex flex-row items-start justify-start py-[0rem] px-[0.812rem]">
            <div className="relative font-semibold text-transparent !bg-clip-text [background:linear-gradient(#c00c0c,_#c00c0c),_#000] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block min-w-[7rem]">
              Verified or NOT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

InformationContainer.propTypes = {
  className: PropTypes.string,
};

export default InformationContainer;
