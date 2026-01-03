import { useMemo } from "react";
import X from "./X";
import PropTypes from "prop-types";

const Search = ({
  className = "",
  state = "Default",
  valueType = "Default",
  value,
  searchWidth,
  searchHeight,
  searchBorderRadius,
  searchBorder,
  searchPosition,
  searchTop,
  searchLeft,
  valueFontSize,
  valueColor,
  valueBorder,
  valueOutline,
  valueFontWeight,
  valueBackgroundColor,
  valueBackground,
  valueWebkitBackgroundClip,
  valueWebkitTextFillColor,
  valueDisplay,
}) => {
  const searchStyle = useMemo(() => {
    return {
      width: searchWidth,
      height: searchHeight,
      borderRadius: searchBorderRadius,
      border: searchBorder,
      position: searchPosition,
      top: searchTop,
      left: searchLeft,
    };
  }, [
    searchWidth,
    searchHeight,
    searchBorderRadius,
    searchBorder,
    searchPosition,
    searchTop,
    searchLeft,
  ]);

  const valueStyle = useMemo(() => {
    return {
      fontSize: valueFontSize,
      color: valueColor,
      border: valueBorder,
      outline: valueOutline,
      fontWeight: valueFontWeight,
      backgroundColor: valueBackgroundColor,
      background: valueBackground,
      webkitBackgroundClip: valueWebkitBackgroundClip,
      webkitTextFillColor: valueWebkitTextFillColor,
      display: valueDisplay,
    };
  }, [
    valueFontSize,
    valueColor,
    valueBorder,
    valueOutline,
    valueFontWeight,
    valueBackgroundColor,
    valueBackground,
    valueWebkitBackgroundClip,
    valueWebkitTextFillColor,
    valueDisplay,
  ]);

  return (
    <div
      className={`w-[38.75rem] h-[3.063rem] rounded-Radius-200 [background:linear-gradient(#e8f1fd,_#e8f1fd),_#fff] border-[#1368a4] border-solid border-Stroke-Border box-border overflow-hidden shrink-0 flex flex-row items-center justify-start py-[0.75rem] px-[1rem] gap-[0.5rem] z-[1] text-left text-[1rem] text-[#1e1e1e] font-roboto ${className}`}
      data-state={state}
      data-valueType={valueType}
      style={searchStyle}
    >
      <div className="flex-1 relative leading-[100%]" style={valueStyle}>
        {value}
      </div>
      <X size={16} showX icon="/icon1.svg" showIcon={false} />
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,

  /** Variant props */
  state: PropTypes.number,
  valueType: PropTypes.number,

  /** Style props */
  searchWidth: PropTypes.string,
  searchHeight: PropTypes.string,
  searchBorderRadius: PropTypes.string,
  searchBorder: PropTypes.string,
  searchPosition: PropTypes.string,
  searchTop: PropTypes.string,
  searchLeft: PropTypes.string,
  valueFontSize: PropTypes.string,
  valueColor: PropTypes.string,
  valueBorder: PropTypes.string,
  valueOutline: PropTypes.string,
  valueFontWeight: PropTypes.string,
  valueBackgroundColor: PropTypes.string,
  valueBackground: PropTypes.string,
  valueWebkitBackgroundClip: PropTypes.string,
  valueWebkitTextFillColor: PropTypes.string,
  valueDisplay: PropTypes.string,
};

export default Search;
