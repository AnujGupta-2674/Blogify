import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthUser from "../hooks/useAuthUser"
import { Link, useLocation } from "react-router-dom";
import { BellIcon, LogOutIcon, ShipWheelIcon } from "lucide-react";
import { logout } from "../lib/api.js"
import ThemeSelector from "./ThemeSelector.jsx"
import { useState } from "react";

const Navbar = () => {
    const { authUser } = useAuthUser();
    const location = useLocation();
    const isChatPage = location.pathname?.startsWith("/chat");
    const [isProfileOpen, setisProfileOpen] = useState(false);

    const queryClient = useQueryClient();

    const { mutate: logoutMutation } = useMutation({
        mutationFn: logout,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] })
    });

    return (
        <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
            <div className="p-5 border-b border-base-300">
                <Link to="/" className="flex items-center gap-2.5">
                    <ShipWheelIcon className="size-9 text-primary" />
                    <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                        Blogify
                    </span>
                </Link>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg_px-8">
                <div className="flex items-center justify-end w-full">
                    {/* Logo - Only in the chat page */}
                    {isChatPage && (
                        <div className="pl-5">
                            <Link to="/" className="flex items-center gap-2.5">
                                <ShipWheelIcon className="size-9 text-primary" />
                                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                                    Blogify
                                </span>
                            </Link>
                        </div>
                    )}

                    <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                        <Link to={"/notifications"}>
                            <button className="btn btn-ghost btn-circle">
                                <BellIcon className="h-6 w-6 text-base-content opacity-70"></BellIcon>
                            </button>
                        </Link >
                    </div>

                    <ThemeSelector />

                    <div className="avatar dropdown dropdown-end" onClick={() => setisProfileOpen(!isProfileOpen)}>
                        <div className="w-6 rounded-full">
                            <img src={authUser?.profilePic || "https://avatar.iran.liara.run/public/21.png"} alt="User Avatar" rel="noreferrer" />
                        </div>
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl
        w-35 border border-base-content/10 h-[140px] flex flex-col justify-center items-center overflow-y-auto">
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-sm font-medium hover:bg-base-content/5"
                                    onClick={() => setisProfileOpen(false)}
                                >
                                    Your Profile
                                </Link>
                                <Link
                                    to="/collaborate"
                                    className="block px-4 py-2 text-sm font-medium hover:bg-base-content/5"
                                    onClick={() => setisProfileOpen(false)}
                                >
                                    Collaborate
                                </Link>
                                <Link
                                    to="/friends"
                                    className="block px-4 py-2 text-sm font-medium hover:bg-base-content/5"
                                    onClick={() => setisProfileOpen(false)}
                                >
                                    Explore Friends
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Logout button */}
                    <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
                        <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
                    </button>
                </div>
            </div>

        </nav>
    )
}

export default Navbar