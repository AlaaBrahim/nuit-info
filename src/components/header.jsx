import '../index.css'
import logo from '../assets/logo.svg'

function Header() {
	return (

			<div className="flex flex-wrap bg-primary relative  border-b">
				<img
					src={logo}
					alt="logo"
					className="h-16 w-16 m-5 drop-shadow "
				/>
			<br />
			<br />
			<br />
			<br />
			</div>
	)
}

export default Header