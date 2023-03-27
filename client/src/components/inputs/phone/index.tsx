import { ChangeEvent, useState } from 'react';
import handleChange from '../../../utilities/handle-change';
import { ReactComponent as TickCircleIcon } from './../../../assets/svgs/icons/tick-circle.svg';
import './style.css';

interface Props {
	setter: any;
	value?: string;
	placeholder?: string;
}

function PhoneInput(props: Props) {
	const { setter } = props;
	const [isValid, setIsValid] = useState(false);
	const [error, setError] = useState("");
	const expression: RegExp = /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

	return (
		<div className="input-container">
			<label className="input-container-label">
				Phone number
				{isValid ? <TickCircleIcon /> : undefined}
				{error !== "" ? <span className="input-container-label-error">{error}</span> : undefined}
			</label>
			<div className="input-container-field"> <input type="text" name="phone" placeholder={props.placeholder ?? "01XXXXXXXXX"} defaultValue={props.value} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange({ e, expression, error: "Invalid phone number", setError, setIsValid, setter })} /></div>
		</div>
	);
}

export default PhoneInput;