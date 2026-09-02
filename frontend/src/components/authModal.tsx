import { useState } from 'react';

const AuthModal = () => {

	const [loginOrRegister, setLoginOrRegister] = useState<'login' | 'register'>('login');

	return (
		<div className="fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center p-4">
			<article className="bg-slate-900 p-6 rounded-xl w-1/2 max-lg:w-11/12 max-h-[80vh] border border-slate-700 ring-1 ring-blue-500/30 shadow-2xl shadow-black/60 z-10 flex flex-col overflow-hidden">
			<h1>{loginOrRegister === 'login' ? 'Log In' : 'Register'}</h1>
			<form>
				<input type="email" placeholder="Username" />
				<input type="password" placeholder="Password" />
				<button type="submit">{loginOrRegister === 'login' ? 'Log In' : 'Register'}</button>
			</form>
			<button onClick={() => setLoginOrRegister(loginOrRegister === 'login' ? 'register' : 'login')}>{loginOrRegister === 'login' ? 'Register' : 'Log In'}</button>
			</article>
		</div>
  );
};

export default AuthModal;