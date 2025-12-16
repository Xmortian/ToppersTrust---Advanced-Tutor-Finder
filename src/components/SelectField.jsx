import { useMemo } from "react";
import {
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  InputAdornment,
} from "@mui/material";
import PropTypes from "prop-types";

const SelectField = ({
  className = "",
  state = "Default",
  valueType = "Default",
  description = "Description",
  hasLabel = true,
  label = "Tuition Type",
  open1 = false,
  hasDescription = false,
  value = "Home Tutoring",
  tuitionTypeHeight,
  tuitionTypeWidth,
  value1,
}) => {
  const tuitionTypeStyle = useMemo(() => {
    return {
      height: tuitionTypeHeight,
      width: tuitionTypeWidth,
    };
  }, [tuitionTypeHeight, tuitionTypeWidth]);

  return (
    <div
      className={`h-[4.875rem] w-[23rem] flex flex-col items-start justify-start relative gap-[0.5rem] text-left text-[1rem] text-[#1e1e1e] font-roboto data-[state='Default']:data-[valueType='Placeholder']:[&_.select1]:text-[#b3b3b3] ${className}`}
      data-state={state}
      data-valueType={valueType}
      style={tuitionTypeStyle}
    >
      {!!hasLabel && (
        <div className="self-stretch relative leading-[140%] z-[0]">
          {label}
        </div>
      )}
      {!!hasDescription && (
        <div className="w-[15rem] relative leading-[140%] text-[#757575] z-[1]">
          {description}
        </div>
      )}
      <FormControl
        className="select1 self-stretch h-[2.563rem] font-roboto text-[1rem] text-[#1e1e1e] min-w-[15rem] z-[2]"
        variant="standard"
        sx={{
          borderRadius: "0px 0px 0px 0px",
          width: "368px",
          height: "40px",
          m: 0,
          p: 0,
          "& .MuiInputBase-root": {
            m: 0,
            p: 0,
            minHeight: "40px",
            justifyContent: "center",
            display: "inline-flex",
          },
          "& .MuiInputLabel-root": {
            m: 0,
            p: 0,
            minHeight: "40px",
            display: "inline-flex",
          },
          "& .MuiMenuItem-root": {
            m: 0,
            p: 0,
            height: "40px",
            display: "inline-flex",
          },
          "& .MuiSelect-select": {
            m: 0,
            p: 0,
            height: "40px",
            alignItems: "center",
            display: "inline-flex",
          },
          "& .MuiInput-input": { m: 0, p: 0 },
          "& .MuiInputBase-input": { textAlign: "left", p: "0 !important" },
        }}
      >
        <InputLabel color="primary" />
        <Select color="primary" disableUnderline displayEmpty />
        <FormHelperText />
      </FormControl>
      <div className="!!m-[0 important] absolute top-[0.5rem] left-[0.5rem] shadow-[0px_1px_4px_rgba(12,_12,_13,_0.1),_0px_1px_4px_rgba(12,_12,_13,_0.05)] rounded-Radius-200 bg-[#fff] border-[#d9d9d9] border-solid border-[1px] hidden flex-col items-start justify-start p-[0.5rem] gap-[0.5rem] z-[3]">
        <div className="relative leading-[140%] font-semibold">{value1}</div>
        <div className="relative leading-[140%]">Option 2</div>
        <div className="relative leading-[140%]">Option 3</div>
        <div className="relative leading-[140%]">Option 4</div>
        <div className="relative leading-[140%]">Option 5</div>
      </div>
    </div>
  );
};

SelectField.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  hasLabel: PropTypes.bool,
  label: PropTypes.string,
  open1: PropTypes.bool,
  hasDescription: PropTypes.bool,
  value: PropTypes.string,
  value1: PropTypes.string,

  /** Variant props */
  state: PropTypes.number,
  valueType: PropTypes.string,

  /** Style props */
  tuitionTypeHeight: PropTypes.string,
  tuitionTypeWidth: PropTypes.string,
};

export default SelectField;
