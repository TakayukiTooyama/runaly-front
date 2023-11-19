import { Player } from '@/ui/Player/player'

import { UploadForm } from './UploadForm'

export default async function Dashboard() {
  return (
    <div>
      <UploadForm />
      <Player />
    </div>
  )
}
