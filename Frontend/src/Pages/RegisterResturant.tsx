import React, { useState } from "react";
import FloatingInput from "../Components/FloatingInput";
import {
  SquareUserRound,
  Phone,
  IdCard,
  House,
  MapPinHouse,
  Hotel,
  Utensils,
  Upload,
  Dot,
  Mail
} from "lucide-react";
import axios from "axios";

export default function RegisterRestaurant() {
  const [step, setStep] = useState(1);
  const [resturantId, setRestaurantId] = useState<String>("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    email: "",
    nic: "",
    restaurantName: "",
    address: "",
    city: "",
    category: "",
    logo: null as File | null,
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    console.log("FINAL DATA:", formData);

    const response = await axios.post("http://localhost:7000/api/restaurant/register", formData, { withCredentials: true });
    console.log("SERVER RESPONSE:", response.data);

    const restaurantId = response.data.id;

    setRestaurantId(restaurantId);
    setShowModal(true);

  };

  const handlePayment = async (restaurantId: String) => {
    const paymentRes = await axios.post(
      "http://localhost:7000/api/restaurant/pay",
      { restaurantId },
      { withCredentials: true }
    );

    window.location.href = paymentRes.data.url;
  }

  //  STEPPER UI 
  const StepCircle = ({ active }: { active: boolean }) => (
    <div
      className={`
        h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold
        ${active ? "bg-orange-500 text-white shadow-lg" : "bg-gray-200 text-gray-500"}
        transition-all duration-300
      `}
    >
      <Dot />
    </div>
  );

  const renderStep = () => {
    return (
      <div className="backdrop-blur-xl bg-white/30 shadow-xl border border-white/20 rounded-2xl p-10 w-full space-y-6 animate-fadeIn">
        {step === 1 && (
          <div className="h-96  flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-bold text-center mb-4">Owner Details</h2>

            <FloatingInput
              icon={SquareUserRound}
              label="Owner's Name"
              value={formData.ownerName}
              onChange={(e) => updateField("ownerName", e.target.value)}
            />

            <FloatingInput
              icon={Phone}
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />

            <FloatingInput
              icon={Mail}
              label="Email Address"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
            />

            <FloatingInput
              icon={IdCard}
              label="NIC Number"
              value={formData.nic}
              onChange={(e) => updateField("nic", e.target.value)}
            />

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          < div className="h-96  flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-bold text-center mb-4">Restaurant Details</h2>

            <FloatingInput
              icon={House}
              label="Restaurant Name"
              value={formData.restaurantName}
              onChange={(e) => updateField("restaurantName", e.target.value)}
            />

            <FloatingInput
              icon={MapPinHouse}
              label="Address"
              value={formData.address}
              onChange={(e) => updateField("address", e.target.value)}
            />

            <FloatingInput
              icon={Hotel}
              label="City"
              value={formData.city}
              onChange={(e) => updateField("city", e.target.value)}
            />

            <FloatingInput
              icon={Utensils}
              label="Category (Fast Food, Cafe, etc)"
              value={formData.category}
              onChange={(e) => updateField("category", e.target.value)}
            />

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                ← Back
              </button>

              <button
                onClick={() => setStep(3)}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="h-96  flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-bold text-center mb-4">Branding</h2>

            <label className="border-2 border-dashed border-orange-400 p-6 rounded-xl flex flex-col items-center gap-3 cursor-pointer hover:bg-orange-50 transition">
              <Upload className="h-8 w-8 text-orange-500" />
              <span className="text-gray-600">Upload Restaurant Logo</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => updateField("logo", e.target.files?.[0] || null)}
              />
            </label>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                ← Back
              </button>

              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>

      <div className="max-w-2xl mx-auto p-10 min-h-screen flex flex-col items-center justify-center space-y-5 ">

        {/*STEP INDICATOR  */}
        <div className="flex items-center gap-6">
          <StepCircle active={step === 1} />
          <div className="w-16 h-1 bg-gray-300"></div>
          <StepCircle active={step === 2} />
          <div className="w-16 h-1 bg-gray-300"></div>
          <StepCircle active={step === 3} />
        </div>

        {renderStep()}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-md text-center space-y-6 animate-fadeIn">

            <h2 className="text-2xl font-bold text-gray-800">
              Restaurant Registered 🎉
            </h2>

            <p className="text-gray-600">
              Your restaurant was successfully submitted.
              Complete the registration by making the payment.
            </p>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
              >
                Close
              </button>

              <button
                onClick={handlePayment.bind(null, resturantId)}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
              >
                Pay Now
              </button>
            </div>

          </div>

        </div>
      )}
    </>
  );
}
