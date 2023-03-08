import { useSelector } from 'react-redux';
import './style.css';


function Footer() {
	const { isToggled: searchToggle } = useSelector((state: any) => state.search);
	const { isToggled: menuToggle } = useSelector((state: any) => state.menu);

	return (
		<footer className={menuToggle ? 'transform-left' : searchToggle ? 'transform-right' : undefined}>
			<span id='copyrights'>Mobilez © 2022</span>
			<span id='attribution'>Designed & Developed by <a href="https://www.saifessam.com/" target="_blank" rel="noreferrer">Saif Essam</a></span>
		</footer>
	);
}

export default Footer;