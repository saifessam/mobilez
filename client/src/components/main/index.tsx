import './style.css';

interface Props {
	children: React.ReactNode;
}

function Main(props: Props) {
	return (
		<main>{props.children}</main>
	);
}

export default Main;