import registerBg from '@/../public/assets/AuthImage/loginbg.jpg'
import RegisterForm from "@/app/components/modules/authentication/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-cover bg-center object-cover"
    style={{
      backgroundImage: `url(${registerBg.src})`,
    }}>
      <RegisterForm/>
    </div>
  );
}
