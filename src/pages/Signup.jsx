
import { Signup as SignupComponent } from '../components'

function Signup() {
  return (
    <div className='h-screen w-full' style={{ backgroundImage: `url('https://picsum.photos/1920/1080')` , backgroundRepeat:'no-repeat' ,backgroundPosition:'center'}}>
        <SignupComponent />
    </div>
  )
}

export default Signup