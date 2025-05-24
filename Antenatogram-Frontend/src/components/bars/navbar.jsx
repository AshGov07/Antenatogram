/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import useAuth from "../../hooks/useAuth";
import { Link } from 'react-router-dom';
import { Avatar, Dropdown } from "flowbite-react";
import useSignOut from "../../hooks/useSignOut";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ toggleSidebar }) => {  // Remove async
    const { auth } = useAuth();
    const authstatus = auth.loggedIn;
    const signOut = useSignOut();  // Get the signOut function

    // Create a handler for sign out that can be async
    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <div className="fixed top-0 left-0 right-0 h-1/12 bg-gray-100 bg-opacity-30 backdrop-blur-md flex justify-between items-center px-1/12 z-50">
            <p className="text-gray-800 text-xl md:text-lg font-semibold hover:text-black cursor-pointer">
                <Link to={!authstatus ? '/' : auth.role === 'patient' ? '/user' : '/patients'}>
                    AntenatApp
                </Link>
            </p>
            
            <div className="flex items-center space-x-6">
                {authstatus ? (
                        <div>
                            <Dropdown
                                label={<Avatar placeholderInitials="SP" rounded />}
                                arrowIcon={false}
                                inline
                                className="cursor-pointer"
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">{"Saanvi"}</span>
                                    <span className="block truncate text-sm font-medium">{"san.patel22@gmail.com"}</span>
                                </Dropdown.Header>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                            </Dropdown>
                        </div>
                ) : (
                    <Link
                        to="/login"
                        className="text-gray-800 text-xl md:text-lg font-semibold hover:text-black cursor-pointer"
                    >
                        Login
                    </Link>
                )}
                { authstatus && <FontAwesomeIcon icon={faBars} size="2x" onClick={toggleSidebar} className="block md:hidden"/>}
            
            </div>
        </div>
    );
};

export default Navbar;