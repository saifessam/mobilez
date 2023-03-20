import { useEffect, useState } from 'react';
import { ReactComponent as ArrowLeftIcon } from './../../../assets/svgs/icons/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from './../../../assets/svgs/icons/arrow-right.svg';
import Button from './../../../components/button';
import './style.css';

interface Props {
	label: string;
	name: string;
	options: string[];
	setter: any;
}

function CarouselInput(props: Props) {
	const { label, name, options, setter } = props;
	const [index, setIndex] = useState<number>(0);
	const [value, setValue] = useState<string | null>(null);

	useEffect(() => setter((prev: any) => ({ ...prev, [name]: value })), [value]);

	function prev(): void {
		if (index < options.length && index > 0) {
			setIndex((prev: number) => prev - 1);
			setValue(options[index]);
		} else {
			setIndex(options.length - 1);
			setValue(options[index]);
		}
	}

	function next(): void {
		if (index < options.length - 1) {
			setIndex((prev: number) => prev + 1);
			setValue(options[index]);
		} else {
			setIndex(0);
			setValue(options[index]);
		}
	}

	return (
		<div className="input-container">
			<label className="input-container-label">{label}</label>
			<div className="input-container-field carousel-input">
				<Button type="button" condition='normal' icon={<ArrowLeftIcon />} action={prev} />
				<input type="text" value={value ?? "NULL"} readOnly />
				<Button type="button" condition='normal' icon={<ArrowRightIcon />} action={next} />
			</div>
		</div>
	);
}

export default CarouselInput;