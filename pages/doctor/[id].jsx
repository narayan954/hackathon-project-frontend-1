import "react-calendar/dist/Calendar.css";

import { useCallback, useEffect, useState } from "react";

import { BiLoaderAlt } from "react-icons/bi";
import Calendar from "react-calendar";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import apiCall from "../../utils/http";
import { toast } from "react-toastify";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  console.log("i ran");
  const url = `/user/doctors/${context.params.id}`;
  const { data } = await apiCall().get(url);
  return {
    props: { doctor: data.doctor },
  };
}

const DoctorDetailPage = ({ doctor }) => {
  const [dateValue, setDateValue] = useState(new Date());
  const [appointmentSlots, setAppointmentSlots] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState("");
  const router = useRouter();
  const isBtnDisabled = selectedSlot === "";
  const [user] = useLocalStorage("user");

  const getAppointments = useCallback(async () => {
    try {
      const { data } = await apiCall().get(
        `/bookings/${router.query.id}?date=${new Date(
          dateValue
        ).getMilliseconds()}`
      );
      console.log(data);
      setLoadingAppointments(false);
      setAppointmentSlots(data.bookings);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something Went Wrong.");
    }
  }, [dateValue]);

  const generateBooking = async () => {
    try {
      const { data } = await apiCall().post("/bookings/create", {
        doctorId: router.query.id,
        userId: user._id,
        date: new Date(dateValue).getMilliseconds(),
        timeSlot: "3-4",
      });
      router.push(`/meet/${data.booking._id}`);
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something Went Wrong.");
    }
  };

  useEffect(() => {
    getAppointments();
  }, [dateValue]);

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
          <div className="mt-8 px-5 md:px-20">
            <Calendar
              onChange={setDateValue}
              activeStartDate={dateValue}
              value={dateValue}
              maxDate={new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)}
              minDate={new Date()}
            />
            <div>
              {loadingAppointments ? (
                <div className="flex justify-center my-5">
                  <BiLoaderAlt size={"35px"} className="  animate-spin" />
                </div>
              ) : (
                <div>
                  {appointmentSlots.map((slot) => (
                    <div>{slot.time.toString()}</div>
                  ))}
                </div>
              )}
            </div>
            <button
              // disabled={isBtnDisabled}
              onClick={generateBooking}
              className="bg-blue-700 px-5 py-2 w-full rounded-md mt-5 mb-7 text-center disabled:bg-blue-500 hover:bg-blue-800 active:outline outline-2 outline-gray-400"
            >
              Join Appointment
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDetailPage;
