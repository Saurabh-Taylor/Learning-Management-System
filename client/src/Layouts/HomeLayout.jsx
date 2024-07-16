import React, { Children, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Button, Drawer, Radio, Space } from 'antd';
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button as UiButton } from "@/components/ui/button"
import { logout } from "@/store/features/AuthSlice";
import axios from "axios";




const HomeLayout = ({children}) => {

  return (
  <div className="min-h-[90vh]"> 
    <AppDrawer/>
    {children}
    <Footer/>
  </div>
  )
};

const  AppDrawer = ()=> {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(store=> store?.auth?.isLoggedIn)

    const role = useSelector(store=> store?.auth?.role)
    

    const drawerItems = [
        {
            name: "Home",
            path: "/",
            requiredAuth: false,
        },
        {
            name: "All Courses",
            path: "/courses",
            requiredAuth: false,
        },
        {
            name: "About Us",
            path: "/about",
            requiredAuth: false,
        },
        {
            name: "Contact Us",
            path: "/contact",
            requiredAuth: false,
        },
        {
            name: "Admin Dashboard",
            path: "/admin",
            requiredAuth: true,
            requiredRole: "ADMIN",
        }
    ];

    const filteredDrawerItems = drawerItems.filter(item => {
        if (isLoggedIn === "true" ) {
            if (item.requiredRole && item.requiredRole !== role) {
                return false;
            }
            return !item.hideWhenAuth;
        } else {
            const newitem   = !item.requiredAuth;
            return newitem
        }
    });
    

    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();
    const [placement, setPlacement] = useState('left');
    const showDrawer = () => {
        setSize('default');
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onChange = (e) => {
        setPlacement(e.target.value);
    };

    const handleLogout = async(e)=>{
        e.preventDefault();
        const result  = dispatch(logout())
        navigate("/login")
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3000/api/v1/user/logout" , {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
          },
        })
        console.log(response);
    }
  return (
    <>
      <Space className="absolute z-50 top-5 text-white" >
        <Button type="text" onClick={showDrawer}>
          <FiMenu size={"32px"} className=" text-white" />
        </Button>
      </Space>
      <Drawer
        placement={"left"}
        closable={false}
        size={"default"}
        onClose={onClose}
        open={open}
        key={placement}
        style={{ backgroundColor: '#374151 ' , color:"white"}} 
      >
        <Button className="absolute right-8"  onClick={onClose} > <AiFillCloseCircle size={"16px"} /> </Button>
        <div className="space-y-2">
            {filteredDrawerItems.map(item => (
                <li key={item.name} className="list-none text-base">
                    <Link to={item.path}>{item.name}</Link>
                </li>
            ))}
        </div>

       {!isLoggedIn && (
              <li className="absolute bottom-4 w-[90%] list-none" >
                <div className="w-full flex items-center justify-between ">
                  <UiButton className=" rounded-md w-[45%] font-semibold">
                    <Link to={"/login"}>Login</Link>
                  </UiButton>
                  <UiButton className="   font-semibold rounded-md w-[45%]">
                    <Link to={"/signup"}>Signup</Link>
                  </UiButton>
                </div>
              </li>
            )}
            {isLoggedIn && (
              <li className="absolute bottom-4 w-[90%] list-none" >
                <div className="w-full flex items-center justify-between list ">
                  <UiButton className="  btn rounded-md w-[45%] font-semibold">
                    <Link to={"/user/profile"}>Profile</Link>
                  </UiButton>
                  <UiButton className="   font-semibold rounded-md w-[45%]">
                    <Link onClick={handleLogout} >Logout</Link>
                  </UiButton>
                </div>
              </li>
            )}
        
      </Drawer>
    </>
  );
};


export default HomeLayout;
