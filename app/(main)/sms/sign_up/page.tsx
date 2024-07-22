'use client';
// src/app/sms/sign_up/page.tsx
import { useState, FormEvent, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Loader from '@/components/Loader';

const Page = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { login: loginUser } = authContext;
  const user = authContext;
  const { checkUserLoggedIn } = authContext;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    loginUser(login, password);
  };

  useEffect(() => {
    // loginUser(login, password);
    checkUserLoggedIn();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <main>
        <div className="container flex justify-center items-center h-screen">
          <Loader />
        </div>
      </main>
    );
  }

  if (!user.user) {
    return (
      <main className="container flex justify-center h-screen items-center">
        <form onSubmit={handleSubmit}>
          <div className="bg-[#F5F5FA] p-10 rounded-[25px] w-[522px] -mt-28">
            <h2 className="mb-10 text-[40px] leading-none text-#242429 font-semibold">
              Авторизация
            </h2>
            <div className="flex flex-col gap-2 mb-5 leading-[150%]">
              <label htmlFor="login" className="text-[16px] font-semibold text-[#242429]">
                Логин
              </label>
              <input
                id="login"
                type="text"
                className="input-style"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Введите свой логин"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-[16px] font-semibold text-[#242429]">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                className="input-style"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите свой пароль"
              />
            </div>
            <button
              type="submit"
              className="p-3 bg-[#7A7ACC] text-[18px] leading-[150%] font-medium text-white w-full rounded-xl mt-[30px]">
              Войти
            </button>
          </div>
        </form>
      </main>
    );
  }
};

export default Page;
