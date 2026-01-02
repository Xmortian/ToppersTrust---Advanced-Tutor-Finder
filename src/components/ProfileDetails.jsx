import Search from "./Search";
import Phone from "./Phone";
import PropTypes from "prop-types";

const ProfileDetails = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch h-[41.375rem] rounded-11xl bg-[rgba(179,179,179,0.15)] border-[#1368a4] border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start justify-start pt-[3.187rem] pb-[5.062rem] pl-[1.5rem] pr-[1.25rem] max-w-full z-[2] text-left text-[0.938rem] font-roboto ${className}`}
    >
      <div className="mt-[-161.907rem] self-stretch flex flex-row items-start justify-start pt-[0rem] pb-[160.093rem] pl-[206.687rem] pr-[0rem]">
        <img
          className="h-[1.813rem] w-[17.813rem] relative"
          alt=""
          src="/rectangle-28.svg"
        />
      </div>
      <div className="flex flex-row items-start justify-start pt-[0rem] pb-[0.875rem] pl-[15.25rem] pr-[15.5rem]">
        <img
          className="h-[4rem] w-[3.75rem] relative"
          loading="lazy"
          alt=""
          src="/person.svg"
        />
      </div>
      <div className="self-stretch flex flex-row items-start justify-end pt-[0rem] px-[2.687rem] pb-[2.375rem]">
        <div className="w-[19.875rem] relative font-semibold text-transparent !bg-clip-text [background:linear-gradient(#1368a4,_#1368a4),_#000] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block shrink-0">
          Guardian/Student ID : 22014
        </div>
      </div>
      <div className="self-stretch h-[9.5rem] flex flex-row items-start justify-start pt-[0rem] px-[0rem] pb-[6.812rem] box-border max-w-full">
        <div className="self-stretch flex-1 flex flex-row items-start justify-start relative max-w-full">
          <div className="h-[2.313rem] w-[35.25rem] absolute !!m-[0 important] top-[-0.312rem] left-[-0.75rem] rounded-41xl flex items-center justify-center z-[0]">
            <img
              className="h-full w-full object-contain absolute left-[0rem] top-[0.25rem] [transform:scale(3.162)]"
              alt=""
            />
          </div>
          <div className="self-stretch flex-1 rounded-mini [background:linear-gradient(#e8f1fd,_#e8f1fd),_#d9d9d9] border-[#e8f1fd] border-solid border-[1px] box-border flex flex-row items-start justify-between pt-[0.687rem] pb-[0.625rem] pl-[12.875rem] pr-[3.062rem] gap-[1.25rem] max-w-full z-[1]">
            <div className="h-[2.75rem] w-[34.563rem] relative rounded-mini [background:linear-gradient(#e8f1fd,_#e8f1fd),_#d9d9d9] border-[#e8f1fd] border-solid border-[1px] box-border hidden max-w-full" />
            <div className="w-[12.125rem] relative font-semibold text-transparent !bg-clip-text [background:linear-gradient(#1368a4,_#1368a4),_#000] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block shrink-0 z-[2]">
              Profile Completed: 20%
            </div>
            <div className="h-[1.125rem] flex flex-col items-start justify-start pt-[0.812rem] px-[0rem] pb-[0rem] box-border">
              <img
                className="w-[1.25rem] h-[1.125rem] relative overflow-hidden shrink-0 z-[3]"
                loading="lazy"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[15rem] flex flex-row items-start justify-start py-[0rem] px-[1rem] box-border">
        <div className="flex-1 flex flex-row items-start justify-start gap-[0.375rem]">
          <div className="h-[1.125rem] w-[1.25rem] relative">
            <img
              className="absolute top-[0rem] left-[0rem] w-full h-full overflow-hidden"
              alt=""
              src="/mail-1.svg"
            />
            <img
              className="absolute top-[0rem] left-[0rem] w-full h-full overflow-hidden z-[1]"
              loading="lazy"
              alt=""
              src="/mail-1.svg"
            />
          </div>
          <div className="flex-1 flex flex-col items-start justify-start pt-[0.125rem] px-[0rem] pb-[0rem]">
            <div className="self-stretch relative font-semibold text-transparent !bg-clip-text [background:linear-gradient(#1368a4,_#1368a4),_#000] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              Email
            </div>
          </div>
        </div>
      </div>
      <div className="w-[6.25rem] h-[1.25rem] relative overflow-hidden shrink-0 hidden z-[10]" />
      <div className="flex flex-row items-start justify-start py-[0rem] pl-[0.437rem] pr-[0.375rem]">
        <Search
          state="Default"
          valueType="Default"
          value="tania02@gmail.com"
          searchWidth="17.875rem"
          searchHeight="1.938rem"
          searchBorderRadius="9999px"
          searchBorder="1px solid #d9d9d9"
          searchPosition="unset"
          searchTop="unset"
          searchLeft="unset"
          valueFontSize="0.938rem"
          valueColor="unset"
          valueBorder="unset"
          valueOutline="unset"
          valueFontWeight="600"
          valueBackgroundColor="unset"
          valueBackground="linear-gradient(#1368a4, #1368a4), #1e1e1e"
          valueWebkitBackgroundClip="unset"
          valueWebkitTextFillColor="unset"
          valueDisplay="unset"
        />
      </div>
      <div className="self-stretch flex flex-row items-start justify-end pt-[0rem] px-[2.75rem] pb-[1rem]">
        <img
          className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 z-[3]"
          loading="lazy"
          alt=""
        />
      </div>
      <Phone size={20} showPhone={false} showIcon={false} />
      <div className="w-[12.438rem] flex flex-row items-start justify-start pt-[0rem] px-[1rem] pb-[0.437rem] box-border">
        <div className="flex-1 flex flex-row items-start justify-start gap-[0.375rem]">
          <div className="h-[1.25rem] w-[1.25rem] relative">
            <Phone
              size={20}
              showPhone
              phonePosition="absolute"
              phoneTop="0rem"
              phoneLeft="0rem"
              showIcon
            />
            <Phone
              size={20}
              showPhone
              phonePosition="absolute"
              phoneTop="0rem"
              phoneLeft="0rem"
              showIcon
            />
          </div>
          <div className="flex-1 flex flex-col items-start justify-start pt-[0.125rem] px-[0rem] pb-[0rem]">
            <div className="self-stretch relative font-semibold text-transparent !bg-clip-text [background:linear-gradient(#1368a4,_#1368a4),_#000] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] z-[1]">
              Contact Number
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start justify-start pt-[0rem] pb-[1.625rem] pl-[0.437rem] pr-[0.375rem]">
        <Search
          state="Default"
          valueType="Default"
          value="+88 01765258907"
          searchWidth="17.875rem"
          searchHeight="1.938rem"
          searchBorderRadius="9999px"
          searchBorder="1px solid #d9d9d9"
          searchPosition="unset"
          searchTop="unset"
          searchLeft="unset"
          valueFontSize="0.938rem"
          valueColor="unset"
          valueBorder="unset"
          valueOutline="unset"
          valueFontWeight="600"
          valueBackgroundColor="unset"
          valueBackground="linear-gradient(#1368a4, #1368a4), #1e1e1e"
          valueWebkitBackgroundClip="unset"
          valueWebkitTextFillColor="unset"
          valueDisplay="unset"
        />
      </div>
      <div className="w-[17.938rem] flex flex-row items-start justify-start pt-[0rem] px-[1rem] pb-[0.375rem] box-border">
        <div className="flex-1 flex flex-row items-start justify-start">
          <div className="h-[1.5rem] w-[1.5rem] relative shrink-0">
            <img
              className="absolute top-[0rem] left-[0rem] w-full h-full overflow-hidden"
              alt=""
              src="/location-on-1.svg"
            />
            <img
              className="absolute top-[0rem] left-[0rem] w-full h-full overflow-hidden z-[1]"
              loading="lazy"
              alt=""
              src="/location-on-1.svg"
            />
          </div>
          <div className="flex-1 flex flex-col items-start justify-start pt-[0.187rem] px-[0rem] pb-[0rem] ml-[-0.313rem] relative">
            <div className="self-stretch relative font-semibold text-transparent !bg-clip-text [background:linear-gradient(#1368a4,_#1368a4),_#000] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] whitespace-pre-wrap shrink-0">
              {" "}
              Address
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start justify-start py-[0rem] pl-[0.437rem] pr-[0.375rem]">
        <Search
          state="Default"
          valueType="Default"
          value="Not Given"
          searchWidth="17.875rem"
          searchHeight="1.938rem"
          searchBorderRadius="9999px"
          searchBorder="1px solid #d9d9d9"
          searchPosition="unset"
          searchTop="unset"
          searchLeft="unset"
          valueFontSize="0.938rem"
          valueColor="unset"
          valueBorder="unset"
          valueOutline="unset"
          valueFontWeight="600"
          valueBackgroundColor="unset"
          valueBackground="linear-gradient(#1368a4, #1368a4), #1e1e1e"
          valueWebkitBackgroundClip="unset"
          valueWebkitTextFillColor="unset"
          valueDisplay="unset"
        />
      </div>
    </div>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;
