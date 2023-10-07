import { useEffect, useState } from "react";

import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import { MdClear } from "react-icons/md";
import Navbar from "../components/Navbar";
import apiCall from "../utils/http";
import { doctorTypes } from "../assets/doctorTypes";

export async function getServerSideProps(context) {
  const { data } = await apiCall().get("/user/doctors");
  return {
    props: { doctors: data.doctors }, // will be passed to the page component as props
  };
}

const SearchPage = ({ doctors }) => {
  const [doctorList, setDoctorsList] = useState(doctors);

  const onInputChange = (e) => {
    if (
      e.nativeEvent.inputType == "insertReplacementText" ||
      e.nativeEvent.inputType === null
    ) {
      setDoctorsList((prev) =>
        prev.filter((d) => d.tags.includes(e.target.value))
      );
      //   setTimeout(() => (e.target.value = ''), 100);
    }

    if (e.target.value === "") {
      setDoctorsList(doctors);
      //   [].includes;
    }
  };

  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      <Navbar />
      <div className=" px-4 sm:px-12 md:px-20 py-14 flex items-center justify-center max-w-[800px] m-auto ">
        <BsSearch
          size={38}
          color="white"
          className="p-2 bg-[#2c97df] text-white rounded-l"
        />
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for doctors with specific specialization"
            list="types-list"
            defaultValue=""
            onChange={onInputChange}
            className="bg-zinc-800 border-none outline-0 outline outline-gray-400 pl-3 pr-3 py-2 rounded-r w-full placeholder-zinc-700 focus:outline-2"
          />
          <datalist id="types-list">
            {doctorTypes.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </datalist>
        </div>
      </div>
      <main className="flex items-center justify-center gap-5 flex-wrap pb-10">
        {doctorList.map((d, i) => (
          <Link key={i} href={`/doctor/${d._id}`}>
            <a>
              <div className="bg-zinc-800 rounded-md p-5 flex items-center w-[35rem] max-w-full gap-4">
                <img
                  src={d.avatar}
                  className="h-20 w-20 rounded-full"
                  alt={d.name}
                />
                <div>
                  <h3 className="text-2xl text-[#2c97df] mb-2">{d.name}</h3>
                  <p className="text-base text-gray-300">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maiores praesentium molestiae reiciendis quae aut rerum
                    asperiores, itaque impedit consequuntur quam quibusdam
                    similique debitis.
                  </p>
                  <div className="flex items-center justify-start gap-4 flex-wrap my-4">
                    {d.tags.map((t, i) => (
                      <div
                        key={i}
                        className="bg-orange-600 rounded-full py-1 px-2 cursor-default flex items-center gap-2"
                      >
                        <span className="text-sm">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </main>
    </div>
  );
};

export default SearchPage;
