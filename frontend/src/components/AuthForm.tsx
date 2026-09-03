import { useState } from "react";
import { validateUsername, validatePassword } from '../utils/validators.ts';

const API_URL = import.meta.env.VITE_API_URL;

const AuthForm = ({ loginOrRegister } : { loginOrRegister: 'login' | 'register' }) => {

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [usernameError, setUsernameError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);

	/**
	 * Handle username change
	 * @param e - The event object
	 */
	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		const username = e.target.value;
		const results = validateUsername(username);
		
		if (results.isValid === true) {
			setUsername(username);
			setUsernameError(null);
		} else {
			setUsernameError(results.errorMessage);
		}
	}

	/**
	 * Handle password change
	 * @param e - The event object
	 */
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		const password = e.target.value;
		const results = validatePassword(password);

		if (results.isValid === true) {
			setPassword(password);
			setPasswordError(null);
		} else {
			setPasswordError(results.errorMessage);
		}
	}

	/**
	 * Handle form submission
	 * @param e - The event object
	 */
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

		e.preventDefault();

		if (usernameError && passwordError) {
			return
		}

		console.log(username, password);

		if (loginOrRegister === 'login') {
			console.log('login');
		} else {
			console.log('register');
		}
		submitForm(username, password);
	}

	const submitForm = async (username: string, password: string) => {

		console.log('submitForm');

		let url = loginOrRegister === 'login' ? '/auth/login' : '/auth/register';

		try {

			const response = await fetch(`${API_URL}${url}`, {
				method: 'POST',
				body: JSON.stringify({ username: username, password: password }),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {

				throw new Error('Failed to submit form. Please try again.');
				
			} else {
	
				const data = await response.json();
				console.log(data);
				document.location.href = '/';

			}

		} catch (error) {

			console.error('Error submitting form:', error);

		}

	}
	return (

		<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
			{usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
			{passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
			<input 
				className="rounded-lg border border-slate-700 bg-slate-950/60 p-2.5 text-slate-100 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40" 
				type="text" 
				placeholder="Username" 
				// value={username} 
				onChange={handleUsernameChange} 
			/>
			<input 
				className="rounded-lg border border-slate-700 bg-slate-950/60 p-2.5 text-slate-100 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40" 
				type="password" 
				placeholder="Password" 
				// value={password} 
				onChange={handlePasswordChange} 
			/>
			<button
				className={`mt-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-lg shadow-blue-950/50 transition-colors cursor-pointer hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${usernameError !== null || passwordError !== null || username === '' || password === '' ? 'opacity-50 cursor-not-allowed' : ''}`} 
				type="submit"
				disabled={usernameError !== null || passwordError !== null || username === '' || password === ''}
			>
				{loginOrRegister === 'login' ? 'Log In' : 'Register'}
		 </button>
		</form>

	);

};

export default AuthForm;