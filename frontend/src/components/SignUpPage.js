import React, { useState } from 'react';
import { Logo } from './Logo';
import { Notif } from './Notif';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../banking_web3';
import DATA from '../data';

export const SignUpPage = () => {
  
    const [name, setName] = useState("");
    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const [username, setusername] = useState("");
    const handleUserNameChange = (event) => {
        setusername(event.target.value);
    }

    const [accountType, setAccountType] = useState('Saving');
    const handleAccountTypeChange = (event) => {
        setAccountType(event.target.value);
    };

    const [password, setPassword] = useState('');
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const navigate = useNavigate();



    const onSubmitHandler = async (event) => {
        event.preventDefault();
        console.log(name);
        console.log(username);
        console.log(password);
        console.log(accountType);
        let alreadyExists = false;
        try {
            const localUsers = localStorage.getItem('users');
            const users = JSON.parse(localUsers);

            if(!localUsers) {
                localStorage.setItem('users', JSON.stringify(DATA));
            }
            console.log(localUsers);
            users.forEach(row => {
                console.log(username);
                console.log(row.email);
                if(row.email === username) {
                    alreadyExists = true;
                }
            });
    
            if(alreadyExists) {
                setNotif({message: 'This email already exists. Try again.', style: 'danger'});
                setTimeout(() => {
                    setNotif({message: 'Username Already exists', style: 'danger'});; // Navigate to homepage after 1 second
                }, 1000);
                throw Error("Username Already exists");
            }
            else {
                console.log("here 3");
                setNotif('');
                const user = {
                    email: username,
                    password: password,
                    fullname: name,
                    type: accountType,
                    number: "47290539480",
                    balance: 0,
                    isAdmin: false, 
                    transactions: []
                }
            
                await createAccount(accountType, name);
                users.push(user);
                // props.setUsers(localUsers); 
                localStorage.setItem('users', JSON.stringify(users));
                setNotif({message: 'Successfully saved.', style: 'success'});
                setNotif({message: 'Signed Up Successfully', style: 'success'});
                setTimeout(() => {
                    navigate("/"); // Navigate to homepage after 1 second
                }, 1000);
            }

        }
        catch(error) {
            setNotif({message: 'Sign Up Unsuccessful', style: 'danger'});
        }
    }

    const [notif, setNotif] = useState({message: '', style: ''});


    return (

      <div>
        <div id="login-page">
        <div id="login">
          <Logo />
          <Notif message={notif.message} style={notif.style} />
          <form onSubmit={onSubmitHandler}>
            <label htmlFor="name">Name</label>
            <input id="name" autoComplete="off" type="text" onChange={handleNameChange} value={name} required/>

            <label htmlFor="username">Username</label>
            <input id="username" autoComplete="off" type="text" onChange={handleUserNameChange} value={username} required/>

            <label htmlFor="password">Password</label>
            <input id="password" autoComplete="off" type="password" onChange={onChangePassword} value={password} required/>

            <label htmlFor="accountType">Account Type: </label>
            <select id="accountType" value={accountType} onChange={handleAccountTypeChange} required>
            <option value="Saving" defaultChecked>Saving</option>
            <option value="Checking">Checking</option>
            </select>

            <button type="submit" className="btn">Sign Up</button>
          </form>
        </div>
      </div>
      </div>
    )
}
