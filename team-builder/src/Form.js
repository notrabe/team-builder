import React from 'react';

function Form(props) {
    const {values, update, submit } = props
    const onChange = evt => {
        const { name, value } = evt.target
        update(name, value)
    }

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    return(
        <form className = 'form container' onSubmit={onSubmit}>
            <div className='form-group submit'>
                <h2>Add a Member</h2>
                <button disabled={!values.name || !values.email || !values.role ? true : false}>Submit</button>
            </div>

            <div className = 'form-group inputs'>
                <h4>General information</h4>
                <label>Username:
                    <input
                        value={values.name}
                        onChange={onChange}
                        name = 'name'
                        placeholder = 'enter name'
                        maxLength = '50'
                        type='text'
                    />
                </label>

                <label>Email: 
                    <input 
                        value={values.email}
                        onChange={onChange}
                        name='email'
                        placeholder='enter email'
                        maxLength = '30'
                        type='email'
                    />
                </label>

                <label>Role:&nbsp;
                    <select onChange={onChange} value={values.role} name="role">
                        <option value="">-- Select a Role --</option>
                        <option value="boss">BOSS</option>
                        <option value="employee">Employee</option>
                        <option value="intern">Intern</option>
                    </select>
                </label>
            </div>
        </form>
    )
}

export default Form