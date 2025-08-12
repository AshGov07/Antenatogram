
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
  // const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <>
  <section className="">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md  sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl">
              Forgot Password?
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleForgetPassword} action="#">
              <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-black">Your registered phone number</label>
                  <input type="number" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder='XXXXXXXXXX'  required></input>
              </div>
              <div>
                  <input type="text" name="OTP" id="OTP" placeholder="                                    ENTER OTP" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required=""></input>
              </div>
              <div className='flex flex-row space-x-2'>
                <button type="submit" className="w-full text-black bg-gray-200 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" > Submit </button>
                <button type="button" onClick={() => {navigate('/login')}} className="w-full text-black bg-gray-200 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" > Cancel </button>
              </div>
            
              
          </form>
      </div>
  </div>
</section>
    </>
    
  );
};

export default ForgotPassword;
