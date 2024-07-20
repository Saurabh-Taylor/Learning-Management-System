import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import axiosInstance from "@/Helpers/AxiosInstance";

const loginSchema = z.object({
  email: z.string().min(8, { message: "Must be a valid email" }).max(50).email(),
  password: z.string().min(8, { message: "Password should be more than 8 characters" }).max(50),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(6, { message: "Name should be more than 6 characters" }).max(50),
  avatar: z.instanceof(File).optional().refine(
    (file) => file && file.size <= 2000000,
    { message: "Avatar must be less than 2MB" }
  ),
});

const AuthForm = ({ type = "signup" }) => {

  const [showPassword, setShowPassword] = useState(false);
  const formSchema = type === "login" ? loginSchema : signupSchema;
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(type === "signup" && { name: "", avatar: "" }),
    },
  });

  async function onSubmit(values) {

    if (type === "signup") {
      const formData = new FormData();
  
      for (const key in values) {
        if (key === 'avatar' && values[key]) {
          formData.append('avatar', values[key]);
        } else {
          formData.append(key, values[key]);
        }
      }
      const response  = await axios.post('http://localhost:3000/api/v1/user/register' , values , {headers:{
        "Content-Type":"multipart/form-data"
      }} )
      localStorage.setItem("token" , response.data.token)
      localStorage.setItem("isLoggedIn" , true)
      localStorage.setItem("role" , response?.data?.user.role)
      localStorage.setItem("data" , JSON.stringify( response.data.user))
      navigate("/")
      if(response.status === 200){
        toast.success("User Registered  Successfully")
      }else{
        toast.error("Login Failed")
      }

    }else if(type === "login"){
      const response  = await axios.post('http://localhost:3000/api/v1/user/login'  , values )
      localStorage.setItem("token" , response.data.token)
      localStorage.setItem("isLoggedIn" , true)
      localStorage.setItem("role" , response?.data?.user.role)
      localStorage.setItem("data" , JSON.stringify( response.data.user))
      navigate("/")
      if(response.status === 200){
        toast.success("Login Successfully")
      }else{
        toast.error("Login Failed")
      }
    }
   
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-[#005f73]  rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {type === "login" ? "Login" : "Sign Up"}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-black w-full"
                    placeholder="Enter Your Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {type === "signup" && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-black w-full"
                      placeholder="Enter Your Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="bg-black pr-10 w-full"
                      placeholder="Enter Your Password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="h-4 w-4 text-gray-400" />
                      ) : (
                        <FaEye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {type === "signup" && (
            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      className="bg-black w-full"
                      accept="image/*"
                      onChange={(e) => onChange(e.target.files[0])}
                      {...rest}
                    />
                  </FormControl>
                  <FormDescription>
                    <span className="text-gray-800" >Upload an avatar image (max 2MB)</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div> {type==="signup" ? (
            <div className="text-center" >Already have an account ?  <Link to={"/login"} className="text-blue-400 hover:text-blue-600" >Login</Link>  </div>
          ):(
            <div className="text-center" > Don't Have an Account ?  <Link to={"/signup"} className="text-blue-400 hover:text-blue-600" >Signup</Link>  </div>
          )} </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-800 ">
            {type === "login" ? "Login" : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;