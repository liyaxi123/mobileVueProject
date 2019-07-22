export default class Song {
  constructor({id, mid, singer, name, album, duration, url, singerId}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${singerId}.jpg?max_age=2592000`
    this.url = url,
    this.singerId = singerId
  }
}
