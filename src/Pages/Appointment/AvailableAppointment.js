import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import BookingModal from "./BookingModal";
import Service from "./Service";

const AvailableAppointment = ({ date }) => {
  const [services, setServices] = useState([]);
  const [treatment, setTreatment] = useState(null)
  useEffect(() => {
    fetch("http://localhost:5000/service")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
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
      {treatment && <BookingModal date={date} setTreatment={setTreatment} treatment={treatment}></BookingModal>}
    </div>
  );
};

export default AvailableAppointment;
