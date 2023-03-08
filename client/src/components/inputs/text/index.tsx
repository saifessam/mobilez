import { ChangeEvent } from 'react';
import handleChange from '../../../utilities/handleChange';
import './style.css';

interface Props {
	label: string;
	name: string;
	placeholder?: string;
	setter: any;
}

function TextInput(props: Props) {
	return (
		<div className="input-container">
			<label className="input-container-label">{props.label}</label>
			<div className="input-container-field"> <input type="text" name={props.name} placeholder={props.placeholder} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange({ e, setter: props.setter })} /></div>
		</div>
	);
}

export default TextInput;