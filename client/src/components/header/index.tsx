import './style.css';

function Header() {
	return (
		<header>
			<section className='header-section'>
				<h1>Welcome to Mobilez for all your device needs!</h1>
				<p>We offer a wide range of high-quality smartphones, tablets, laptops, and more to meet your technology needs. <br /> Our user-friendly website makes it easy to browse and purchase the latest devices from top brands.</p>
			</section>
			<section className='header-section'>
				<img src={require('./../../assets/images/illustration.png')} alt="Devices illustration" />
			</section>
		</header>
	);
}

export default Header;