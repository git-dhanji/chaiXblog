
import { Signup as SignupComponent, useDynamicTitle } from '../components'

function Signup() {
  useDynamicTitle()
  return (
    <div className='bg-cover bg-center bg-fixed relative' style={{ backgroundImage: `url('https://picsum.photos/1920/1080')` , backgroundRepeat:'no-repeat' ,backgroundPosition:'center'}}>
        <SignupComponent />
    </div>
  )
}

export default Signup