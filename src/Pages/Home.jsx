import React, { useState } from "react";
import { FaEye, FaPen, FaTimes, FaUserPlus } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

// const [users, setUsers] = useState({});

const Home = () => {
  const initialUsers = useLoaderData();
  const [users, setUsers] = useState(initialUsers);

  const hadleDeleteUser = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be delete this user!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/users/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Users has been deleted.",
                icon: "success",
              });
              setUsers((prev) => prev.filter((user) => user._id !== _id));
            }
          })
          .cetch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `Something went wrong! ${error}`,
              footer: '<a href="#">Why do I have this issue?</a>',
            });
          });
      }
    });
  };

  return (
    <div className="p-8">
      <div className="mb-4">
        <Link to="/add-user">
          <button className="btn btn-sm btn-outline text-purple-600 hover:bg-purple-100">
            <FaUserPlus className="mr-2" />
            New User
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border border-gray-200">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>@Email</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
         <tbody>
  {
    users.length === 0 ? (
      <tr>
        <td colSpan="6" className="text-center py-4">
          <p>No available users</p>
          <h2 className="text-sm text-gray-400">Please add a user</h2>
        </td>
      </tr>
    ) : (
      users.map((user) => (
        <tr key={user._id} className="hover">
          <td>{user._id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.gender}</td>
          <td
            className={
              user.status === "Inactive"
                ? "text-red-400"
                : "text-green-600"
            }
          >
            {user.status}
          </td>
          <td>
            <div className="flex gap-2">
              <Link to={`/user-detail/${user._id}`}>
                <button className="btn btn-xs btn-outline text-purple-600">
                  <FaEye size={20} />
                </button>
              </Link>
              <Link to={`update-user/${user._id}`}>
                <button className="btn btn-xs btn-outline text-purple-600">
                  <FaPen size={15} />
                </button>
              </Link>
              <button
                onClick={() => hadleDeleteUser(user._id)}
                className="btn btn-xs btn-outline text-purple-600"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </td>
        </tr>
      ))
    )
  }
</tbody>

        </table>
      </div>
    </div>
  );
};

export default Home;
