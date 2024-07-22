'use client';
import Image from 'next/image';
import placeholder from '@/public/person placeholder.svg';

interface IProps {
  number: number;
  name: string | null;
  photo: string | null;
  votes: number;
  progress: number;
  voteCode: string;
  smsNumber: string;
  isFirst: boolean;
  voteStatus: string;
  winner: boolean;
}

const ParticipantCard = ({
  number,
  name,
  photo,
  votes,
  progress,
  voteCode,
  isFirst,
  voteStatus,
  winner,
}: IProps) => {
  const substractedProgress = progress > 99 ? progress - 2 : progress;

  return winner && votes != 0 ? (
    <div className="flex flex-col overflow-hidden bg-fillNavyBlue  max-w-[940px] w-full">
      <div className="flex items-center gap-[5px] sm:gap-[20px] p-[5px] pt-[10px] w-full">
        <h3 className="text-[26px] sm:text-[80px] leading-[100%] font-bold text-fillNavyBlue text-stroke">
          {number}
        </h3>
        {photo && name ? (
          <div className="relative min-w-[60px] h-[60px] sm:min-w-[140px] sm:h-[140px]">
            <Image
              fill
              src={photo}
              alt={name}
              className="rounded-[10px] object-cover"
              unoptimized
              unselectable="off"
            />
          </div>
        ) : (
          <div className="relative min-w-[60px] h-[60px] sm:min-w-[140px] sm:h-[140px]">
            <Image
              fill
              src={placeholder}
              alt={'placeholder'}
              className="rounded-[10px] object-cover"
              unoptimized
              unselectable="off"
            />
          </div>
        )}
        <div className="flex flex-col gap-[10px] sm:gap-[24px] w-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-between items-center sm:items-start w-full sm:w-fit sm:justify-start sm:flex-col gap-[14px]">
              {name ? (
                <h2 className="text-[18px] sm:text-[24px] leading-[100%] font-bold text-white">
                  {name}
                </h2>
              ) : null}
              <h4 className="text-[12px] sm:text-[16px] text-white leading-[100%] font-bold">
                {votes ? votes : 0} ses
              </h4>
            </div>
            {voteCode && voteStatus !== 'closed' ? (
              <p className="hidden sm:block py-[10px] px-[8px] bg-[#1E1E7B] text-fillLightGray text-[14px] leading-[125%] max-w-[232px] rounded-[10px]">
                Ses bermek üçin «{voteCode}» ugrat
              </p>
            ) : null}
          </div>
          <div className="ProgressBar w-full bg-[#3636A3] rounded-[8px] ">
            <div
              style={{
                width: `${substractedProgress.toString()}%`,
              }}
              className={`rounded-[8px] bg-[#6868B8] w-[${substractedProgress.toString()}%] h-[7px] sm:h-[28px]`}></div>
          </div>
        </div>
      </div>
      {voteCode && voteStatus !== 'closed' ? (
        <p className="block sm:hidden py-[10px] px-[4px] font-medium bg-[#1E1E7B] rounded-md text-fillLightGray text-[10px] leading-[125%] ">
          Ses bermek üçin «{voteCode}» ugrat
        </p>
      ) : null}
    </div>
  ) : (
    <div className="flex flex-col max-w-[940px] items-center w-full gap-[5px] sm:gap-[20px]">
      <div className="flex items-center gap-[5px] sm:gap-[20px] max-w-[900px] w-full px-[5px] sm:p-0">
        <h3 className="w-[24px] text-[16px] sm:text-[20px] leading-[100%] font-bold">{number}</h3>
        {photo && name ? (
          <div className="relative min-w-[50px] sm:min-w-[80px] h-[50px] sm:h-[80px]">
            <Image
              fill
              src={photo}
              alt={name}
              className="rounded-[10px] object-cover"
              unoptimized
              unselectable="off"
            />
          </div>
        ) : (
          <div className="relative min-w-[50px] sm:min-w-[80px] h-[50px] sm:h-[80px]">
            <Image
              fill
              src={placeholder}
              alt={'placeholder'}
              className="rounded-[10px] object-cover"
              unoptimized
              unselectable="off"
            />
          </div>
        )}
        <div className="flex flex-col gap-[10px] sm:gap-[12px] w-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex justify-between sm:justify-start w-full sm:flex-col gap-[6px]">
              {name ? (
                <h2 className="text-textBlack text-[16px] sm:text-[18px] leading-[100%] font-bold">
                  {name}
                </h2>
              ) : null}
              <h4 className="text-[12px] sm:text-[16px] text-dark font-bold leading-[100%] ">
                {votes ? votes : 0} ses
              </h4>
            </div>
            {voteCode && voteStatus !== 'closed' ? (
              <p className="hidden sm:block py-[5px] px-[8px] bg-[#EAEAFF] text-[#9393DA] text-[14px] leading-[125%] rounded-[10px] max-w-[200px]">
                Ses bermek üçin «{voteCode}» ugrat
              </p>
            ) : null}
          </div>
          <div className="ProgressBar w-full bg-[#E0E0E0] rounded-[4px] ">
            <div
              style={{
                width: `${substractedProgress.toString()}%`,
              }}
              className={`rounded-[4px] bg-[#6868B8] h-[5px] sm:h-[14px]`}></div>
          </div>
        </div>
      </div>
      {voteCode && voteStatus !== 'closed' ? (
        <p className="block sm:hidden text-[#9393DA] text-[10px] leading-[125%] w-full">
          Ses bermek üçin «{voteCode}» ugrat
        </p>
      ) : null}
      <div className="w-full h-[1px] bg-[#EDEDFA]"></div>
    </div>
  );
};

export default ParticipantCard;
