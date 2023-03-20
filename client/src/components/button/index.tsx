import './style.css';

interface Props {
	type: "button" | "submit";
	condition: "fail" | "success" | "primary" | "secondary" | "default";
	icon?: React.ReactNode;
	label?: string;
	action?: any;
	disabled?: any;
}

function Button(props: Props) {
	return (
		<button type={props.type} className={props.condition} onClick={props.action} disabled={props.disabled}>
			{props.label ? <span>{props.label}</span> : undefined}
			{props.icon}
		</button>
	);

}

export default Button;