import { useMemo } from "react";
import PropTypes from "prop-types";

const FrameComponent2 = ({
  className = "",
  frameDivPadding,
  rectangle53,
  spanFontSize,
  bachelorsHonorsFontSize,
  spanFontSize1,
  bRACUniversityFontSize,
  spanColor,
  majorGroupCSEFontSize,
  iDCardNo2FontSize,
  resultFontSize,
  blankLineFontSize,
  higherSecondaryColor,
  blankLineColor,
  instituteColor,
  majorGroupSciFontSize,
  iDCardNoFontSize,
  resultFontSize1,
  blankLineFontSize1,
  blankLineFontSize2,
  blankLineFontSize3,
}) => {
  const frameDiv1Style = useMemo(() => {
    return {
      padding: frameDivPadding,
    };
  }, [frameDivPadding]);

  const spanStyle = useMemo(() => {
    return {
      fontSize: spanFontSize,
    };
  }, [spanFontSize]);

  const bachelorsHonorsStyle = useMemo(() => {
    return {
      fontSize: bachelorsHonorsFontSize,
    };
  }, [bachelorsHonorsFontSize]);

  const span1Style = useMemo(() => {
    return {
      fontSize: spanFontSize1,
    };
  }, [spanFontSize1]);

  const bRACUniversityStyle = useMemo(() => {
    return {
      fontSize: bRACUniversityFontSize,
    };
  }, [bRACUniversityFontSize]);

  const span2Style = useMemo(() => {
    return {
      color: spanColor,
    };
  }, [spanColor]);

  const majorGroupCSEStyle = useMemo(() => {
    return {
      fontSize: majorGroupCSEFontSize,
    };
  }, [majorGroupCSEFontSize]);

  const iDCardNo2Style = useMemo(() => {
    return {
      fontSize: iDCardNo2FontSize,
    };
  }, [iDCardNo2FontSize]);

  const resultStyle = useMemo(() => {
    return {
      fontSize: resultFontSize,
    };
  }, [resultFontSize]);

  const blankLineStyle = useMemo(() => {
    return {
      fontSize: blankLineFontSize,
    };
  }, [blankLineFontSize]);

  const higherSecondaryStyle = useMemo(() => {
    return {
      color: higherSecondaryColor,
    };
  }, [higherSecondaryColor]);

  const blankLine1Style = useMemo(() => {
    return {
      color: blankLineColor,
    };
  }, [blankLineColor]);

  const instituteStyle = useMemo(() => {
    return {
      color: instituteColor,
    };
  }, [instituteColor]);

  const majorGroupSciStyle = useMemo(() => {
    return {
      fontSize: majorGroupSciFontSize,
    };
  }, [majorGroupSciFontSize]);

  const iDCardNoStyle = useMemo(() => {
    return {
      fontSize: iDCardNoFontSize,
    };
  }, [iDCardNoFontSize]);

  const result1Style = useMemo(() => {
    return {
      fontSize: resultFontSize1,
    };
  }, [resultFontSize1]);

  const blankLine2Style = useMemo(() => {
    return {
      fontSize: blankLineFontSize1,
    };
  }, [blankLineFontSize1]);

  const blankLine3Style = useMemo(() => {
    return {
      fontSize: blankLineFontSize2,
    };
  }, [blankLineFontSize2]);

  const blankLine4Style = useMemo(() => {
    return {
      fontSize: blankLineFontSize3,
    };
  }, [blankLineFontSize3]);

  return (
    <div
      className={`self-stretch flex flex-row items-start justify-start py-[0rem] pl-[1.062rem] pr-[0rem] box-border max-w-full text-left text-[1.438rem] text-[#55848c] font-M3-display-large ${className}`}
      style={frameDiv1Style}
    >
      <div className="flex-1 flex flex-row items-start justify-start relative max-w-full">
        <div className="h-[14.438rem] w-[92.375rem] absolute !!m-[0 important] right-[-9.875rem] bottom-[0.688rem] [background:linear-gradient(#55848c,_#55848c),_linear-gradient(#ccdadd,_#ccdadd),_rgba(217,_217,_217,_0.3)] border-[#3a394d] border-solid border-[1px] box-border" />
        <img
          className="h-[14.563rem] w-[91.438rem] absolute !!m-[0 important] top-[2.375rem] right-[-9.875rem]"
          loading="lazy"
          alt=""
          src={rectangle53}
        />
        <div className="h-[32.625rem] flex-1 relative font-extrabold inline-block [filter:drop-shadow(0px_4px_6px_rgba(0,_0,_0,_0.25))] z-[1] mq450:text-[1.125rem]">
          <p className="m-0 text-[1.688rem] text-[#3a394d]">&nbsp;</p>
          <p className="m-0 text-[1.563rem] text-[#3a394d]">
            <span className="whitespace-pre-wrap" style={spanStyle}>
              <span className="text-[#55848c] whitespace-pre-wrap">{`  `}</span>
              <span className="text-[#55848c]">{` `}</span>
            </span>
            <span>
              <span className="whitespace-pre-wrap">{`                                                                                                                                   `}</span>
            </span>
          </p>
          <p className="m-0">
            <span>
              <span
                className="whitespace-pre-wrap"
                style={bachelorsHonorsStyle}
              >{`Bachelors/Honors                                                                       `}</span>
            </span>
          </p>
          <p className="m-0">
            <span>
              <span
                className="whitespace-pre-wrap"
                style={span1Style}
              >{` `}</span>
            </span>
          </p>
          <p className="m-0">
            <span>
              <span className="whitespace-pre-wrap">{`Institute                    : `}</span>
            </span>
            <span className="whitespace-pre-wrap" style={bRACUniversityStyle}>
              <span className="text-[#55848c]"> BRAC University</span>
            </span>
            <span className="text-[1.563rem]">
              <span className="text-[#3a394d] whitespace-pre-wrap">{`                                                                    Curriculum          :   `}</span>
              <span className="text-[#55848c] whitespace-pre-wrap">{`English Version  `}</span>
              <span
                className="whitespace-pre-wrap"
                style={span2Style}
              >{`                                                                                                                             `}</span>
            </span>
          </p>
          <p className="m-0 text-[#3a394d]">
            <span className="whitespace-pre-wrap">
              <span className="whitespace-pre-wrap">{`Exam/Degree Title  : `}</span>
              <span className="text-[#55848c] whitespace-pre-wrap">{` B.Sc                                                                                              `}</span>
              <span className="text-[#3a394d] whitespace-pre-wrap">{`  From Date              : `}</span>
              <span className="text-[#55848c] whitespace-pre-wrap">
                {" "}
                2022-09-10
              </span>
            </span>
          </p>
          <p className="m-0">
            <span className="whitespace-pre-wrap" style={majorGroupCSEStyle}>
              <span className="text-[#3a394d] whitespace-pre-wrap">{`Major/Group            :  `}</span>
              <span className="whitespace-pre-wrap">{`CSE                                                                                                 `}</span>
              <span className="text-[#3a394d] whitespace-pre-wrap">{`To Date                   :  `}</span>
              <span className="text-[#55848c] whitespace-pre-wrap">
                {" "}
                2026-12-31
              </span>
            </span>
          </p>
          <p className="m-0">
            <span className="whitespace-pre-wrap" style={iDCardNo2Style}>
              <span className="text-[#3a394d] whitespace-pre-wrap">{`ID Card No                : `}</span>
              <span className="whitespace-pre-wrap">{` 22201827                                                                                     `}</span>
              <span className="text-[#3a394d] whitespace-pre-wrap">{`Year of Passing     : `}</span>
              <span className="text-[#55848c] whitespace-pre-wrap">{`  2026                                      `}</span>
            </span>
          </p>
          <p className="m-0">
            <span className="whitespace-pre-wrap" style={resultStyle}>
              <span className="text-[#3a394d] whitespace-pre-wrap">{`Result                        :  `}</span>
              <span className="whitespace-pre-wrap">{`CGPA- 3.74                                                                                   `}</span>
              <span className="text-[#3a394d] whitespace-pre-wrap">
                Current Institute :
              </span>
              <span className="text-[#55848c] whitespace-pre-wrap"> Yes</span>
            </span>
          </p>
          <p className="m-0 text-[#3a394d]">
            <span className="whitespace-pre-wrap" style={blankLineStyle}>
              <span className="whitespace-pre-wrap">&nbsp;</span>
            </span>
          </p>
          <p className="m-0 text-[1.688rem]">
            <span className="whitespace-pre-wrap" style={higherSecondaryStyle}>
              <span>Higher Secondary</span>
            </span>
          </p>
          <p className="m-0">
            <span className="whitespace-pre-wrap" style={blankLine1Style}>
              <span>&nbsp;</span>
            </span>
          </p>
          <p className="m-0">
            <span>
              <span className="whitespace-pre-wrap" style={instituteStyle}>
                Institute :
              </span>
              <span className="text-[#3a394d] whitespace-pre-wrap">{`  `}</span>
              <span className="whitespace-pre-wrap">{`Dhaka College                                                                              `}</span>
            </span>
            <span className="text-[1.563rem]">
              <span className="text-[#3a394d] whitespace-pre-wrap">{`Curriculum            :    `}</span>
              <span className="text-[#55848c]">Bangla Version</span>
            </span>
          </p>
          <p className="m-0">
            <span className="whitespace-pre-wrap">
              <span className="text-[#3a394d] whitespace-pre-wrap">{`Exam/Degree Title  :  `}</span>
              <span className="whitespace-pre-wrap">{`HSC                                                                                                `}</span>
              <span className="text-[#3a394d] whitespace-pre-wrap">{`From Date                 :    `}</span>
              <span className="text-[#55848c]">2019-07-15</span>
            </span>
          </p>
          <p className="m-0">
            <span className="whitespace-pre-wrap" style={majorGroupSciStyle}>
              <span className="text-[#3a394d] whitespace-pre-wrap">{`Major/Group            :  `}</span>
              <span className="whitespace-pre-wrap">{` Science                                                                                         `}</span>
              <span className="text-[#3a394d] whitespace-pre-wrap">
                To Date :
              </span>
              <span className="text-[#55848c] whitespace-pre-wrap">{`    2022-02-13   `}</span>
            </span>
          </p>
          <p className="m-0">
            <span className="whitespace-pre-wrap" style={iDCardNoStyle}>
              <span className="text-[#3a394d] whitespace-pre-wrap">{`ID Card No                :   `}</span>
              <span className="whitespace-pre-wrap">{`102041                                                                                        `}</span>
              <span className="text-[#3a394d] whitespace-pre-wrap">{` Year of Passing       :    `}</span>
              <span className="text-[#55848c]">2022</span>
            </span>
          </p>
          <p className="m-0 text-[#3a394d]">
            <span className="whitespace-pre-wrap" style={result1Style}>
              <span className="text-[#3a394d] whitespace-pre-wrap">{`Result                        :   `}</span>
              <span className="text-[#55848c]">GPA 5.0</span>
              <span className="whitespace-pre-wrap">{`                                                                                        Current Institute      :    `}</span>
              <span>No</span>
            </span>
          </p>
          <p className="m-0">
            <span className="whitespace-pre-wrap" style={blankLine2Style}>
              <span>&nbsp;</span>
            </span>
          </p>
          <p className="m-0">
            <span className="whitespace-pre-wrap" style={blankLine3Style}>
              <span>&nbsp;</span>
            </span>
          </p>
          <p className="m-0">
            <span className="whitespace-pre-wrap" style={blankLine4Style}>
              <span>&nbsp;</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
  rectangle53: PropTypes.string,

  /** Style props */
  frameDivPadding: PropTypes.string,
  spanFontSize: PropTypes.string,
  bachelorsHonorsFontSize: PropTypes.string,
  spanFontSize1: PropTypes.string,
  bRACUniversityFontSize: PropTypes.string,
  spanColor: PropTypes.string,
  majorGroupCSEFontSize: PropTypes.string,
  iDCardNo2FontSize: PropTypes.string,
  resultFontSize: PropTypes.string,
  blankLineFontSize: PropTypes.string,
  higherSecondaryColor: PropTypes.string,
  blankLineColor: PropTypes.string,
  instituteColor: PropTypes.string,
  majorGroupSciFontSize: PropTypes.string,
  iDCardNoFontSize: PropTypes.string,
  resultFontSize1: PropTypes.string,
  blankLineFontSize1: PropTypes.string,
  blankLineFontSize2: PropTypes.string,
  blankLineFontSize3: PropTypes.string,
};

export default FrameComponent2;
