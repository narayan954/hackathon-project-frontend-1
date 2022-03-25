import { useState } from 'react';
import { BiHide, BiShow, BiLoaderAlt } from 'react-icons/bi';
import { BsGoogle, BsGithub } from 'react-icons/bs';
import Link from 'next/link';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loadingRes, setLoadingRes] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (registerData.email && registerData.password) {
      try {
        setLoadingRes(true);

        // TODO: make login request
        // const res = await axios.post("/auth/login", {
        //   email: registerData.email,
        //   password: registerData.password,
        // });

        setLoadingRes(false);
        toast.success('Signed successfully');
      } catch (err) {
        setLoadingRes(false);
        toast.error(err.response?.data?.message || 'Something Went Wrong.');
      }
    }
  };

  const onChangeHandler = (e) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-start justify-start px-6">
      <header className=" py-8 px-0 sm:px-5">
        <Link href={'/'}>
          <div>
            <img src="/logo.svg" className="hidden h-10 sm:block" />
            <img src="/logo-small.svg" className="block h-10 sm:hidden" />
          </div>
        </Link>
      </header>
      <main className="flex flex-1 w-full items-center justify-center pb-14 pt-5 sm:pt-10">
        <section className="bg-zinc-800 text-white px-3 py-7 sm:py-6 sm:px-9 rounded-xl w-[32rem] max-w-full ">
          <h1 className="text-3xl text-center mb-8 text-blue-300 font-bold">
            Create an Account
          </h1>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2" htmlFor="username">
                Username:
              </label>
              <input
                className="bg-zinc-900 border-none outline-0 outline outline-gray-400 px-3 py-2 rounded w-full placeholder-zinc-700 focus:outline-2"
                type="text"
                name="username"
                id="username"
                required
                value={registerData.username}
                placeholder="John Doe"
                autoFocus={true}
                onChange={onChangeHandler}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2" htmlFor="email">
                Email:
              </label>
              <input
                className="bg-zinc-900 border-none outline-0 outline outline-gray-400 px-3 py-2 rounded w-full placeholder-zinc-700 focus:outline-2"
                type="email"
                name="email"
                id="email"
                required
                value={registerData.email}
                placeholder="example@email.com"
                onChange={onChangeHandler}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2" htmlFor="password">
                Password:
              </label>
              <div className="relative ">
                <input
                  className="bg-zinc-900 border-none outline-0 outline outline-gray-400 pl-3 pr-8 py-2 rounded w-full placeholder-zinc-700 tracking-wider focus:outline-2"
                  type={showPassword ? 'text' : 'password'}
                  id="pasword"
                  name="password"
                  required
                  placeholder="password"
                  value={registerData.password}
                  onChange={onChangeHandler}
                />
                <div
                  role="button"
                  className="absolute top-1/2 right-3 translate-y-[-50%] cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <BiShow /> : <BiHide />}
                </div>
              </div>
            </div>
            <button
              role="form"
              disabled={loadingRes}
              className="bg-blue-700 px-5 py-2 w-full rounded-md mt-5 mb-7 text-center disabled:bg-blue-500 hover:bg-blue-800 active:outline outline-2 outline-gray-400"
            >
              {loadingRes ? (
                <BiLoaderAlt size={'20px'} className="inline animate-spin" />
              ) : (
                'Register'
              )}
            </button>
          </form>
          <div className="flex items-center">
            <span className="flex-1 w-full h-[0.5px] bg-gray-500"></span>
            <span className="px-3 text-gray-400">Or Continue with</span>
            <span className="flex-1 w-full h-[0.5px] bg-gray-500"></span>
          </div>
          <div className="flex items-center justify-center gap-3 md:gap-5 mt-5">
            <button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-200 bg-zinc-900 border border-zinc-700 rounded-md shadow-sm disabled:cursor-wait disabled:opacity-50 hover:bg-opacity-80">
              <span className="sr-only">Sign in with Google</span>
              <BsGoogle size={22} />
            </button>
            <button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-200 bg-zinc-900 border border-zinc-700 rounded-md shadow-sm disabled:cursor-wait disabled:opacity-50 hover:bg-opacity-80">
              <span className="sr-only">Sign in with Github</span>
              <BsGithub size={22} />
            </button>
          </div>
          <div className="mt-8 mb-2 text-gray-300">
            <p className="text-center">
              Already have an Account!
              <Link href={'/login'}>
                <a className="text-blue-500 font-semibold mx-2">Login Here</a>
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RegisterPage;
