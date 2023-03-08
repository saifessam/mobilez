import './style.css';

interface Props {
	message: string;
}

function Loading(props: Props) {
	return (
		<div className='loading'>
			<span>{props.message}</span>
			<div className="loader"><div></div></div>
		</div>
	);
}

export default Loading;