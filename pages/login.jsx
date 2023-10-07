import { BiHide, BiLoaderAlt, BiShow } from "react-icons/bi";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { useEffect, useState } from "react";

import Link from "next/link";
import apiCall from "../utils/http";
import { toast } from "react-toastify";
import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loadingRes, setLoadingRes] = useState(false);
  const router = useRouter();
  const [user, setUser] = useLocalStorage("user");
  const [token, setToken] = useLocalStorage("token");

  useEffect(() => {
    if (user || token) {
      router.replace("/");
    }
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      try {
        setLoadingRes(true);

        const { data } = await apiCall().post("/user/login", loginData);
        setUser(data.user);
        setToken(data.token);
        setLoadingRes(false);
        toast.success("Signed successfully");
        router.push("/");
      } catch (err) {
        setLoadingRes(false);
        console.log(err);
        toast.error(err.response?.data?.message || "Something Went Wrong.");
      }
    }
  };

  const onChangeHandler = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col items-start justify-start px-6">
      <header className=" py-8 px-0 sm:px-5">
        <Link href={"/"}>
          <a>
            <img src="/logo.svg" className="hidden h-10 sm:block" />
            <img src="/logo-small.svg" className="block h-10 sm:hidden" />
          </a>
        </Link>
      </header>
      <main className="flex flex-1 w-full items-center justify-center pb-14 pt-5 sm:pt-10">
        <section className="bg-zinc-800 text-white px-3 py-7 sm:py-6 sm:px-9 rounded-xl w-[32rem] max-w-full ">
          <h1 className="text-3xl text-center mb-8 text-blue-300 font-bold">
            Sign in
          </h1>
          <form onSubmit={onSubmitHandler}>
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
                value={loginData.email}
                placeholder="example@email.com"
                autoFocus={true}
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
                  type={showPassword ? "text" : "password"}
                  id="pasword"
                  name="password"
                  required
                  placeholder="password"
                  value={loginData.password}
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
                <BiLoaderAlt size={"20px"} className="inline animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="mt-8 mb-2 text-gray-300">
            <p className="text-center">
              Don't have an Account?
              <Link href={"/register"}>
                <a className="text-blue-500 font-semibold mx-2">Create One</a>
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
