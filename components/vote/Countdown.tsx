import { useEffect, useState } from 'react';
import { differenceInSeconds, parseISO, addHours } from 'date-fns';
import GradientTitle from './GradientTitle';

interface CountdownProps {
  startsAt: string;
  endsAt: string;
}

const Countdown: React.FC<CountdownProps> = ({ startsAt, endsAt }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [eventStatus, setEventStatus] = useState<string>('Finished');

  useEffect(() => {
    // Parsing the start and end times to Date objects in the correct format
    const startsAtDate = addHours(parseISO(startsAt.replace(' ', 'T')), 5); // Adjusting start time to UTC+5
    const endsAtDate = addHours(parseISO(endsAt.replace(' ', 'T')), 5); // Adjusting end time to UTC+5

    // Function to calculate time left
    const calculateTimeLeft = () => {
      const now = new Date();
      const nowUTC5 = addHours(now, 5); // Adjusting current time to UTC+5

      let difference;
      if (nowUTC5 < startsAtDate) {
        setEventStatus('Not started');
        difference = differenceInSeconds(startsAtDate, nowUTC5);
      } else if (nowUTC5 < endsAtDate) {
        setEventStatus('Started');
        difference = differenceInSeconds(endsAtDate, nowUTC5);
      } else {
        setEventStatus('Finished');
        return;
      }

      const hours = Math.floor(difference / 3600);
      const minutes = Math.floor((difference % 3600) / 60);
      const seconds = difference % 60;

      setTimeLeft(
        `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${
          seconds < 10 ? '0' + seconds : seconds
        }`,
      );
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [startsAt, endsAt]);

  return (
    <div>
      {eventStatus === 'Finished' ? (
        <GradientTitle title={'Netijeler'} size="big" />
      ) : (
        <div className="text-[44px] sm:text-[100px] leading-[100%] flex items-end font-bold bg-fancyTitle bg-clip-text text-transparent text-center">
          <h2 className="flex flex-col items-center justify-center">{timeLeft.split(':')[0]}</h2>:
          <h2 className="flex flex-col items-center justify-center">{timeLeft.split(':')[1]}</h2>:
          <h2 className="flex flex-col items-center justify-center">{timeLeft.split(':')[2]}</h2>
        </div>
      )}
    </div>
  );
};

export default Countdown;
