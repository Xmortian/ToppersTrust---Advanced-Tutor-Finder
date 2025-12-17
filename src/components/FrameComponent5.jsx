import FrameComponent4 from "./FrameComponent4";
import Switch from "./Switch";
import SelectField from "./SelectField";
import PropTypes from "prop-types";

const FrameComponent5 = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start gap-[2.375rem] max-w-full text-left text-[1rem] text-[#000] font-roboto mq450:gap-[1.188rem] ${className}`}
    >
      <FrameComponent4 />
      <div className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[1.243rem] box-border gap-[1.718rem] max-w-full">
        <div className="flex flex-row items-start justify-start py-[0rem] px-[0.375rem]">
          <div className="relative leading-[100%]">Tutor Gender Preference</div>
        </div>
        <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pl-[0.25rem] pr-[0rem] box-border max-w-full">
          <div className="flex-1 flex flex-col items-start justify-start gap-[3.125rem] max-w-full mq450:gap-[1.563rem]">
            <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pl-[0.562rem] pr-[0rem] box-border max-w-full">
              <div className="flex-1 flex flex-row items-start justify-start max-w-full [row-gap:20px] mq450:flex-wrap">
                <div className="w-[7.625rem] flex flex-row items-start justify-start gap-[0.687rem]">
                  <Switch
                    icon={false}
                    selected
                    state="Enabled"
                    switchTop="unset"
                    switchLeft="unset"
                    switchPosition="unset"
                  />
                  <div className="flex-1 flex flex-col items-start justify-start pt-[0.25rem] px-[0rem] pb-[0rem]">
                    <div className="self-stretch relative leading-[100%]">
                      Male
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-row items-start justify-start gap-[0.062rem] min-w-[11.75rem]">
                  <div className="h-[1.625rem] w-[4rem] relative">
                    <Switch
                      icon={false}
                      selected
                      state="Disabled"
                      switchTop="0rem"
                      switchLeft="0rem"
                      switchPosition="absolute"
                    />
                    <Switch
                      icon={false}
                      selected
                      state="Disabled"
                      switchTop="0rem"
                      switchLeft="0rem"
                      switchPosition="absolute"
                    />
                  </div>
                  <div className="w-[4.375rem] flex flex-col items-start justify-start pt-[0.25rem] px-[0rem] pb-[0rem] box-border">
                    <div className="self-stretch relative leading-[100%]">
                      Female
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start py-[0rem] pl-[0rem] pr-[1rem]">
                    <Switch
                      icon={false}
                      selected
                      state="Disabled"
                      switchTop="unset"
                      switchLeft="unset"
                      switchPosition="unset"
                    />
                  </div>
                  <div className="flex-1 flex flex-col items-start justify-start pt-[0.312rem] px-[0rem] pb-[0rem]">
                    <div className="self-stretch relative leading-[100%]">
                      Any
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative leading-[100%]">Salary (BDT)</div>
          </div>
        </div>
        <img
          className="w-[23.813rem] relative max-h-full object-contain max-w-full"
          loading="lazy"
          alt=""
          src="/line-10.svg"
        />
      </div>
      <FrameComponent4
        frameDivPadding="0rem 0rem 1rem"
        frameDivAlignSelf="unset"
      />
      <div className="w-[25.063rem] flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[1.187rem] box-border gap-[1.25rem] max-w-full">
        <div className="w-[10.438rem] relative leading-[100%] inline-block">
          Student Gender
        </div>
        <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pl-[1.125rem] pr-[0rem] box-border max-w-full">
          <div className="flex-1 flex flex-row items-start justify-start max-w-full [row-gap:20px] mq450:flex-wrap">
            <div className="w-[7.625rem] flex flex-row items-start justify-start gap-[0.687rem]">
              <Switch
                icon={false}
                selected
                state="Enabled"
                switchTop="unset"
                switchLeft="unset"
                switchPosition="unset"
              />
              <div className="flex-1 flex flex-col items-start justify-start pt-[0.375rem] px-[0rem] pb-[0rem]">
                <div className="self-stretch relative leading-[100%]">Male</div>
              </div>
            </div>
            <div className="flex-1 flex flex-row items-start justify-start min-w-[10.625rem]">
              <div className="flex-[0.7538] flex flex-col items-start justify-start py-[0rem] pl-[0rem] pr-[1rem]">
                <Switch
                  icon={false}
                  selected
                  state="Disabled"
                  switchTop="unset"
                  switchLeft="unset"
                  switchPosition="unset"
                />
              </div>
              <div className="flex-1 flex flex-col items-start justify-start pt-[0.375rem] px-[0rem] pb-[0rem]">
                <div className="self-stretch relative leading-[100%]">
                  Female
                </div>
              </div>
              <div className="flex-[0.7656] flex flex-col items-start justify-start py-[0rem] pl-[0rem] pr-[0.937rem]">
                <Switch
                  icon={false}
                  selected
                  state="Disabled"
                  switchTop="unset"
                  switchLeft="unset"
                  switchPosition="unset"
                />
              </div>
              <div className="w-[3.813rem] overflow-hidden shrink-0 flex flex-row items-start justify-start pt-[0.312rem] pb-[0.625rem] pl-[0.125rem] pr-[0rem] box-border">
                <div className="w-[5.438rem] relative leading-[100%] inline-block shrink-0">
                  Any
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SelectField
        state="Default"
        valueType="Default"
        description="Description"
        hasLabel
        label="Select City"
        hasDescription={false}
        tuitionTypeHeight="4.813rem"
        tuitionTypeWidth="23rem"
        value1="Dhaka"
      />
    </div>
  );
};

FrameComponent5.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent5;
