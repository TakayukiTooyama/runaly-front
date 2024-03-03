// import { auth, currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function Home() {
  // const { userId } = auth()

  // if (userId) {
  //   console.log('ログイン済み')
  // }

  // const user = await currentUser()
  // console.log(user)

  return (
    <div>
      <h1>Runaly</h1>
      <p>陸上競技動作分析アプリ</p>
      <Link href='/editor'>動作解析</Link>
    </div>
  )
}
