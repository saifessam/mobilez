import { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from './../../components/button';
import './style.css';

interface Props {
	onSubmit: any;
	encType?: string;
	title: string;
	link?: { path: string; label: string; };
	children: React.ReactNode;
	message: { succeed: boolean | null; response: string | null; };
	loading: boolean;
	assistance?: boolean;
}

function Form(props: Props) {
	return (
		<form method='POST' autoComplete='off' encType={props.encType} onSubmit={(e: SyntheticEvent) => props.onSubmit(e)}>
			<div className='form-header'>
				<span>{props.title}</span>
				{props.link ? <Link to={props.link.path}>{props.link.label}</Link> : undefined}
			</div>
			<div className='form-body'>
				{props.children}
				{props.message.succeed !== null && props.message.response !== null ? <span className={props.message.succeed ? "success" : "fail"} id="form-message">{props.message.response}</span> : undefined}
			</div>
			<div className="form-footer">
				<Button type="submit" label={props.loading ? "Loading..." : "Submit"} primary />
				{props.assistance ? <span id='assistance'>Having any troubles? <Link to={'/support'}>Get help</Link></span> : undefined}
			</div>
		</form>
	);
}

export default Form;