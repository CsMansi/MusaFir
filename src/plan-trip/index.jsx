import { AI_Prompt, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import main from '@/Service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/Service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/custom/footer';

const Plantrip = () => {
  const [place, setPlace] = useState("");
  const [formData, setFormData] = useState({}); // ✅ should be object, not []
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = useGoogleLogin({
    onSuccess: codeResponse => GetUserProfile(codeResponse),
    onError: () => toast("Google login failed!"),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.duration || !formData?.budget || !formData?.people || !formData?.location) {
      toast("Please fill all the fields !");
      return;
    }
    if (formData?.duration > 10 || formData?.duration < 1) {
      toast("Please enter a valid duration !");
      return;
    }

    setLoading(true);
    toast("Generating Trip, Please wait...");

    const Final_AI_Prompt = AI_Prompt.replace("{Location}", formData?.location)
      .replace("{Duration}", formData?.duration)
      .replace("{Budget}", formData?.budget)
      .replace("{People}", formData?.people)
      .replace("{Duration}", formData?.duration);

    try {
      const result = await main(Final_AI_Prompt);
      console.log("AI Response Object:", result);

      setLoading(false);

      if (result?.error) {
        console.error("Error from AI Service:", result.error);
        toast("Something went wrong with the AI response. Please try again!");
        return;
      }

      SaveAITrip(result);
    } catch (error) {
      setLoading(false);
      console.error("Error generating trip:", error);
      toast("Something went wrong. Please try again!");
    }
  };

  const SaveAITrip = async (TripData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast("User not found, please log in again.");
      setOpenDialog(true);
      return;
    }

    const docid = Date.now().toString();

    setLoading(true);
    try {
      await setDoc(doc(db, "Trips", docid), {
        userSelection: formData,
        tripdata: TripData,
        userEmail: user?.email,
        id: docid,
      });
      toast("Trip saved successfully!");
      navigate(`/view-trip/${docid}`);
    } catch (err) {
      console.error("Error saving trip:", err);
      toast("Failed to save trip. Check Firestore rules!");
    } finally {
      setLoading(false);
    }
  };

  const GetUserProfile = async (tokeninfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokeninfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokeninfo?.access_token}`,
            Accept: 'application/json',
          },
        }
      );

      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));

      await setDoc(doc(db, "Users", userData.sub), {
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
        verified_email: userData.email_verified,
        createdAt: new Date().toISOString(),
      }, { merge: true });

      setOpenDialog(false);
      toast("Logged in successfully !");
      OnGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast("Login failed, please try again!");
    }
  };

  return (
    <div className='sm:px-10 md:px-15 lg:px-20 xl:px-25 px-5 mt-10 '>
      <h1 className='font-bold text-3xl text-center my-12'>
        A Call to the <span className='text-[#5D2A2A] text-shadow-md'>MusaFir</span> Within 🌄
      </h1>
      <p className='m-5 text-white-700 text-xl text-center my-12'>
        Every traveler's journey begins with a single destination. Tell us: where is your heart calling you?
      </p>

      <div>
        {/* Destination */}
        <div className='mt-10'>
          <h2 className='text-xl font-medium  my-4'>Enter Your Destination 📍</h2>
          <input
            type="text"
            className='border border-gray-500 font-medium p-2 rounded-md w-1/2'
            placeholder='Enter a destination...'
            onChange={(e) => { setPlace(e.target.value); handleInputChange('location', e.target.value) }}
            value={place}
          />
        </div>

        {/* Duration */}
        <div className='mt-5'>
          <h2 className='text-xl font-medium my-4'>Number of Days for Your Trip 📅</h2>
          <input
            type="number"
            onChange={(e) => handleInputChange('duration', e.target.value)}
            className='border border-gray-500 font-medium p-2 rounded-md w-1/2'
            placeholder='{Ex.3}'
          />
        </div>

        {/* Budget */}
        <div className='mt-5'>
          <h2 className='text-xl font-medium my-4'>Select Your Budget Range ✨</h2>
          <div className="grid grid-cols-3 gap-5 mt-5 max-w-5xl">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer
                ${formData.budget === item.title ? 'bg-gray-200 shadow-xl' : ''}`}
              >
                <h2 className='text-3xl '>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-white-300'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Partners */}
        <div className='mt-5'>
          <h2 className='text-xl font-medium my-4'>Who's traveling with you?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5 max-w-5xl">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('people', item.people)}
                className={`p-4 border rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer
                ${formData.people === item.people ? 'bg-gray-200 shadow-xl' : ''}`}
              >
                <h2 className='text-3xl '>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-white-600'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className='m-10 flex justify-end w-[75%]'>
          <Button className="cursor-pointer" disabled={loading} onClick={OnGenerateTrip}>
            {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : "Generate Trip"}
          </Button>
        </div>

        {/* Login Dialog */}
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img width="150px" src="/TriPLAN-logo.svg" alt="" />
                <h2 className='text-grey font-bold text-lg mt-6 mb-1'>Sign In With Google</h2>
                <h2>Sign to the App with Google authentication securely</h2>
                <Button onClick={login} className="w-full mt-5 cursor-pointer flex items-center" >
                  <FcGoogle className='w-7 mr-2' /> Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Footer />
      </div>
    </div>
  );
};

export default Plantrip;
