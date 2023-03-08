import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import searchSlice from './../../context/slices/search';
import menuSlice from './../../context/slices/menu';
import Button from '../button';
import Icons from './../../data/icons';
import './style.css';

function Navbar() {
	const { isToggled: searchToggle } = useSelector((state: any) => state.search);
	const { isToggled: menuToggle } = useSelector((state: any) => state.menu);
	const dispatch = useDispatch();

	return (
		<nav className={menuToggle ? 'transform-left' : searchToggle ? 'transform-right' : undefined}>
			<Button type="button" icon={<Icons.SearchIcon />} action={() => dispatch(searchSlice.actions.toggle())} />
			<Link to={'/'}><span>Mobilez</span></Link>
			<Button type="button" icon={<Icons.MenuIcon />} action={() => dispatch(menuSlice.actions.toggle())} />
		</nav>
	);
}

export default Navbar;