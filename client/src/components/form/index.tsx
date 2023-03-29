import { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Message from '../../types/message';
import Button from './../../components/button';
import './style.css';

interface Props {
	onSubmit: any;
	encType?: string;
	title: string;
	link?: { path: string; label: string; };
	children: React.ReactNode;
	message: Message;
	loading: boolean;
}

function Form(props: Props) {
	const [label, setLabel] = useState<Message>({ succeed: null, response: "Submit" });

	useEffect(() => {
		if (props.loading) setLabel({ succeed: null, response: "Loading..." });
	}, [props.loading]);

	useEffect(() => {
		if (props.message.succeed !== null && props.message.response !== null) setLabel(props.message);
		setTimeout(() => setLabel({ succeed: null, response: "Submit" }), 3000);
	}, [props.message]);

	return (
		<form method='POST' autoComplete='off' encType={props.encType} onSubmit={(e: SyntheticEvent) => props.onSubmit(e)}>
			<div className='form-header'>
				<span>{props.title}</span>
				{props.link ? <Link to={props.link.path}>{props.link.label}</Link> : undefined}
			</div>
			<div className='form-body'>
				{props.children}
			</div>
			<div className="form-footer">
				<Button type="submit" condition={label.succeed === null ? 'primary' : label.succeed ? 'success' : 'fail'} label={label.response!} />
			</div>
		</form>
	);
}

export default Form;