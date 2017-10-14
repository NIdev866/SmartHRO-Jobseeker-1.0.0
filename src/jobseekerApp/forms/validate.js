const validate = values => {
  const errors = {}
  if (!values.first_name) {
    errors.first_name = 'Required'
  }else if(values.first_name.length > 12) {
    errors.first_name = 'Input too long'
  }else if(values.first_name.match(/[0-9]/g)){
    errors.first_name = "Invalid name - must not contain numbers"
  }
  if (!values.last_name) {
    errors.last_name = 'Required'
  }else if(values.last_name.length > 12) {
    errors.last_name = 'Input too long'
  }else if(values.last_name.match(/[0-9]/g)){
    errors.last_name = "Invalid name - must not contain numbers"
  }
  if (!values.age) {
    errors.ageRange = "Required"
  }
  if (!values.gender) {
    errors.gender = 'Required'
  }
  if(!values.nationality) {
    errors.nationality = "Required"
  }
  if(!values.contact_no && !values.landline_no) {
    errors.contact_no = "One valid number required"
    errors.landline_no = "One valid number required"
  }
  if (!(/^\d{11}$/.test(values.contact_no)) && values.contact_no){
    errors.contact_no = "Invalid number"
    errors.landline_no = ""
  }else if (!(/^\d{11}$/.test(values.landline_no)) && values.landline_no){
    errors.contact_no = ""
    errors.landline_no = "Invalid number"
  }
  if (!values.email_id) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email_id)) {
    errors.email = 'Invalid email address'
  }else if(values.email_id.length > 30) {
    errors.email = 'Input too long'
  }
  if (!values.emailCopy) {
    errors.emailCopy = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailCopy)) {
    errors.emailCopy = 'Invalid email address'
  }else if(values.emailCopy.length > 17) {
    errors.emailCopy = 'Input too long'
  }else if (values.email_id !== values.emailCopy) {
    errors.emailCopy = 'Emails don\'t match'
  }else if(!values.email_id) {
    errors.emailCopy = ''}
  if(errors.email === "Required" && errors.emailCopy === "Emails don\'t match"){
    errors.emailCopy = ""
  }
  if(errors.email === "Invalid email address" && errors.emailCopy === "Emails don\'t match"){
    errors.emailCopy = ""
  }
  if(!values.postal_code){
    errors.postal_code = 'Required'
  }else if(values.postal_code.length > 12){
    errors.postal_code = 'Too long'
  }
  if(!values.house_no){
    errors.house_no = 'Required'
  }else if(values.house_no.length > 6){
    errors.house_no = 'Too long'
  }
  if (!values.student) {
    errors.student = 'Required'
  }
  if (!values.first_work_in_uk) {
    errors.first_work_in_uk = 'Required'
  }
  if (!values.self_employed) {
    errors.self_employed = 'Required'
  }
  if (!values.willing_to_travel) {
    errors.willing_to_travel = 'Required'
  }
  if (!values.when_to_start_work) {
    errors.when_to_start_work = 'Required'
  }
  if (!values.tickBox1) {
    errors.tickBox1 = 'Required'
  }
  if (!values.tickBox2) {
    errors.tickBox2 = 'Required'
  }


/*  if (!values.CV) {
    errors.CV = 'Selection Required'
  }*/
  return errors
}

export default validate
