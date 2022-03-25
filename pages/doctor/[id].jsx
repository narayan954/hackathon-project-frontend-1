import Link from 'next/link';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Navbar from '../../components/Navbar';
import apiCall from '../../utils/http';

export async function getServerSideProps(context) {
  const { data } = await apiCall().get(`/user/doctors/${context.params.id}`);
  return {
    props: { doctor: data.doctor }, // will be passed to the page component as props
  };
}

const DoctorDetailPage = ({ doctor }) => {
  const [dateValue, setDateValue] = useState(new Date());
  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      <Navbar />
      <main className="px-4 sm:px-12 md:px-20 py-14 flex items-center justify-center max-w-[1200px] m-auto">
        <div className="bg-zinc-800 w-[65rem] max-w-full ">
          <div className=" rounded-md p-5 flex items-center flex-col md:flex-row w-[55rem] max-w-full gap-4">
            <img
              src={doctor.avatar}
              className="h-44 w-44 rounded-full"
              alt={doctor.name}
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl text-[#2c97df] mb-2">{doctor.name}</h3>
              <p className="text-base text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
                praesentium molestiae reiciendis quae aut rerum asperiores,
                itaque impedit consequuntur quam quibusdam similique debitis.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap my-4">
                {doctor.tags.map((t, i) => (
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
          <hr />
          <div>
            <Calendar onChange={setDateValue} value={dateValue} />
            <Link href={'/meet/alksfkjdk'}>
              <button
                // disabled={loadingRes}
                className="bg-blue-700 px-5 py-2 w-full rounded-md mt-5 mb-7 text-center disabled:bg-blue-500 hover:bg-blue-800 active:outline outline-2 outline-gray-400"
              >
                {/* {loadingRes ? (
                  <BiLoaderAlt size={'20px'} className="inline animate-spin" />
                ) : (
                  'Sign In'
                )} */}{' '}
                Book Appointment
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDetailPage;
