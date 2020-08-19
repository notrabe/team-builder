import React, {useState, useEffect} from 'react';
import {v4 as uuid} from 'uuid';
import './App.css';
import Member from './Member';
import Form from './Form';

const initialMembers = [
  {
    id: uuid(),
    name: 'bob',
    email: 'bob@bobert.com',
    role: 'the boss'
  }
]

const initialValues = {
  name: '',
  email: '',
  role: ''
}

const fakeAxiosGet = () => {
  return Promise.resolve({ status: 200, success: true, data:initialMembers})
}
const fakeAxiosPost = (usl, {name, email, role}) => {
  const newMember = {id:uuid(), name, email, role}
  return Promise.resolve({status:200, success:true, data:newMember})
}

function App() {
  const [members, setMembers] = useState([])
  const [formValues, setFormValues] = useState(initialValues)

  const updateForm = (inputName, inputValue) => {
    setFormValues({ ...formValues, [inputName]: inputValue})
  }

  const submitForm = () => {
    const member = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      role: formValues.role,
    }

    if(!member.name || !member.email) return
    fakeAxiosPost('fake.com', member)
      .then(res => {
        const newMemberFromAPI = res.data
        setMembers([...members, newMemberFromAPI])
      })
      .catch(err => {
        debugger
      })
      .finally(() => {
        setFormValues(initialValues)
      })
  }

  useEffect(() => {
    fakeAxiosGet('fakeapi.com').then(res => setMembers(res.data))
  }, [])
  return (
    <div className="App">
      <Form        
        values={formValues}
        update={updateForm}
        submit={submitForm}
        />
      {
        members.map(member => {
          return (
            <Member key = {member.id} details = {member}/>
          )
        })
      }
    </div>
  );
}

export default App;
