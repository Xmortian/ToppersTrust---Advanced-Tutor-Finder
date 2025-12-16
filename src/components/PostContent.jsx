import { useMemo } from "react";
import PropTypes from "prop-types";

const PostContent = ({
  className = "",
  postContentJustifyContent,
  postContentPadding,
  postDetailsContainerBackground,
  rectangleDivBackground,
}) => {
  const postContentStyle = useMemo(() => {
    return {
      justifyContent: postContentJustifyContent,
      padding: postContentPadding,
    };
  }, [postContentJustifyContent, postContentPadding]);

  const postDetailsContainerStyle = useMemo(() => {
    return {
      background: postDetailsContainerBackground,
    };
  }, [postDetailsContainerBackground]);

  const rectangleDivStyle = useMemo(() => {
    return {
      background: rectangleDivBackground,
    };
  }, [rectangleDivBackground]);

  return (
    <div
      className={`self-stretch flex flex-row items-start justify-end pt-[0rem] pb-[0.437rem] pl-[0.5rem] pr-[0.437rem] box-border max-w-full text-left text-[1.625rem] text-[#fff] font-roboto ${className}`}
      style={postContentStyle}
    >
      <div
        className="flex-1 rounded-11xl [background:linear-gradient(rgba(58,_57,_77,_0.86),_rgba(58,_57,_77,_0.86)),_#000] flex flex-col items-start justify-start pt-[2.25rem] pb-[2.062rem] pl-[4.875rem] pr-[0.312rem] box-border max-w-full z-[6] mq450:pt-[1.438rem] mq450:pb-[1.313rem] mq450:box-border mq750:pl-[2.438rem] mq750:box-border"
        style={postDetailsContainerStyle}
      >
        <div
          className="w-[47.25rem] h-[28.5rem] relative rounded-11xl [background:linear-gradient(rgba(58,_57,_77,_0.86),_rgba(58,_57,_77,_0.86)),_#000] hidden max-w-full z-[1]"
          style={rectangleDivStyle}
        />
        <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pl-[1.437rem] pr-[0rem] box-border max-w-full">
          <h3 className="m-0 h-[3.938rem] flex-1 relative text-[length:inherit] font-normal font-[inherit] inline-block max-w-full z-[7] mq450:text-[1.313rem]">
            <p className="m-0">{`Need X Tutor for Class Y Student Z Days/Week `}</p>
          </h3>
        </div>
        <div className="w-[38.125rem] flex flex-row items-start justify-between gap-[1.25rem] max-w-full mt-[-1.188rem] relative text-[1.125rem] mq450:flex-wrap">
          <div className="w-[8.938rem] flex flex-col items-start justify-start gap-[2.656rem]">
            <div className="self-stretch flex flex-col items-start justify-start gap-[2.125rem]">
              <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pl-[1.437rem] pr-[0.125rem]">
                <div className="flex-1 relative z-[8]">Code : 0000</div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[1.5rem]">
                <div className="self-stretch relative z-[7]">
                  📅 Days / Week
                </div>
                <div className="relative inline-block min-w-[4.313rem] z-[7]">
                  INT 1-7
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-[1.437rem]">
              <div className="relative inline-block min-w-[5.375rem] z-[7]">
                💰 Salary
              </div>
              <div className="relative inline-block min-w-[2rem] z-[7]">
                INT
              </div>
            </div>
            <div className="w-[6.75rem] flex flex-col items-start justify-start gap-[1.25rem]">
              <div className="self-stretch relative z-[7]">📍 Location</div>
              <div className="flex flex-row items-start justify-start py-[0rem] px-[0.125rem]">
                <div className="relative inline-block min-w-[2.438rem] z-[7]">
                  STR
                </div>
              </div>
            </div>
          </div>
          <div className="w-[12.063rem] flex flex-col items-start justify-start pt-[0.437rem] px-[0rem] pb-[0rem] box-border">
            <div className="self-stretch flex flex-col items-start justify-start gap-[1.5rem]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[0.625rem]">
                <div className="self-stretch relative z-[8]">{`Posted Date : M/D/Y `}</div>
                <div className="self-stretch flex flex-row items-start justify-start py-[0rem] pl-[0.687rem] pr-[0.5rem]">
                  <div className="flex-1 relative z-[7]">
                    👥 No. of Students
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start pt-[0rem] px-[0.687rem] pb-[1.125rem]">
                <div className="relative inline-block min-w-[2.063rem] z-[7]">
                  INT
                </div>
              </div>
              <div className="flex flex-row items-start justify-start pt-[0rem] px-[0.562rem] pb-[1.187rem]">
                <div className="flex flex-col items-start justify-start gap-[1.437rem]">
                  <div className="relative inline-block min-w-[6.688rem] z-[7]">
                    📚 Subjects
                  </div>
                  <div className="relative inline-block min-w-[2.375rem] z-[7]">
                    STR
                  </div>
                </div>
              </div>
              <div className="w-[11.375rem] flex flex-row items-start justify-start py-[0rem] px-[0.562rem] box-border">
                <div className="flex-1 flex flex-col items-start justify-start gap-[1.25rem]">
                  <div className="self-stretch relative z-[7]">
                    💳 Payment Basis
                  </div>
                  <div className="relative inline-block min-w-[2.438rem] z-[7]">
                    M/C
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PostContent.propTypes = {
  className: PropTypes.string,

  /** Style props */
  postContentJustifyContent: PropTypes.string,
  postContentPadding: PropTypes.string,
  postDetailsContainerBackground: PropTypes.string,
  rectangleDivBackground: PropTypes.string,
};

export default PostContent;
