import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import useMediaQuery from '../hooks/useMediaQuery';
import Swal from 'sweetalert2';

export const LoginPage = () => {
	const matches = useMediaQuery("(min-width: 600px)");
	const { login } = useContext(AuthContext);
	const [loginAbierto, setLoginAbierto] = useState(true);
	const [form, setForm] = useState({
		email: '',
		password: '',
		rememberme: false

	});

	const updateBodyStyles = () => {
		if (loginAbierto) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "visible";
		}
	}

	updateBodyStyles();

	useEffect(() => {
		const remembermeEmail = localStorage.getItem('email');
		if (remembermeEmail) {
			setForm((form) => ({
				...form,
				rememberme: true,
				email: remembermeEmail
			}))
		}

	}, [])

	const onChange = ({ target }) => {
		const { name, value } = target;
		setForm({
			...form,
			[name]: value
		});
	}

	const toggleCheck = () => {
		setForm({
			...form,
			rememberme: !form.rememberme
		});
	}

	const onSubmit = async (ev) => {
		ev.preventDefault();
		setLoginAbierto(false);
		if (form.rememberme) {
			localStorage.setItem('email', form.email);
		} else {
			localStorage.removeItem('email');
		}
		// llamar backend
		const { email, password } = form;
		const ok = await login(email, password);


		if (!ok) {
			Swal.fire('Error', 'Verifique el usuario y contraseña', 'error');
			setLoginAbierto(true);
		}

	}

	const todoOk = () => {
		return (form.email.length > 0 && form.password.length > 0) ? true : false;
	}

	const estiloImg = {
		position: 'absolute',
		top: '30%',
		left: '70%',
		zIndex: '-1'
	}

	return (


		<div>
			<form
				className="login100-form validate-form flex-sb flex-w"
				onSubmit={onSubmit}
			>
				<span className="login100-form-title mb-3">
					Ingreso
							</span>

				<div className="wrap-input100 validate-input mb-3">
					<input
						className="input100"
						type="email"
						name="email"
						placeholder="Email"
						value={form.email}
						onChange={onChange}
					/>
					<span className="focus-input100"></span>
				</div>


				<div className="wrap-input100 validate-input mb-3">
					<input
						className="input100"
						type="password"
						name="password"
						placeholder="Password"
						value={form.password}
						onChange={onChange}
					/>
					<span className="focus-input100"></span>
				</div>

				<div className="row mb-3">
					<div
						className="col"
						onClick={() => toggleCheck()}
					>
						<input
							className="input-checkbox100"
							id="ckb1"
							type="checkbox"
							name="rememberme"
							checked={form.rememberme}
							readOnly
						/>
						<label className="label-checkbox100">
							Recordarme
									</label>
					</div>
				</div>

				<div className="container-login100-form-btn m-t-17" >
					<button
						type='submit'
						className="login100-form-btn"
						disabled={!todoOk()}
					>
						Ingresar
								</button>
				</div>
			</form>
			{matches
				?

				<img src='https://i.pinimg.com/originals/af/04/15/af04153316781107e138331c72ff7e7e.png' alt='México' style={estiloImg}></img>
				:
				<></>
			}
		</div>


	)
}
