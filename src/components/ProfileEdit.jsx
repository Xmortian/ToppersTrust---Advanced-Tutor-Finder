import FrameComponent2 from "./FrameComponent2";
import PropTypes from "prop-types";

const ProfileEdit = ({ className = "" }) => {
  return (
    <section
      className={`w-[81rem] flex flex-row items-start justify-start py-[0rem] px-[0.437rem] box-border max-w-full text-left text-[1.438rem] text-[#55848c] font-M3-display-large ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[1.312rem] max-w-full">
        <button className="cursor-pointer border-[#2c2b38] border-solid border-[1px] pt-[1.125rem] pb-[0.875rem] pl-[2.187rem] pr-[0rem] bg-[rgba(85,132,140,0.8)] w-[25.125rem] box-border overflow-hidden flex flex-row items-start justify-start min-h-[4.563rem] max-w-full hover:bg-[rgba(110,158,166,0.8)] hover:border-[#5e5e6b] hover:border-solid hover:hover:border-[1px] hover:box-border">
          <div className="w-[61.313rem] relative text-[1.875rem] font-extrabold font-M3-display-large text-transparent !bg-clip-text [background:linear-gradient(#2c2b38,_#2c2b38),_#000] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-left inline-block shrink-0 max-w-[269%] z-[1]">
            Educational Information
          </div>
        </button>
        <FrameComponent2 rectangle53="/rectangle-53.svg" />
      </div>
    </section>
  );
};

ProfileEdit.propTypes = {
  className: PropTypes.string,
};

export default ProfileEdit;
