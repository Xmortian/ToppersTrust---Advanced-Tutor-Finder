import PropTypes from "prop-types";

const X = ({ className = "", size = 48, showX, icon, showIcon }) => {
  return (
    !!showX && (
      <div
        className={`w-[1rem] relative h-[1rem] overflow-hidden shrink-0 ${className}`}
        data-size={size}
      >
        {!!showIcon && (
          <img
            className="absolute h-3/6 w-6/12 top-[25%] right-[25%] bottom-[25%] left-[25%] max-w-full overflow-hidden max-h-full"
            alt=""
            src={icon}
          />
        )}
      </div>
    )
  );
};

X.propTypes = {
  className: PropTypes.string,
  showX: PropTypes.bool,
  icon: PropTypes.string,
  showIcon: PropTypes.bool,

  /** Variant props */
  size: PropTypes.number,
};

export default X;
