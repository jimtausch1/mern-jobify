import { Form, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import { useAppDispatch } from '../hooks';
import { jobifyApi } from '../slices/jobifyApiSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginDemoUser = async () => {
    const data = {
      email: 'test1@test.com',
      password: 'secret123',
    };
    try {
      await dispatch(jobifyApi.endpoints.loginUser.initiate(data));
      toast.success('Take a test drive');
      navigate('/dashboard');
    } catch {
      toast.error('authentication invalid');
    }
  };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
}
