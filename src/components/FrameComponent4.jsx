import { useMemo } from "react";
import SelectField from "./SelectField";
import PropTypes from "prop-types";

const FrameComponent4 = ({
  className = "",
  frameDivPadding,
  frameDivAlignSelf,
}) => {
  const frameDiv2Style = useMemo(() => {
    return {
      padding: frameDivPadding,
      alignSelf: frameDivAlignSelf,
    };
  }, [frameDivPadding, frameDivAlignSelf]);

  return (
    <div
      className={`flex flex-row items-start justify-start py-[0rem] px-[0.375rem] box-border max-w-full ${className}`}
      style={frameDiv2Style}
    >
      <SelectField
        state="Default"
        valueType="Placeholder"
        description="Description"
        hasLabel
        label="No of Students"
        hasDescription={false}
        tuitionTypeHeight="4.813rem"
        tuitionTypeWidth="23rem"
        value1="1"
      />
    </div>
  );
};

FrameComponent4.propTypes = {
  className: PropTypes.string,

  /** Style props */
  frameDivPadding: PropTypes.string,
  frameDivAlignSelf: PropTypes.string,
};

export default FrameComponent4;
