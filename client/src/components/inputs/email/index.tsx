import { ChangeEvent, useState } from 'react';
import handleChange from '../../../utilities/handle-change';
import { ReactComponent as TickCircleIcon } from './../../../assets/svgs/icons/tick-circle.svg';
import './style.css';

interface Props {
	setter: any;
	value?: string;
}

function EmailInput(props: Props) {
	const [isValid, setIsValid] = useState(false);
	const [error, setError] = useState("");
	const expression: RegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

	return (
		<div className="input-container">
			<div className="input-container-label">
				E-mail
				{isValid ? <TickCircleIcon /> : undefined}
				{error !== "" ? <span className="input-container-label-error">{error}</span> : undefined}
			</div>
			<div className="input-container-field">
				<input
					type="email"
					name="email"
					placeholder="example@email.com"
					defaultValue={props.value}
					onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange({ e, expression, error: "Invalid email address", setError, setIsValid, setter: props.setter })}
				/>
			</div>
		</div>
	);
}

export default EmailInput;