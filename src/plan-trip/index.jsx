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
  DialogTitle, // Added DialogTitle for better structure
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
  const [formData, setFormData] = useState({});
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
    onError: () => toast.error("Google login failed!"),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.duration || !formData?.budget || !formData?.people || !formData?.location) {
      toast.error("Please fill all the fields!");
      return;
    }
    if (formData?.duration > 10 || formData?.duration < 1) {
      toast.error("Please enter a trip duration between 1 and 10 days!");
      return;
    }

    setLoading(true);
    toast.info("Crafting your journey, please wait...");

    const Final_AI_Prompt = AI_Prompt.replace("{Location}", formData?.location)
      .replace("{Duration}", formData?.duration)
      .replace("{Budget}", formData?.budget)
      .replace("{People}", formData?.people);

    try {
      const result = await main(Final_AI_Prompt);
      setLoading(false);

      if (!result) {
        toast.error("Something went wrong with the AI. Please try again!");
        return;
      }

      await SaveAITrip(result);
    } catch (error) {
      setLoading(false);
      console.error("Error generating trip:", error);
      toast.error("Something went wrong. Please try again!");
    }
  };

  const SaveAITrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docid = Date.now().toString();

    try {
      await setDoc(doc(db, "Trips", docid), {
        userSelection: formData,
        tripData: TripData, // Corrected key to match your schema
        userEmail: user?.email,
        id: docid,
      });
      toast.success("Trip saved successfully!");
      navigate(`/view-trip/${docid}`);
    } catch (err) {
      console.error("Error saving trip:", err);
      toast.error("Failed to save trip. Please try again!");
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
      setOpenDialog(false);
      toast.success("Logged in successfully!");
      OnGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Login failed, please try again!");
    }
  };

  return (
    <div className='sm:px-10 md:px-20 lg:px-32 px-5 mt-10'>
      
      {/* UPDATE: Main heading styling improved */}
      <div className="text-center my-12">
        <h1 className='text-4xl font-bold'>
          A Call to the <span className='text-[#5D2A2A]'>MusaFir</span> Within 🌄
        </h1>
        <p className='text-lg text-muted-foreground mt-3'>
          Every traveler's journey begins with a single destination. Tell us: where is your heart calling you?
        </p>
      </div>

      <div className='space-y-10'>
        
        {/* UPDATE: Two-column layout for Destination and Days */}
        <div className="md:flex gap-8">
          <div className="flex-1">
            <h2 className='text-xl font-medium my-4'>Enter Your Destination 📍</h2>
            <input
              type="text"
              className='p-2 border rounded-md w-full'
              placeholder='Where to next? e.g., Uttarakhand'
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>
          <div className="flex-1">
            <h2 className='text-xl font-medium my-4'>Number of Days for Your Trip 📅</h2>
            <input
              type="number"
              onChange={(e) => handleInputChange('duration', e.target.value)}
              className='p-2 border rounded-md w-full'
              placeholder='e.g., 7'
            />
          </div>
        </div>

        {/* Budget */}
        <div>
          <h2 className='text-xl font-medium my-4'>Select Your Budget Range ✨</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                // UPDATE: Improved selection style for both light/dark themes
                className={`p-4 border rounded-lg hover:shadow-lg transition-all cursor-pointer ${formData.budget === item.title ? 'ring-2 ring-[#5D2A2A]' : ''}`}
              >
                {/* UPDATE: Corrected semantics and styling */}
                <h3 className='text-3xl'>{item.icon}</h3>
                <h4 className='font-bold text-lg'>{item.title}</h4>
                <p className='text-sm text-muted-foreground'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Partners */}
        <div>
          <h2 className='text-xl font-medium my-4'>Who's traveling with you? 👥</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-5">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('people', item.people)}
                // UPDATE: Improved selection style for both light/dark themes
                className={`p-4 border rounded-lg hover:shadow-lg transition-all cursor-pointer ${formData.people === item.people ? 'ring-2 ring-[#5D2A2A]' : ''}`}
              >
                {/* UPDATE: Corrected semantics and styling */}
                <h3 className='text-3xl'>{item.icon}</h3>
                <h4 className='font-bold text-lg'>{item.title}</h4>
                <p className='text-sm text-muted-foreground'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* UPDATE: Centered and more prominent Generate Trip Button */}
        <div className='my-10 text-center'>
  <Button
    disabled={loading}
    onClick={OnGenerateTrip}
    className="cursor-pointer bg-gradient-to-r from-[#8a4a4a] to-[#5D2A2A] text-white text-lg h-12 px-8 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
  >
    {loading ? (
      <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
    ) : (
      "Craft My Journey ✈️"
    )}
  </Button>
</div>

      </div>

      {/* UPDATE: Refined Login Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader className="flex flex-col items-center text-center p-4">
            <img width="90px" src="/MusaFir-symbol.png" alt="MusaFir Logo" />
            <DialogTitle className='text-2xl font-bold mt-4'>Your Adventure Awaits!</DialogTitle>
            <DialogDescription>
              Please sign in to save your trip and unlock all features.
            </DialogDescription>
            <Button onClick={login} className="w-full mt-5 flex items-center justify-center gap-2 h-11" >
              <FcGoogle className='w-6 h-6' /> Sign In With Google
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
    </div>
  );
};

export default Plantrip;