import PropTypes from "prop-types";

const TutorPage = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-row items-start justify-between pt-[6.5rem] pb-[4.193rem] pl-[5.25rem] pr-[6.937rem] box-border gap-[1.25rem] max-w-full text-left text-[3rem] font-M3-display-large mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border mq800:pl-[2.625rem] mq800:pr-[3.438rem] mq800:box-border mq1325:flex-wrap ${className}`}
    >
      <h1 className="m-0 w-[34.813rem] relative text-[length:inherit] font-extrabold font-[inherit] text-transparent !bg-clip-text [background:linear-gradient(rgba(58,_57,_77,_0.56),_rgba(58,_57,_77,_0.56)),_#fff] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block shrink-0 [text-shadow:1px_0_0_#3b394d,_0_1px_0_#3b394d,_-1px_0_0_#3b394d,_0_-1px_0_#3b394d] max-w-full z-[2] mq450:text-[1.813rem] mq800:text-[2.375rem]">
        Moutmayen Nafis
      </h1>
      <div className="w-[35.125rem] flex flex-row items-start justify-start relative max-w-full text-right">
        <div className="h-[91.844rem] w-[14.875rem] absolute !!m-[0 important] top-[-7.5rem] left-[42.971rem] [background:linear-gradient(rgba(58,_57,_77,_0.92),_rgba(58,_57,_77,_0.92)),_#3b394d] [transform:_rotate(89.7deg)] [transform-origin:0_0]" />
        <div className="h-[50.563rem] w-[71.713rem] absolute !!m-[0 important] bottom-[-44.125rem] left-[-38.675rem]">
          <img
            className="absolute top-[19.588rem] left-[0rem] rounded-mini w-[30.975rem] h-[30.975rem] object-contain"
            alt=""
            src="/pngtreecartoon-river-4760025-6@2x.png"
          />
          <img
            className="absolute top-[19.563rem] left-[40.738rem] rounded-mini w-[30.975rem] h-[30.975rem] object-contain"
            loading="lazy"
            alt=""
            src="/pngtreecartoon-river-4760025-7@2x.png"
          />
          <img
            className="absolute top-[0rem] left-[27.113rem] rounded-21xl w-[17.188rem] h-[22.938rem] object-cover z-[1]"
            alt=""
            src="/a38522fd8f3b402eb5da65d82ffc6e5e-7@2x.png"
          />
        </div>
        <div className="flex-1 relative font-extrabold text-transparent !bg-clip-text [background:linear-gradient(#91909b,_#91909b),_#fff] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block [text-shadow:1px_0_0_#000,_0_1px_0_#000,_-1px_0_0_#000,_0_-1px_0_#000] max-w-full z-[2] mq450:text-[1.813rem] mq800:text-[2.375rem]">
          Tutor ID : 123456
        </div>
      </div>
    </section>
  );
};

TutorPage.propTypes = {
  className: PropTypes.string,
};

export default TutorPage;
