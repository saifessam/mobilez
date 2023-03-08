import { ChangeEvent, useState } from 'react';
import Icons from '../../../data/icons';
import handleChange from '../../../utilities/handleChange';
import './style.css';

interface Props {
	setter: any;
}

function EmailInput(props: Props) {
	const [isValid, setIsValid] = useState(false);
	const [error, setError] = useState("");
	const expression: RegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

	return (
		<div className="input-container">
			<div className="input-container-label">
				E-mail
				{isValid ? <Icons.TickCircleIcon /> : undefined}
				{error !== "" ? <span className="input-container-label-error">{error}</span> : undefined}
			</div>
			<div className="input-container-field">
				<input
					type="email"
					name="email"
					placeholder="example@email.com"
					onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange({ e, expression, error: "Invalid email address", setError, setIsValid, setter: props.setter })}
				/>
			</div>
		</div>
	);
}

export default EmailInput;