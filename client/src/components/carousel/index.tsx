import { useState } from 'react';
import { ReactComponent as ArrowLeftIcon } from './../../assets/svgs/icons/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from './../../assets/svgs/icons/arrow-right.svg';
import Button from './../button';
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
			<Button type="button" icon={<ArrowLeftIcon />} action={prev} />
			{props.slides![currentIndex]}
			<Button type="button" icon={<ArrowRightIcon />} action={next} />
		</div>
	);
}

export default Carousel;