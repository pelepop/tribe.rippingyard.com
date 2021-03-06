import moment from 'moment'
import { Inflectors } from 'en-inflectors'
import { db, timestamp } from '~/plugins/firebase'

export default class Model {
  constructor() {
    this.collection = new Inflectors(
      this.constructor.name.toLowerCase()
    ).toPlural()
    this.q = this.db = db.collection(this.collection)
    return this
  }

  get() {
    return new Promise((resolve, reject) => {
      this.q.get().then(snapshot => {
        if( !snapshot.empty ) {
          snapshot.forEach(doc => {
            // console.log(this.data(doc.data()))
            resolve(this.data(doc.data()))
          })
        } else {
          reject( new Error( 'No data found' ) )
        }
      }).catch((e) => {
        console.log( new Error( e ) )
      })
    })
  }

  get items() {
    const items = []
    this.q.get().then(snapshot => {
      snapshot.forEach(doc => {
        items.push(this.data(doc.data()))
      })
    })
    return items
  }

  get observedItems() {
    const items = []
    this.observer = this.q.onSnapshot(snapshot => {
      items.length = 0
      snapshot.forEach(doc => {
        items.push(this.data(doc.data()))
      })
    })
    return items
  }

  data(doc) {
    const item = doc
    item.createdate = moment(item.createdAt.toDate())
    item.updatedate = moment(item.updatedAt.toDate())
    return item
  }

  create(params) {
    params.createdAt = timestamp.now()
    params.updatedAt = timestamp.now()
    return this.db.add(params)
  }

  where(path, op, value) {
    this.q = this.q.where(path, op, value)
    return this
  }

  limit(qty) {
    this.q = this.q.limit(qty)
    return this
  }

  orderBy(column, order = 'asc') {
    this.q = this.q.orderBy(column, order)
    return this
  }
}
