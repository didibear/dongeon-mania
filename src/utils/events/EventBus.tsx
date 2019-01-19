export class EventBus {

  topics: Map<string, (() => void)[]> = new Map()

  emit = (topic:string) => {
    const subscribers = this.topics.get(topic)
    subscribers && subscribers.forEach(callback => callback())
  }
  
  subscribe = (topic: string, callback: () => void) => {
    if (!this.topics.has(topic)){
      this.topics.set(topic, [])
    }
    this.topics.get(topic)!.push(callback)
  }

  unsubscribe = (topic: string, callback: () => void) => {
    const subscribers = this.topics.get(topic)
    subscribers && subscribers.splice(subscribers.indexOf(callback), 1)
  }
}

export default new EventBus()


