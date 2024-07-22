'use client';
import { useContext, useState } from 'react';
import { FitlerNumber } from '@/components/table/FitlerNumber';
import { Search } from '@/components/table/Search';
import { Sort } from '@/components/table/Sort';
import { Inter } from 'next/font/google';
import { AuthContext } from '@/context/AuthContext';
import ProtectedRoute from '@/components/sms/ProtectedRoute';
import { setDate } from 'date-fns';
import { Calendar } from 'lucide-react';
import { SmsContext } from '@/context/SmsContext';

const inter = Inter({
  weight: ['400', '600', '700', '500'],
  subsets: ['cyrillic', 'latin'],
});

const Page = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { logout } = authContext;

  return (
    <ProtectedRoute>
      <div className={`pt-[100px] pb-[200px] ${inter.className}`}>
        <div className="container">
          <h1 className="text-[60px] leading-none font-semibold mb-[68px] text-center">
            Список смс «0801»
          </h1>

          <div className="flex gap-[40px]">
            <div className="flex flex-col gap-[32px]">
              <FitlerNumber />
              <span
                onClick={logout}
                className="text-textLight text-[16px] leading-[140%] font-semibold cursor-pointer w-full py-2">
                Выйти из профиля
              </span>
            </div>
            <div></div>
            {/* <div className="flex flex-col gap-5 w-full">
              <div className="flex gap-8 items-end justify-end w-full">
                <Sort />
                <Search />
              </div>
              <Calendar
                mode="single"
                // selected={date}
                // onSelect={setDate}
                className="rounded-md border"
              />
            </div> */}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
