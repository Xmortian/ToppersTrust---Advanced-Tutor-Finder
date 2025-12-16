import { useMemo } from "react";
import PropTypes from "prop-types";

const Phone = ({
  className = "",
  size = 48,
  showPhone,
  phonePosition,
  phoneTop,
  phoneLeft,
  showIcon,
}) => {
  const phoneStyle = useMemo(() => {
    return {
      position: phonePosition,
      top: phoneTop,
      left: phoneLeft,
    };
  }, [phonePosition, phoneTop, phoneLeft]);

  return (
    !!showPhone && (
      <div
        className={`w-[1.25rem] h-[1.25rem] relative overflow-hidden shrink-0 z-[13] ${className}`}
        data-size={size}
        style={phoneStyle}
      >
        {!!showIcon && (
          <img
            className="absolute h-[83%] w-[83%] top-[8.5%] right-[8%] bottom-[8.5%] left-[9%] max-w-full overflow-hidden max-h-full"
            alt=""
            src="/icon.svg"
          />
        )}
      </div>
    )
  );
};

Phone.propTypes = {
  className: PropTypes.string,
  showPhone: PropTypes.bool,
  showIcon: PropTypes.bool,

  /** Variant props */
  size: PropTypes.number,

  /** Style props */
  phonePosition: PropTypes.string,
  phoneTop: PropTypes.string,
  phoneLeft: PropTypes.string,
};

export default Phone;
