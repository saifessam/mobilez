import { useState } from 'react';
import Button from './../button';
import Icons from './../../data/icons';
import './style.css';


interface Props {
	images: string[];
}

function Carousel(props: Props) {
	const [currentIndex, setCurrentIndex] = useState(1);

	function prev() {
		if (currentIndex === 0) {
			setCurrentIndex(props.images.length - 1);
		} else {
			setCurrentIndex((current: number) => current - 1);
		}
	}

	function next() {
		if (currentIndex === props.images.length - 1) {
			setCurrentIndex(0);
		} else {
			setCurrentIndex((current: number) => current + 1);
		}
	}

	return (
		<div className='carousel'>
			<Button type="button" icon={<Icons.ArrowDownIcon />} action={() => prev()} secondary small />
			<img src={require(props.images[0])} alt={"Device Thumbnail"} loading='lazy' />
			<Button type="button" icon={<Icons.ArrowDownIcon />} action={() => next()} secondary small />
		</div>
	);
}

export default Carousel;