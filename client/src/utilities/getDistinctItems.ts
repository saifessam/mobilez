function getDistinctItems(mainArray: any[]): string[] {
	const distinctTypes = mainArray.filter((value, index, array) => array.indexOf(value) === index);

	return distinctTypes;
}

export default getDistinctItems;