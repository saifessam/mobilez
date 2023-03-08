import { useSelector } from 'react-redux';
import './style.css';

interface Props {
	children: React.ReactNode;
}

function Main(props: Props) {
	const { isToggled: menuToggle } = useSelector((state: any) => state.menu);
	const { isToggled: searchToggle } = useSelector((state: any) => state.search);

	return (
		<main className={menuToggle ? 'transform-left' : searchToggle ? 'transform-right' : undefined}>{props.children}</main>
	);
}

export default Main;