interface Props {
	e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;
	expression?: RegExp;
	error?: string;
	setError?: React.Dispatch<React.SetStateAction<string>>;
	setIsValid?: React.Dispatch<React.SetStateAction<boolean>>;
	setter: any;
}

function handleChange(props: Props): void {
	if (props.expression && props.error && props.setError && props.setIsValid) {
		if (!props.expression.test(props.e.target.value)) {
			props.setError(props.error);
			props.setIsValid(false);
			props.setter((prev: any) => ({ ...prev, [props.e.target.name]: null }));
			return;
		} else {
			props.setError("");
			props.setIsValid(true);
			props.setter((prev: any) => ({ ...prev, [props.e.target.name]: props.e.target.value.trim() }));
		}
	} else {
		if (props.e.target.value === '') {
			props.setter((prev: any) => ({ ...prev, [props.e.target.name]: null }));
		} else {
			props.setter((prev: any) => ({ ...prev, [props.e.target.name]: props.e.target.value.trim() }));
		}
	}
}

export default handleChange;