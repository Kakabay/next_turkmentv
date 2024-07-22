'use client';

import { Queries } from '@/api/queries';
import Loader from '../Loader';
import axios, { AxiosError, AxiosPromise } from 'axios';
import baseUrl from '@/baseUrl';
import routes from '@/routes';
import { useContext, useEffect, useState } from 'react';
import { IMyTvAdmins } from '@/models/sms/my.tv.admins.model';
import { AuthContext } from '@/context/AuthContext';
import { SmsContext } from '@/context/SmsContext';
import clsx from 'clsx';

const numbers = [
  {
    number: '0801',
  },
  {
    number: '0802',
  },
  {
    number: '0803',
  },
  {
    number: '0804',
  },
  {
    number: '0805',
  },
  {
    number: '0806',
  },
];

export const FitlerNumber = () => {
  const [data, setData] = useState<IMyTvAdmins>();

  const smsContext = useContext(SmsContext);
  if (!smsContext) {
    throw new Error('smsContext must be used within an AuthProvider');
  }
  const { setActiveNumber, activeNumber } = smsContext;

  const getAdmins = async () => {
    const token = localStorage.getItem('access_token');

    try {
      const { data } = await axios.get<IMyTvAdmins>(`${baseUrl.SMS_SRC}${routes.myTvAdmins}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(data);
      setActiveNumber(data.data[0].id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <div className="bg-[#F0F0FA] rounded-3xl w-[314px]">
      <div className="font-semibold leading-[125%] bg-[#E1E1F5] rounded-[25px_25px_0_0] py-6 px-5">
        Фильтр по короткому номеру
      </div>

      <div className="flex flex-col">
        {data?.data.map((item) => (
          <div
            className={clsx(
              `h-[60px] px-6 py-5 font-semibold cursor-pointer hover:text-fillButtonAccentDefault transition-all duration-75`,
              {
                'text-fillButtonAccentDefault': item.id === activeNumber,
              },
            )}
            onClick={() => setActiveNumber(item.id)}>
            {item.login}
          </div>
        ))}
      </div>
    </div>
  );
};
