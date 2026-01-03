import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Edit = ({
  className = "",
  size = 48,
  editWidth,
  editHeight,
  editPosition,
  editTop,
  editLeft,
  icon,
}) => {
  const editStyle = useMemo(() => {
    return {
      width: editWidth,
      height: editHeight,
      position: editPosition,
      top: editTop,
      left: editLeft,
    };
  }, [editWidth, editHeight, editPosition, editTop, editLeft]);

  const navigate = useNavigate();

  const onEditContainerClick = useCallback(() => {
    navigate("/guardian-profile-edit-info");
  }, [navigate]);

  return (
    <div
      className={`w-[1.25rem] h-[1.25rem] relative overflow-hidden shrink-0 cursor-pointer data-[size='24']:[filter:brightness(0)_saturate(100%)_invert(14%)_sepia(96%)_saturate(15%)_hue-rotate(349deg)_brightness(90%)_contrast(110%)] data-[size='24']:[&_.icon]:[filter:brightness(0)_saturate(100%)_invert(14%)_sepia(96%)_saturate(15%)_hue-rotate(349deg)_brightness(90%)_contrast(110%)] data-[size='24']:[&_.icon]:h-[83.75%] data-[size='24']:[&_.icon]:w-[83.75%] data-[size='24']:[&_.icon]:top-[7.92%] data-[size='24']:[&_.icon]:right-[7.92%] data-[size='24']:[&_.icon]:bottom-[8.33%] data-[size='24']:[&_.icon]:left-[8.33%] ${className}`}
      onClick={onEditContainerClick}
      data-size={size}
      style={editStyle}
    >
      <img
        className="icon absolute h-[84%] w-[84%] top-[8%] right-[7.5%] bottom-[8%] left-[8.5%] max-w-full overflow-hidden max-h-full"
        loading="lazy"
        alt=""
        src={icon}
      />
    </div>
  );
};

Edit.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,

  /** Variant props */
  size: PropTypes.number,

  /** Style props */
  editWidth: PropTypes.string,
  editHeight: PropTypes.string,
  editPosition: PropTypes.string,
  editTop: PropTypes.string,
  editLeft: PropTypes.string,
};

export default Edit;
