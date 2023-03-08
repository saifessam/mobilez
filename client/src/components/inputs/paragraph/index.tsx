import { ChangeEvent } from 'react';
import handleChange from '../../../utilities/handleChange';
import './style.css';

interface Props {
	label: string;
	name: string;
	placeholder?: string;
	setter: any;
}

function ParagraphInput(props: Props) {
	return (
		<div className="input-container">
			<label className="input-container-label">{props.label}</label>
			<div className="input-container-field"><textarea name={props.name} placeholder={props.placeholder} rows={5} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange({ e, setter: props.setter })} /></div>
		</div>
	);
}

export default ParagraphInput;