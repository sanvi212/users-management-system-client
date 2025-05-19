import { use } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";

const AddUser = () => {
  const { createUser } = use(AuthContext);
  const navigate = useNavigate()

  const handleAdduser = (e) => {
    e.preventDefault();
    const from = e.target;
    const fromData = new FormData(from);
    const { email, password, ...restFromData } = Object.fromEntries(
      fromData.entries()
    );

    // create user to firebase

    createUser(email, password)
      .then((result) => {
        const userProfile = {
          email,
          ...restFromData,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };
        // save profile into db
        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                title: "User Saved Succesfully",
                icon: "success",
                draggable: true,
              });
              from.reset()
              navigate('/')
            }
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Something went wrong! ${error.message}`,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };

  return (
    <div className="flex flex-col items-center p-8">
      <Link
        to="/"
        className="text-purple-600 text-sm mb-4 self-start flex items-center gap-2"
      >
        &laquo; All Users
      </Link>
      <h2 className="text-2xl font-semibold mb-1">New User</h2>
      <p className="text-sm text-gray-400 mb-6">
        Use the below form to create a new account
      </p>

      <form onSubmit={handleAdduser} className="w-full max-w-lg space-y-6">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="flex items-center gap-6">
          <label className="label">Gender</label>
          <label className="label cursor-pointer gap-2">
            <input type="radio" name="gender" value="Male" required />
            <span className="label-text">Male</span>
          </label>
          <label className="label cursor-pointer gap-2">
            <input
              type="radio"
              name="gender"
              value="Female"
              className="radio checked:bg-green-500"
              // checked={formData.gender === "Female"}
            />
            <span className="label-text">Female</span>
          </label>
        </div>
        <div className="flex items-center gap-6">
          <label className="label">Status</label>
          <label className="label cursor-pointer gap-2">
            <input
              type="radio"
              name="status"
              value="Active"
              className="radio checked:bg-green-500"
              // checked={formData.status === "Active"}
              required
            />
            <span className="label-text">Active</span>
          </label>
          <label className="label cursor-pointer gap-2">
            <input
              type="radio"
              name="status"
              value="Inactive"
              className="radio checked:bg-green-500"
              // checked={formData.status === "Inactive"}
            />
            <span className="label-text">Inactive</span>
          </label>
        </div>

        <button type="submit" className="btn btn-success btn-block">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddUser;
