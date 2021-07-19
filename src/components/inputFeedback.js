import React from 'react'
//Sets the class in Formik form checking if valid
const InputFeedback = (props) => {
  return (
    <div className={props.invalid ? 'invalid-feedback' : 'valid-feedback'}>{props.children}</div>
  )
}

export default InputFeedback
