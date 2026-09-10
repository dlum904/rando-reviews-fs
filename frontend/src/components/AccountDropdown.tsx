const API_URL = import.meta.env.VITE_API_URL;

/**
 * AccountDropdown component
 * @param {Object} props - The component props
 * @param {string} props.username - The username of the logged in user
 * @returns {JSX.Element} The AccountDropdown component
 */
const AccountDropdown = ({ username }: { username: string }) => {
  const itemClassNames = "block w-full px-4 py-2 text-left text-sm text-slate-300 transition-colors cursor-pointer hover:bg-blue-500/10 hover:text-blue-300";

	const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {

		e.preventDefault();

		try {

			const response = await fetch(`${API_URL}/auth/logout`, {
				method: 'POST',
				credentials: 'include',
			});
	
			if (response.ok) {

				document.location.href = '/';

			} else {

				console.error('Error logging out:', response.statusText);

			}
		} catch (error) {
			
			console.error('Error logging out:', error);

		}
	}

  return (
		
    <div className="absolute right-0 top-12 z-30 w-48 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/60 ring-1 ring-blue-500/30">
      <div className="border-b border-slate-800 px-4 py-3">
        <p className="truncate text-sm font-medium text-white">{username}</p>
        <p className="text-xs text-slate-500">Signed in</p>
      </div>
      <ul className="py-1">
        <li>
          {/* <a href="#" className={itemClassNames}>Profile</a> */}
        </li>
        <li>
          <a href="#" className={itemClassNames} onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </div>
  )
}

export default AccountDropdown