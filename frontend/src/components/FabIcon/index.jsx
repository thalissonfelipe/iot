import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiLogOutCircle } from 'react-icons/bi';
import { FaUserCog, FaEdit } from 'react-icons/fa';

import { logout, isAuthenticated } from '../../services/auth';

import './styles.css';

export default function FabIcon() {
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setIsOpen(!isOpen);
    }

    function handleLogout() {
        logout();
        window.location.reload();
    }

    return isAuthenticated() && (
        <div>
            <div className={isOpen ? 'fab-icon logout active' : 'fab-icon logout'}>
                <BiLogOutCircle size={24} onClick={handleLogout} />
            </div>
            <Link to='/recipients/edit' className={isOpen ? 'fab-icon edit-recipient active' : 'fab-icon edit-recipient'}>
                <FaEdit size={24} onClick={() => {}} />
            </Link>
            <div className='fab-icon' onClick={handleClick}>
                <FaUserCog size={30} />
            </div>
        </div>
    );
}
