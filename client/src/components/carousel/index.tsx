import { useState } from 'react';
import Button from './../button';
import Icons from './../../data/icons';
import './style.css';

interface Props {
	slides: JSX.Element[] | undefined;
}

function Carousel(props: Props) {
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	function prev(): void {
		if (currentIndex === 0) {
			setCurrentIndex(props.slides!.length - 1);
		} else {
			setCurrentIndex((current: number) => current - 1);
		}
	}

	function next(): void {
		if (currentIndex === props.slides!.length - 1) {
			setCurrentIndex(0);
		} else {
			setCurrentIndex((current: number) => current + 1);
		}
	}

	return (
		<div className='carousel'>
			<Button type="button" icon={<Icons.ArrowLeftIcon />} action={prev} secondary small />
			{props.slides![currentIndex]}
			<Button type="button" icon={<Icons.ArrowRightIcon />} action={next} secondary small />
		</div>
	);
}

export default Carousel;