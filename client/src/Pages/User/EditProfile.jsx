import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import HomeLayout from "@/Layouts/HomeLayout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowLeft, AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "@/store/features/AuthSlice";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be 50 characters or less"),
  avatar: z.instanceof(FileList).optional().refine(
    (files) => !files || files.length === 0 || files[0].size <= 5000000,
    "Image size should be less than 5MB"
  ),
});

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  const [previewImage, setPreviewImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const userId = useSelector(store => store?.auth?.data?._id);
  const navigate = useNavigate()
  const avatarFile = watch("avatar");

  const dispatch = useDispatch()

  useEffect(() => {
    if (avatarFile && avatarFile[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(avatarFile[0]);
    } else {
      setPreviewImage("");
    }
  }, [avatarFile]);

  const onSubmit = async (values) => {
    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      
      if (values.avatar && values.avatar[0]) {
        formData.append('avatar', values.avatar[0]);
      }

      const token = localStorage.getItem("token");
      
      const { data } = await axios.put(`http://localhost:3000/api/v1/user/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(data);
      dispatch(getProfile())
      
      toast.success("Profile updated successfully!");
      setIsUpdating(false);
      await new Promise(r => setTimeout(r, 700))
      navigate("/user/profile")
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <HomeLayout>
      <div className="min-h-[90vh] bg-[#1b263b] py-4 sm:py-6 md:py-10 px-4 sm:px-6 lg:px-8 text-white">
        <Card className="w-full max-w-md mx-auto mt-4 sm:mt-6 md:mt-10">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold">Update Profile</CardTitle>
            <CardDescription className="text-sm sm:text-base">Update your name and avatar.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name
                </Label>
                <Input id="name" {...register("name")} placeholder="Enter your name" className="w-full" />
                {errors.name && <p className="text-red-500 text-xs sm:text-sm">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatar" className="text-sm font-medium">
                  Avatar
                </Label>
                <Input id="avatar" type="file" {...register("avatar")} className="w-full text-sm" />
                {errors.avatar && <p className="text-red-500 text-xs sm:text-sm">{errors.avatar.message}</p>}
                {previewImage && (
                  <div className="mt-2 flex justify-center">
                    <img src={previewImage} alt="Avatar preview" className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full" />
                  </div>
                )}
              </div>
              <Link  to={"/user/profile"}>
                <p className=" text-black ease-in-out duration-75 transition-all hover:text-yellow-500 mt-6 link text-accent cursor-pointer flex items-center justify-center w-full  gap-2">
                  <AiOutlineArrowLeft /> Back to Profile
                </p>
              </Link>
              <Button type="submit" className="w-full mt-4" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Profile'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </HomeLayout>
  );
}