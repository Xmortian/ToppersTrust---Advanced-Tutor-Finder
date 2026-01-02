import PropTypes from "prop-types";

const DateAndTimeCompactColl = ({
  className = "",
  type = "Time",
  year = "2024",
  time = "9:41 AM",
  month = "Jun 10,",
}) => {
  return (
    <div
      className={`w-[7.938rem] rounded-md flex flex-row items-center justify-end gap-[0.375rem] text-center text-[1.063rem] text-[#007aff] font-Body-Regular ${className}`}
      data-type={type}
    >
      <div className="rounded-md bg-[rgba(120,120,128,0.12)] flex flex-row items-center justify-center py-[0.375rem] px-[0.687rem] gap-[0.312rem]">
        <div className="relative tracking-[-0.43px] leading-[1.375rem]">
          {month}
        </div>
        <div className="relative tracking-[-0.43px] leading-[1.375rem]">
          {year}
        </div>
      </div>
      <div className="w-[5.375rem] rounded-md bg-[rgba(120,120,128,0.12)] h-[2.125rem] hidden flex-row items-start justify-start py-[0.375rem] px-[0.687rem] box-border">
        <div className="relative tracking-[-0.43px] leading-[1.375rem] hidden">
          {time}
        </div>
      </div>
    </div>
  );
};

DateAndTimeCompactColl.propTypes = {
  className: PropTypes.string,
  year: PropTypes.string,
  time: PropTypes.string,
  month: PropTypes.string,

  /** Variant props */
  type: PropTypes.number,
};

export default DateAndTimeCompactColl;
