import { BiHide, BiLoaderAlt, BiShow } from "react-icons/bi";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { useEffect, useState } from "react";

import InputWithTags from "../components/InputWithTags";
import Link from "next/link";
import apiCall from "../utils/http";
import axios from "axios";
import { toast } from "react-toastify";
import useLocalStorage from "../hooks/useLocalStorage";
import { useRouter } from "next/router";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
    userType: "user",
  });
  const [tags, setTags] = useState([]);
  const [loadingRes, setLoadingRes] = useState(false);
  const [user, setUser] = useLocalStorage("user");
  const [token, setToken] = useLocalStorage("token");
  const router = useRouter();

  useEffect(() => {
    if (user || token) {
      router.replace("/");
    }
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      registerData.email &&
      registerData.password &&
      registerData.name &&
      registerData.avatar
    ) {
      try {
        setLoadingRes(true);
        console.log("register request");

        const { name, email, password, avatar, userType } = registerData;
        const { data } = await apiCall().post("/user/register", {
          name,
          email,
          password,
          avatar: avatar === "" ? undefined : avatar,
          userType,
          tags,
        });
        console.log(data);

        setUser(data.user);
        setToken(data.token);
        setLoadingRes(false);
        toast.success("Registered successfully");
        router.push("/");
      } catch (err) {
        console.log(err);
        setLoadingRes(false);
        toast.error(err.response?.data?.message || "Something Went Wrong.");
      }
    }
  };

  const onChangeHandler = (e) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const postAvatarImage = (image) => {
    console.log(image);
    setLoadingRes(true);
    if (image === undefined) {
      toast.error("Please select a image");
      setLoadingRes(false);
      return;
    }
    if (
      image.type === "image/jpeg" ||
      image.type === "image/png" ||
      image.type === "image/jpg" ||
      image.type === "image/svg"
    ) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "chat_app");
      data.append("cloud_name", "dklj8gnbm");
      axios("https://api.cloudinary.com/v1_1/dklj8gnbm/image/upload", {
        method: "POST",
        data: data,
      })
        .then(({ data }) => {
          setRegisterData((prev) => ({
            ...prev,
            avatar: data.url.toString(),
          }));

          setLoadingRes(false);
        })
        .catch((err) => {
          console.log(err);
          console.error(err);
          setLoadingRes(false);
        });
    } else {
      toast.error("Please select a valid image");
      setLoadingRes(false);
    }
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
            Create an Account
          </h1>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-6 flex items-center justify-between">
              <label className="block text-gray-300 mb-2" htmlFor="userType">
                Register as:
              </label>
              <div className="flex items-center justify-center gap-5">
                <div className="flex items-center gap-2">
                  <label htmlFor="user">User</label>
                  <input
                    type="radio"
                    id="user"
                    name="userType"
                    value={"user"}
                    checked={registerData.userType === "user" ? "checked" : ""}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="doctor">Doctor</label>
                  <input
                    type="radio"
                    name="userType"
                    id="doctor"
                    checked={
                      registerData.userType === "doctor" ? "checked" : ""
                    }
                    value={"doctor"}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2" htmlFor="name">
                Name:
              </label>
              <input
                className="bg-zinc-900 border-none outline-0 outline outline-gray-400 px-3 py-2 rounded w-full placeholder-zinc-700 focus:outline-2"
                type="text"
                name="name"
                id="name"
                required
                value={registerData.name}
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
                  type={showPassword ? "text" : "password"}
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
            {registerData.userType === "doctor" && (
              <div className="mb-6">
                <InputWithTags tags={tags} setTags={setTags} />
              </div>
            )}
            <div className="mb-6">
              <label className="block cursor-pointer">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  onChange={(e) => postAvatarImage(e.target.files[0])}
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100
                    cursor-pointer
                    "
                />
              </label>
            </div>
            <button
              role="form"
              disabled={loadingRes}
              className="bg-blue-700 px-5 py-2 w-full rounded-md mt-5 mb-7 text-center disabled:bg-blue-500 hover:bg-blue-800 active:outline outline-2 outline-gray-400"
            >
              {loadingRes ? (
                <BiLoaderAlt size={"20px"} className="inline animate-spin" />
              ) : (
                "Register"
              )}
            </button>
          </form>
          <div className="mt-8 mb-2 text-gray-300">
            <p className="text-center">
              Already have an Account!
              <Link href={"/login"}>
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
