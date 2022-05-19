import React, { useState } from "react";
import { useQuery } from "react-query";
import DeleteConfirmModal from "../Appointment/DeleteConfirmModal";
import Loading from "../Shared/Loading";
import DoctorRow from "./DoctorRow";

const ManageDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);
  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery("doctors", () =>
    fetch("https://doctors-portal-server-12.herokuapp.com/doctor", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className="text-2xl">Manage doctors:{doctors?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors?.map((doctor, index) => (
              <DoctorRow
                setDeletingDoctor={setDeletingDoctor}
                refetch={refetch}
                index={index}
                key={doctor._id}
                doctor={doctor}
              />
            ))}
          </tbody>
        </table>
      </div>
      {deletingDoctor && (
        <DeleteConfirmModal
          setDeletingDoctor={setDeletingDoctor}
          refetch={refetch}
          deletingDoctor={deletingDoctor}
        />
      )}
    </div>
  );
};

export default ManageDoctors;
