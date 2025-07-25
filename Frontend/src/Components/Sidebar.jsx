import useAuthUser from '../hooks/useAuthUser'
import { useLocation, Link } from 'react-router-dom';
import { ShipWheelIcon, HomeIcon, UsersIcon, BellIcon } from 'lucide-react';

const Sidebar = () => {
    const { authUser } = useAuthUser();
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <aside className='w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0'>
            <nav className='flex-1 p-4 space-y-1'>
                <Link
                    to="/"
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/" ? "btn-active" : ""
                        }`}
                >
                    <HomeIcon className="size-5 text-base-content opacity-70" />
                    <span>Home</span>
                </Link>

                <Link
                    to="/friends"
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/friends" ? "btn-active" : ""
                        }`}
                >
                    <UsersIcon className="size-5 text-base-content opacity-70" />
                    <span>Explore Friends</span>
                </Link>

                <Link
                    to="/notifications"
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/notifications" ? "btn-active" : ""
                        }`}
                >
                    <BellIcon className="size-5 text-base-content opacity-70" />
                    <span>Notifications</span>
                </Link>
            </nav>

            {/* UserProfile Section */}
            <div className='p-4 border-t border-base-300 mt-auto'>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={authUser?.profilePic || "https://avatar.iran.liara.run/public/21.png"} alt="User Avatar" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-sm">{authUser?.fullName}</p>
                        <p className="text-xs text-success flex items-center gap-1">
                            <span className="size-2 rounded-full bg-success inline-block" />
                            Online
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar