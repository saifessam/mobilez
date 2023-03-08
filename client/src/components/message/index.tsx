import { Link } from 'react-router-dom';
import './style.css';

interface Props {
	message: string;
	decription: string;
	contidition?: "success" | "fail";
	redirect?: string;
}

function Message(props: Props) {
	return (
		<div className='message'>
			<div className='message-header'><span className={props.contidition ? props.contidition === "success" ? 'success' : 'fail' : undefined}>{props.message}</span></div>
			<div className="message-body"><span>{props.decription}</span></div>
			{props.redirect ? <div className="message-footer"><Link to={props.redirect}>Return to home page</Link></div> : undefined}
		</div>
	);
}

export default Message;