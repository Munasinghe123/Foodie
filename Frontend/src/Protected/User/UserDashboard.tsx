import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRole } from "../../store/userSlice";
import type { RootState } from "../../store/store";

export default function UserDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRole = useSelector(
    (state: RootState) => state.user.user?.role
  );

  const [showClaimButton, setShowClaim] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:7000/api/restaurant/showClaimButton",
          { withCredentials: true }
        );
        setShowClaim(res.data.showClaimButton);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    if (userRole === "restaurantOwner") {
      navigate("/restaurant-owner");
    }
  }, [userRole, navigate]);

  const handleClaimRestaurant = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:7000/api/restaurant/claim",
        {},
        { withCredentials: true }
      );

      dispatch(updateUserRole(res.data.role));

      console.log("new user role", res.data.role);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      User dashboard

      {showClaimButton && (
        <button
          onClick={handleClaimRestaurant}
          className="btn btn-primary mt-4"
        >
          Claim Your Restaurant
        </button>
      )}
    </div>
  );
}
