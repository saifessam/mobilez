import { ChangeEvent, useState } from 'react';
import Icons from '../../../data/icons';
import handleChange from '../../../utilities/handle-change';
import './style.css';

interface Props {
	setter: any;
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
				{isValid ? <Icons.TickCircleIcon /> : undefined}
				{error !== "" ? <span className="input-container-label-error">{error}</span> : undefined}
			</label>
			<div className="input-container-field"> <input type="text" name="phone" placeholder="01XXXXXXXXX" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange({ e, expression, error: "Invalid phone number", setError, setIsValid, setter })} /></div>
		</div>
	);
}

export default PhoneInput;