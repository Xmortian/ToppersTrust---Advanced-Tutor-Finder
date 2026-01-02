import { useMemo } from "react";
import PropTypes from "prop-types";

const Switch = ({
  className = "",
  icon = false,
  selected = true,
  state = "Enabled",
  switchTop,
  switchLeft,
  switchPosition,
}) => {
  const switchStyle = useMemo(() => {
    return {
      top: switchTop,
      left: switchLeft,
      position: switchPosition,
    };
  }, [switchTop, switchLeft, switchPosition]);

  return (
    <div
      className={`absolute top-[22.813rem] left-[52.688rem] rounded-81xl bg-[#65558f] w-[3.063rem] h-[1.625rem] flex flex-row items-center justify-end py-[0.125rem] px-[0.25rem] box-border data-[icon='false']:data-[state='Disabled']:data-[selected='true']:bg-[rgba(29,27,32,0.12)] data-[icon='false']:data-[state='Disabled']:data-[selected='true']:[&_.handle-shape]:bg-[#fef7ff] ${className}`}
      data-icon={icon}
      data-selected={selected}
      data-state={state}
      style={switchStyle}
    >
      <div className="self-stretch flex-1 relative">
        <div className="absolute top-[calc(50%_-_24px)] right-[-0.75rem] flex flex-row items-center justify-center p-[0.25rem]">
          <div className="rounded-81xl flex flex-col items-center justify-center p-[0.5rem]">
            <div className="handle-shape rounded-3xl bg-[#fff] overflow-hidden flex flex-row items-center justify-center p-[0.687rem]">
              <div className="w-[0.125rem] relative rounded-4xl h-[0.125rem]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Switch.propTypes = {
  className: PropTypes.string,

  /** Variant props */
  icon: PropTypes.bool,
  selected: PropTypes.bool,
  state: PropTypes.string,

  /** Style props */
  switchTop: PropTypes.string,
  switchLeft: PropTypes.string,
  switchPosition: PropTypes.string,
};

export default Switch;
