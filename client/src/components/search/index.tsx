import { useSelector } from 'react-redux';
import './style.css';

function Search() {
	const { isToggled } = useSelector((state: any) => state.search);

	return (
		<aside className={isToggled ? 'search active' : 'search'}>
			<div className="search-header">
				<span>Search</span>
			</div>
			<div className="search-body">
			</div>
		</aside>
	);
}

export default Search;