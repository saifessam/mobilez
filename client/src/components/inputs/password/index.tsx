import { ChangeEvent, useState } from 'react';
import handleChange from '../../../utilities/handle-change';
import { ReactComponent as EyeSlashIcon } from './../../../assets/svgs/icons/eye-slash.svg';
import { ReactComponent as EyeIcon } from './../../../assets/svgs/icons/eye.svg';
import { ReactComponent as TickCircleIcon } from './../../../assets/svgs/icons/tick-circle.svg';
import Button from './../../../components/button';
import './style.css';

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
				{isValid ? <TickCircleIcon /> : undefined}
				{error !== "" ? <span className="input-container-label-error">{error}</span> : undefined}
			</label>
			<div className="input-container-field password-input">
				<input type={visible ? "text" : "password"} name="password" placeholder="••••••••••••" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange({ e, expression, error: "Invalid password", setError, setIsValid, setter: props.setter })} />
				<Button type='button' condition='default' icon={visible ? <EyeSlashIcon /> : <EyeIcon />} action={() => setVisible((current) => !current)} />
			</div>
		</div>
	);
}

export default PasswordInput;