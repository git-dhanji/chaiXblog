
import { Container, useDynamicTitle, PostForm } from '../components'


function AddPost() {
  // use : useDynamicTitle for dynamice title automatice find loction overwrite the title
  useDynamicTitle()
  return (
    <div className='py-8 h-screen'>
      <Container>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost