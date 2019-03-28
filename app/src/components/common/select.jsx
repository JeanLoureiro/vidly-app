import React from 'react'

const Select = ({ options, name, label, error, ...rest }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={ name }> { label }</label>
            <select id={ name } name={ name } {...rest} className="form-control" >
                <option value='' />
                { options && options.map( item => (
                    <option key={item._id} value={item._id}>
                        { item.name }
                    </option>
                ))}
            </select>    

            { error && <div className='alert alert-danger'>{ error }</div> }

        </div> 
    )
}

export default Select