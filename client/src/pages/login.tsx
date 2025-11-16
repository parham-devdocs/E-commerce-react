import TextInput from '../components/textInput'
import Logo from '../components/logo'
import Button from '../components/button'

const Login = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center  p-4'>
      <div className='lg:w-96 w-full rounded-xl border border-red-200 shadow-2xl bg-white dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-6 px-8 py-10 transition-all duration-300 hover:shadow-xl'>
        <div className="flex flex-col items-center gap-4">
          <Logo/>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">خوش آمدید</h1>
        </div>
        
        <div className="space-y-4">
          <TextInput 
            type="email" 
            name='email' 
            placeHolder='ایمیل'
          />
          <TextInput 
            type="password" 
            name='password' 
            placeHolder='گذرواژه'
          />
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-red-500 focus:ring-red-500" />
            <span>مرا به خاطر بسپار</span>
          </label>
          <a href="#" className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors">
            رمز عبور را فراموش کرده‌اید؟
          </a>
        </div>
        
        <div className='w-full'>
          <Button 
            style={{size:"md", variant: "solid"}} 
            btn={{type:"submit", text:"ورود"}}
          />
        </div>
        
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          حساب کاربری ندارید؟{' '}
          <a href="#" className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors">
            ثبت نام کنید
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login;