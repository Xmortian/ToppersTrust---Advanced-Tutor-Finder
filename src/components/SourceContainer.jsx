import { useMemo } from "react";
import Search from "./Search";
import PropTypes from "prop-types";

const SourceContainer = ({ className = "", frameDivGap }) => {
  const frameDivStyle = useMemo(() => {
    return {
      gap: frameDivGap,
    };
  }, [frameDivGap]);

  return (
    <div
      className={`flex-1 rounded-xl [background:linear-gradient(#1368a4,_#1368a4),_rgba(19,_104,_164,_0.44)] overflow-hidden flex flex-col items-start justify-start pt-[1.5rem] px-[1.875rem] pb-[7.062rem] box-border gap-[6rem] max-w-full text-left text-[0.938rem] text-[#1e1e1e] font-roboto mq450:gap-[1.5rem] mq450:pt-[1.25rem] mq450:pb-[4.563rem] mq450:box-border mq750:gap-[3rem] ${className}`}
    >
      <div className="w-[14rem] overflow-hidden flex flex-row items-start justify-start pt-[0rem] pb-[0.687rem] pl-[0rem] pr-[1.812rem] box-border">
        <div className="h-[2.188rem] flex-1 relative font-semibold text-transparent !bg-clip-text [background:linear-gradient(#1368a4,_#1368a4),_#000] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block z-[1]">
          You are
        </div>
      </div>
      <div className="w-[6.25rem] h-[6.25rem] relative overflow-hidden shrink-0 hidden" />
      <div
        className="flex flex-col items-start justify-start gap-[1.375rem] max-w-full"
        style={frameDivStyle}
      >
        <div className="w-[31.563rem] relative font-semibold text-transparent !bg-clip-text [background:linear-gradient(#fff,_#fff),_#fff] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block [text-shadow:1px_0_0_#1368a4,_0_1px_0_#1368a4,_-1px_0_0_#1368a4,_0_-1px_0_#1368a4] max-w-full">
          How did you know about us?
        </div>
        <Search state="Default" valueType="Default" />
      </div>
    </div>
  );
};

SourceContainer.propTypes = {
  className: PropTypes.string,

  /** Style props */
  frameDivGap: PropTypes.string,
};

export default SourceContainer;
