import { SubmissionError } from 'redux-form'
import axios from 'axios'

import {
  JOBSEEKER_APPLICATION_SUBMITTING_STARTED,
  JOBSEEKER_APPLICATION_SUBMITTING_SUCCESSFUL,
  JOBSEEKER_APPLICATION_SUBMITTING_FAILED
} from '../../actions/types.js';

function submit(values, dispatch) {

  dispatch({ type: JOBSEEKER_APPLICATION_SUBMITTING_STARTED })


  delete values.tickBox1
  delete values.tickBox2

  delete values.numberOfCustomQuestionsJobseekerHasToAnswer

  const ROOT_URL = 'http://ec2-54-77-236-165.eu-west-1.compute.amazonaws.com:3000';

  axios.post(`${ROOT_URL}/jobseeker/signup`,values)
      .then(function (response) {
          //handle success
          //console.log(response);

          let form_data = new FormData();
          form_data.set('file', new Blob(values.CV, {type:'application/rtf'}));
          axios({
                method: 'post',
                url: `${ROOT_URL}/jobseeker/upload-cv`,
                data: form_data,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                //console.log(response);
                window.location.replace('/');
            })
            .catch(function (err) {
              console.log('ERROR FROM FILE UPLOAD '+err);
               throw new SubmissionError({
                 _error: JSON.stringify(err)
               })
            });

          dispatch({ type: JOBSEEKER_APPLICATION_SUBMITTING_SUCCESSFUL })

      })
      .catch(function (err) {
        console.log('ERROR FROM SERVER '+err);

                       //JOBSEEKER_APPLICATION_SUBMITTING_FAILED
        dispatch({ type: JOBSEEKER_APPLICATION_SUBMITTING_FAILED })


/*         throw new SubmissionError({
           _error: JSON.stringify(err)
         })*/
      });

}

export default submit
