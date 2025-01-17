import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import HelmetTitle from '../../Shared/HelmetTitle/HelmetTitle';
import addImg from '../../../img/updateStudent.png';
import { useParams } from 'react-router-dom';

const UpdateStudent = () => {

	const { email, id } = useParams();
	const [student, setStudent] = useState([]);

	// Getting User Data
	useEffect(() => {
		fetch(`${process.env.REACT_APP_URL}/students?email=${email}`, {
			method: 'GET',
			headers: {
				'authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
			}
		})
			.then(res => res.json())
			.then(data => setStudent(data))
	}, [])

	console.log(student);

	const EventSubmit = (event) => {
		event.preventDefault();
		const name = event.target.name.value;
		const father = event.target.father.value;
		const mother = event.target.mother.value;
		const className = event.target.class.value;
		const batch = event.target.batch.value;
		const group = event.target.group.value;
		const phone = event.target.phone.value;
		const adress = event.target.adress.value;

		// console.log(name, father, mother, className, batch, group);

		const updatedUser = { name, father, mother, className, batch, group, phone: phone, adress: adress, img: student[0]?.img, paid: student[0]?.paid, lastPaid: student[0]?.lastPaid, due: student[0]?.due, payMonth: student[0]?.payMonth, payYear: student[0]?.payYear };
		console.log(updatedUser);

		// Send updated data to the server for student info update
		fetch(`${process.env.REACT_APP_URL}/students/${email}`, {
			method: 'PUT',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(updatedUser)
		})
			.then(res => res.json())
			.then(data => {
				// console.log(data);
				toast.success(`${name} your info is update`)
			})
		event.target.reset();
	}
	return (
		<div>
			<HelmetTitle title='Update Student'></HelmetTitle>
			<div style={{ margin: "0 0 1050px 0" }} class="page-add">
				<div class="container-add">
					<div class="left-add w-100 h-100">
						<div class="login">Update Student Profile</div>
						<img src={addImg} className='img-fluid' alt="" />
					</div>

					<div class="right-add d-flex align-items-center justify-content-center">
						<form onSubmit={EventSubmit} className="w-100">
							<div className="input-group w-75 mx-auto">
								<label htmlFor='name'>Name</label>
								<input type="name" name="name" required />
							</div>
							<div className="input-group w-75 mx-auto">
								<label htmlFor='father'>Father's name</label>
								<input type="father" name="father" required />
							</div>
							<div className="input-group w-75 mx-auto">
								<label htmlFor='father'>Mother's name</label>
								<input type="mother" name="mother" required />
							</div>
							<div className="input-group w-75 mx-auto">
								<label htmlFor='phone'>Phone No.</label>
								<input type="text" name="phone" required />
							</div>
							<div className="input-group w-75 mx-auto">
								<label htmlFor='adress'>Adress</label>
								<input type="text" name="adress" required />
							</div>
							<div className="input-group">
								<label for="class">Class: </label>
								<select name="class" type="class">
									<option value="5">Class 5</option>
									<option value="6">Class 6</option>
									<option value="7">Class 7</option>
									<option value="8">Class 8</option>
									<option value="9">Class 9</option>
									<option value="10">Class 10</option>
								</select>
							</div>
							<div className="input-group">
								<label for="batch">Batch: </label>
								<select name="batch" type='batch'>
									<option value="bangla">Bangla Medium</option>
									<option value="english">English Medium</option>
								</select>
							</div>
							<div className="input-group">
								<label for="group">Group: </label>
								<select name="group" type='group'>
									<option value="under9">No Group Yet</option>
									<option value="science">Science</option>
								</select>
							</div>
							<input className='form-submit button-87 w-50 mx-auto mt-4' type="submit" required value="Update" />
						</form>
					</div>
					<ToastContainer />
				</div>
			</div>
		</div>
	);
};

export default UpdateStudent;