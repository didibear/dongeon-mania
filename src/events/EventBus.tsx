export class EventBus {

  topics: Map<string, (() => void)[]> = new Map()

  emit = (topic:string) => {
    const subscribers = this.topics.get(topic)
    if (subscribers){
      subscribers.forEach(callback => callback())
    }
  }

  subscribe = (topic: string, callback: () => void) => {
    let subscribers = this.topics.get(topic);
    if (!subscribers){
      subscribers = []     
      this.topics.set(topic, subscribers)
    }
    subscribers.push(callback)
  }
}

export default new EventBus()


