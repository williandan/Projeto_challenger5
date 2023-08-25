import { FormContainer } from '../../styles/styles';
import LoginForm from '../loginForm';

export default function LoggedOut() {
  return (
    <FormContainer sx={{ backgroundColor: 'white', maxWidth: '500px !important' }}>
      <LoginForm text={true} loginormodal='true' />
    </FormContainer>
  )
}
