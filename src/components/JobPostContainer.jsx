import PostContent from "./PostContent";
import PropTypes from "prop-types";

const JobPostContainer = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-col items-end justify-start gap-[0.625rem] max-w-full text-left text-[1.625rem] text-[#fff] font-roboto ${className}`}
    >
      <div className="w-[45.125rem] flex flex-row items-start justify-center py-[0rem] px-[1.25rem] box-border max-w-full">
        <div className="flex flex-row items-start justify-start max-w-full [row-gap:20px] mq450:flex-wrap">
          <div className="flex flex-col items-start justify-start py-[0rem] px-[0rem]">
            <h3 className="mr-[-0.063rem] m-0 relative text-[length:inherit] font-extrabold font-[inherit] text-transparent !bg-clip-text [background:linear-gradient(#3b394d,_#3b394d),_#000] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] shrink-0 mq450:text-[1.313rem]">{`Assigned Tutor : `}</h3>
          </div>
          <h3 className="m-0 relative text-[length:inherit] font-extrabold font-[inherit] text-transparent !bg-clip-text [background:linear-gradient(#1368a4,_#1368a4),_#000] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] shrink-0 z-[1] mq450:text-[1.313rem]">
            Taskia Maisha
          </h3>
        </div>
      </div>
      <PostContent />
      <div className="self-stretch h-[3.688rem] relative">
        <h3 className="m-0 absolute top-[0.875rem] left-[15.188rem] text-[length:inherit] font-bold font-[inherit] text-transparent !bg-clip-text [background:linear-gradient(#3b394d,_#3b394d),_#000] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] z-[1] mq450:text-[1.313rem]">
          Feedback or complain box
        </h3>
        <div className="absolute top-[0rem] left-[0rem] w-full h-full">
          <button className="cursor-pointer [border:none] p-0 bg-[transparent] absolute h-full top-[0rem] bottom-[0rem] left-[0.875rem] [background:linear-gradient(#a5acd1,_#a5acd1),_#d9d9d9] w-[47.313rem]" />
          <img
            className="absolute top-[0rem] left-[0rem] w-full h-full z-[2]"
            loading="lazy"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

JobPostContainer.propTypes = {
  className: PropTypes.string,
};

export default JobPostContainer;
