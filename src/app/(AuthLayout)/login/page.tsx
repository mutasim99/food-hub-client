import loginBg from '@/../public/assets/AuthImage/loginbg.jpg'
import LoginForm from '@/components/modules/authentication/LoginForm'

export default function LoginInPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-cover bg-center object-cover"
    style={{
      backgroundImage: `url(${loginBg.src})`,
    }}>
      <LoginForm/>
    </div>
  )
}
