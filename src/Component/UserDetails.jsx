import { Link, useLoaderData } from 'react-router-dom';
import { FaUser, FaEnvelope, FaTransgender, FaToggleOn, FaClock } from 'react-icons/fa';
import Swal from 'sweetalert2';

const UserDetails = () => {
  const user = useLoaderData();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-300 shadow-xl rounded-2xl mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        User Profile
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-lg">
        <div className="flex items-center gap-3">
          <FaUser className="text-blue-500" />
          <span className="font-semibold">Name:</span> {user.name}
        </div>

        <div className="flex items-center gap-3">
          <FaEnvelope className="text-green-500" />
          <span className="font-semibold">Email:</span> {user.email}
        </div>

        <div className="flex items-center gap-3">
          <FaTransgender className="text-purple-500" />
          <span className="font-semibold">Gender:</span> {user.gender}
        </div>

        <div className="flex items-center gap-3">
          <FaToggleOn className="text-yellow-500" />
          <span className="font-semibold">Status:</span> {user.status}
        </div>

        <div className="flex items-center gap-3">
          <FaClock className="text-gray-500" />
          <span className="font-semibold">Created:</span> {user.creationTime}
        </div>

        <div className="flex items-center gap-3">
          <FaClock className="text-gray-500" />
          <span className="font-semibold">Last Sign-in:</span> {user.lastSignInTime}
        </div>
      </div>

      <div className="mt-8 text-center">
              <Link to='/'>
              <button
          className="bg-blue-500 hover:cursor-pointer hover:bg-blue-600 text-white px-6 py-2 rounded-xl shadow-md transition"
        >
          Back
        </button>
              </Link>
      </div>
    </div>
  );
};

export default UserDetails;