import PropTypes from "prop-types";

const FrameComponent3 = ({ className = "" }) => {
  return (
    <div
      className={`flex-1 flex flex-col items-start justify-start gap-[1.55rem] max-w-full text-left text-[1rem] text-[#000] font-roboto ${className}`}
    >
      <div className="h-[-0.262rem] flex flex-row items-start justify-start pt-[0rem] px-[0.75rem] pb-[0rem] box-border">
        <div className="relative leading-[100%]">
          <p className="m-0">Address</p>
          <p className="m-0">&nbsp;</p>
        </div>
      </div>
      <div className="self-stretch rounded-31xl [background:linear-gradient(rgba(0,_0,_0,_0),_rgba(0,_0,_0,_0)),_linear-gradient(rgba(0,_0,_0,_0.06),_rgba(0,_0,_0,_0.06)),_linear-gradient(#657efa,_#657efa),_#b3b3b3] overflow-hidden flex flex-row items-start justify-start py-[0.5rem] px-[0.437rem] box-border gap-[0.937rem] max-w-full">
        <div className="h-[1.75rem] w-[13.875rem] relative rounded-31xl overflow-hidden shrink-0 hidden" />
        <img
          className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0"
          loading="lazy"
          alt=""
          src="/location-on.svg"
        />
        <div className="flex flex-col items-start justify-start pt-[0.125rem] px-[0rem] pb-[0rem] box-border max-w-[calc(100%_-_39px)]">
          <div className="relative leading-[100%]">
            E.g: Flat:3E, Tropical Homes, House:12, Road.....
          </div>
        </div>
      </div>
    </div>
  );
};

FrameComponent3.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent3;
