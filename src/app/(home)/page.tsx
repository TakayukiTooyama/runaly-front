import Link from 'next/link'

// import { VideoOnCanvas } from '../analyze/_canvas/VideoOnCanvas'

export default function Home() {
  return (
    <div>
      <h1>Runaly</h1>
      <p>陸上競技動作分析アプリ</p>
      <Link href='/sign-in'>ログイン</Link>
      {/* <VideoOnCanvas /> */}
    </div>
  )
}
