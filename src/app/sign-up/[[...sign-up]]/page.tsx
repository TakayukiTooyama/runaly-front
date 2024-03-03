import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className='grid h-dvh place-content-center bg-black/80'>
      <SignUp />
    </div>
  )
}
