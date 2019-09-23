import { storage } from '~/plugins/firebase'

export default function(file) {
  const storageRef = storage.ref()
  storageRef
    .child(file.name)
    .put(file)
    .then(snapshot => {
      console.log('Uploaded a file!')
    })
}
