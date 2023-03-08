import './style.css';

interface Props {
	type: "button" | "submit";
	icon?: React.ReactNode;
	label?: string;
	primary?: boolean;
	secondary?: boolean;
	small?: boolean;
	action?: any;
	disabled?: any;
}

function Button(props: Props) {
	function renderClassNames(): string[] {
		let classNames: string[] = [];

		if (props.primary) classNames.push("primary");
		if (props.secondary) classNames.push("secondary");
		if (props.small) classNames.push("small");

		return classNames;
	}

	return (
		<button type={props.type} className={renderClassNames().join(' ')} onClick={props.action} disabled={props.disabled}>
			{props.label ? <span>{props.label}</span> : undefined}
			{props.icon}
		</button>
	);

}

export default Button;