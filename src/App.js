import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState(null);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://randomuser.me/api/?page=1&results=1&seed=abc"
      );
      if (res && res.data) {
        setUserData(res.data.results[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {userData && (
        <div className="bg-white rounded-xl p-4 w-96 shadow-md border">
          {/* Main User Info */}
          <div className="flex items-center gap-4">
            <img
              className="w-20 h-20 rounded-full border-2 border-blue-200"
              src={userData.picture.large}
              alt="User Pic"
            />
            <div>
              <h2 className="text-xl font-medium text-blue-700">
                {userData.name.first} {userData.name.last}
              </h2>
              <p className="text-sm text-blue-600 capitalize">{userData.gender}</p>
              <p className="text-sm text-gray-600">{userData.phone}</p>
            </div>
          </div>

          {/* More Info Button */}
          <button
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => setShowMoreInfo(!showMoreInfo)}
          >
            {showMoreInfo ? "Hide Info" : "More Info"}
          </button>

          {/* More Info Section with Transition */}
          <div
            className={`mt-4 bg-blue-50 p-3 rounded-lg transition-all duration-500 ease-in-out ${
              showMoreInfo ? "max-h-96 opacity-100" : "h-0 hidden overflow-auto"
            }`}
          >
            <p className="text-sm text-gray-700">
              <span className="font-medium">Email:</span> {userData.email}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Address:</span>{" "}
              {userData.location.street.number}, {userData.location.street.name},{" "}
              {userData.location.city}, {userData.location.state},{" "}
              {userData.location.country}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Timezone:</span>{" "}
              {userData.location.timezone.description}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">DOB:</span>{" "}
              {new Date(userData.dob.date).toLocaleDateString()} (
              {userData.dob.age} years old)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
