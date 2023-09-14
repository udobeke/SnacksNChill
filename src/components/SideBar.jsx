import './SideBar.css'
import * as Unicons from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo-details">
        <Link to="/" className='mb-3 logo'><h2 className='logo snack'>Snacks<span className='single'>N</span><span className='chill'>Chill</span></h2></Link>
      </div>

      <div className='menu'>
        <ul>
          <li>
          <Link to="/" className="active">
            <Unicons.UilEstate className='icon' />
            <span className="links_name">Home</span>
          </Link>
          </li>
          <li>
            <Link to="/MovieDetails">
              <Unicons.UilFilm className='icon' />
              <span className="links_name">Movie</span>
            </Link>
          </li>
          <li>
          <Link to="/MovieList" >
            <Unicons.UilTvRetro className='icon' />
            <span className="links_name">TV series</span>
            </Link>
          </li>
          <li>
            <Link to="/MovieList" >
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
