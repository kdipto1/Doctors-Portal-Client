import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import BookingModal from "./BookingModal";
import Service from "./Service";

const AvailableAppointment = ({ date }) => {
  const [treatment, setTreatment] = useState(null);

  const formattedDate = format(date, "PP");
  const { data: services, isLoading, refetch } = useQuery(['available', formattedDate], () => fetch(`http://localhost:5000/available?date=${formattedDate}`).then(res => res.json()))
  if (isLoading) {
    return <Loading/>
  }
  return (
    <div>
      <h4 className="text-xl text-secondary text-center my-12">
        Available Appointment on {format(date, "PP")}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {
          services.map(service => <Service setTreatment={setTreatment} service={service} key={service._id}></Service>)
        }
      </div>
      {treatment && <BookingModal date={date} setTreatment={setTreatment} treatment={treatment} refetch={refetch}></BookingModal>}
    </div>
  );
};

export default AvailableAppointment;
