import { useEffect, useState } from 'react';
import Button from './../../../components/button';
import Icons from './../../../data/icons';
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
				<Button type="button" icon={<Icons.ArrowLeftIcon />} action={prev} />
				<input type="text" value={value ?? "NULL"} readOnly />
				<Button type="button" icon={<Icons.ArrowRightIcon />} action={next} />
			</div>
		</div>
	);
}

export default CarouselInput;