import { useState, ChangeEvent } from 'react';
import Icons from './../../../data/icons';
import Button from './../../../components/button';
import './style.css';
import handleChange from '../../../utilities/handleChange';

interface Props {
	setter: any;
}

function PasswordInput(props: Props) {
	const [visible, setVisible] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const [error, setError] = useState("");
	const expression: RegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

	return (
		<div className="input-container">
			<label className="input-container-label">
				Password
				{isValid ? <Icons.TickCircleIcon /> : undefined}
				{error !== "" ? <span className="input-container-label-error">{error}</span> : undefined}
			</label>
			<div className="input-container-field password-input">
				<input type={visible ? "text" : "password"} name="password" placeholder="••••••••••••" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange({ e, expression, error: "Invalid password", setError, setIsValid, setter: props.setter })} />
				<Button type='button' icon={visible ? <Icons.EyeSlashIcon /> : <Icons.EyeIcon />} action={() => setVisible((current) => !current)} />
			</div>
		</div>
	);
}

export default PasswordInput;