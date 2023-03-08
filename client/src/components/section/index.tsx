import Button from './../button';
import Icons from './../../data/icons';
import './style.css';

interface Props {
	children?: React.ReactNode;
	alignment: "main" | "row" | "column" | "grid";
	hasPadding?: boolean;
	centerContent?: boolean;
	addSpacing?: boolean;
	fitContent?: boolean;
}

interface SectionHeaderProps {
	title?: string;
	withFilters?: boolean;
	filtersToggler?: any;
}

function Section(props: Props) {
	function handleClassNames(): string[] {
		let classNames: string[] = [props.alignment];

		if (props.hasPadding) classNames.push('has-padding');
		if (props.centerContent) classNames.push('center-content');
		if (props.addSpacing) classNames.push('add-spacing');
		if (props.fitContent) classNames.push('fit-content');

		return classNames;
	}

	return (
		<section className={handleClassNames().join(" ")}>{props.children}</section>
	);
}

export function SectionHeader(props: SectionHeaderProps) {
	return (
		<div className="section-header">
			<h3>{props.title}</h3>
			{props.withFilters && <Button type="button" icon={<Icons.FiltersIcon />} label={"FIlters"} action={() => props.filtersToggler((prev: any) => !prev)} primary small />}
		</div>
	);
}

export default Section;