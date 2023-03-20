import './style.css';

interface Props {
	children?: React.ReactNode;
	alignment: "main" | "row" | "column" | "grid";
	hasPadding?: boolean;
	centerContent?: boolean;
	addSpacing?: boolean;
	fitContent?: boolean;
}

function Section(props: Props) {
	function handleClassNames(): string[] {
		let classNames: string[] = ["section-body", props.alignment];

		if (props.hasPadding) classNames.push('has-padding');
		if (props.centerContent) classNames.push('center-content');
		if (props.addSpacing) classNames.push('add-spacing');
		if (props.fitContent) classNames.push('fit-content');

		return classNames;
	}

	return (
		<section className={handleClassNames().join(" ")}>
			{props.children}
		</section>
	);
}

export default Section;