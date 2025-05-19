import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateUser = () => {
  const loaderUser = useLoaderData();
  const [user, setUser] = useState(loaderUser);
  const navigaite = useNavigate();

  const handleUpdateuser = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;

    const updatedUser = { name };

    // update user name into db

    fetch(`http://localhost:3000/users/${user._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({ ...user, name });

        if (data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Name updated successfully!",
            timer: 2000,
            showConfirmButton: false,
          });
          navigaite("/");
        } else {
          Swal.fire({
            icon: "info",
            title: "No changes were made.",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        console.error("Update failed:", err);
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
        });
      });
  };
  return (
    <div className="flex flex-col items-center p-8 bg-base-100">
      <Link
        to="/"
        className="text-purple-600 text-sm mb-4 self-start flex items-center gap-2"
      >
        &laquo; All Users
      </Link>
      <h2 className="text-2xl font-semibold mb-1">Update User Info</h2>
      <p className="text-sm text-gray-400 mb-2">
        Use the below form to update user Info
      </p>
      <br />
      <h2 className="text-xl font-semibold mb-6">{user.name}</h2>

      <form onSubmit={handleUpdateuser} className="w-full max-w-lg space-y-6">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full"
            required
            defaultValue={user.name}
          />
        </div>

        <button type="submit" className="btn btn-success btn-block">
          Save
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
