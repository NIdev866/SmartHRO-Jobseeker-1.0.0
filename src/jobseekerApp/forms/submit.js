import { SubmissionError } from 'redux-form'
import axios from 'axios'


function submit(values) {

  const form_data = new FormData();
  for(var i in values){
				form_data.append(i, values[i]);
			}
  form_data.append('file', new Blob(values.CV, {type:'application/rtf'}));


  axios.post('http://localhost:3000/jobseeker/signup',form_data)
  .then(res=>window.location.replace('/'))
  .catch(err=>{
    console.log('ERROR FROM SERVER '+err);
    throw new SubmissionError({
      _error: JSON.stringify(err)
    })
  }
  )
}

export default submit
