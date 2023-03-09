import { useEffect, useState } from 'react';
import currencyFormat from '../../../utilities/currency-format';
import Button from './../../../components/button';
import Icons from './../../../data/icons';
import './style.css';

interface Props {
	label: string;
	name: string;
	setter: any;
	isCurrency?: boolean;
}

function NumberInput(props: Props) {
	const { label, name, setter, isCurrency } = props;
	const [multiply, setMultiply] = useState<number>(1);
	const [value, setValue] = useState<number>(1);

	useEffect(() => setter((prev: any) => ({ ...prev, [name]: value })), [value]);

	function decrease(): void {
		if (value > 0) setValue((prev: number) => prev - (1 * multiply));
	}

	function increase(): void {
		setValue((prev: number) => prev + (1 * multiply));
	}

	return (
		<div className="input-container">
			<label className="input-container-label">
				{label}
				<div className="input-container-label-selector">
					<Button type="button" label='x1' action={() => setMultiply(1)} small secondary={multiply === 1 ?? false} />
					<Button type="button" label='x5' action={() => setMultiply(5)} small secondary={multiply === 5 ?? false} />
					<Button type="button" label='x10' action={() => setMultiply(10)} small secondary={multiply === 10 ?? false} />
					<Button type="button" label='x100' action={() => setMultiply(100)} small secondary={multiply === 100 ?? false} />
					{isCurrency ? <Button type="button" label='x1,000' action={() => setMultiply(1000)} small secondary={multiply === 1000 ?? false} /> : undefined}
				</div>
			</label>
			<div className="input-container-field number-input">
				<Button type="button" icon={<Icons.MinusIcon />} action={decrease} />
				<input type="text" value={isCurrency ? currencyFormat(value) : value} readOnly />
				<Button type="button" icon={<Icons.PlusIcon />} action={increase} />
			</div>
		</div>
	);
}

export default NumberInput;