import React, { useEffect, useState } from "react";

//components

import InputTodo from "../todolist/InputTodo";
// import ListTodos from "./todolist/ListTodos";

const Dashboard = ({ setAuth }) => {
	const [name, setName] = useState("");

	const getProfile = async () => {
		try {
			const res = await fetch("http://localhost:5000/dashboard/", {
				method: "GET",
				headers: { token: localStorage.token },
			});

			const parseData = await res.json();
			setName(parseData.user_name);
		} catch (err) {
			console.error(err.message);
		}
	};

	const logout = async (e) => {
		e.preventDefault();
		try {
			localStorage.removeItem("token");
			setAuth(false);
			// toast.success("Logout successfully");
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		getProfile();
	}, []);

	return (
		<div>
			<div className='d-flex mt-5 justify-content-around'>
				<h2>{name} 's Todo List</h2>
				<button onClick={(e) => logout(e)} className='btn btn-primary'>
					Logout
				</button>
			</div>
			<InputTodo />
		</div>
	);
};

export default Dashboard;
