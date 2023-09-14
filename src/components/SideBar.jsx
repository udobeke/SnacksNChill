import './SideBar.css'
import * as Unicons from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>SnacksNChill</h2>

      <div className='menu'>
        <ul>
          <li>
          <Link to="/Home" className="active">
            <Unicons.UilEstate className='icon' />
            <span className="links_name">Dashboard</span>
          </Link>
          </li>
          <li>
            <Link to="/Home">
              <Unicons.UilFilm className='icon' />
              <span className="links_name">Movie</span>
            </Link>
          </li>
          <li>
          <Link to="/Home" >
            <Unicons.UilTvRetro className='icon' />
            <span className="links_name">TV series</span>
            </Link>
          </li>
          <li>
            <Link to="/Home" >
              <Unicons.UilPlus className='icon' />
              <span className="links_name">Upcoming</span>
            </Link>
          </li>

          <li className="log_out">
            <Link to="/Login">
              <Unicons.UilSignout className='icon' />
              <span className="links_name">Log out</span>
            </Link>
          </li>
        </ul>

      </div>
    </div>
  );
}

export default Sidebar;
