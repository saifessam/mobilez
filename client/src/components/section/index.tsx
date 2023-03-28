import { Link } from 'react-router-dom';
import './style.css';

interface Props {
	children?: React.ReactNode;
	alignment: "main" | "row" | "column" | "grid";
	hasPadding?: boolean;
	centerContent?: boolean;
	addSpacing?: boolean;
	fitContent?: boolean;
	title?: { label: string; link: { label: string; path: string; }; };
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
		<>
			<section >
				{!props.title ? undefined : <div className='section-header'><span>{props.title.label}</span><Link to={props.title.link.path}>{props.title.link.label}</Link></div>}
				<div className={handleClassNames().join(" ")}>{props.children}</div>
			</section>
		</>
	);
}

export default Section;