import AsyncStorage from '@react-native-async-storage/async-storage'
import { makeAutoObservable } from 'mobx'

class DesignStore {
  designId!: string
  designName!: string

  constructor() {
    makeAutoObservable(this)
  }

  async init(): Promise<void> {
    this.designId = (await AsyncStorage.getItem('designId')) ?? ''
  }

  async clear(): Promise<void> {
    await AsyncStorage.removeItem('designId')
    await AsyncStorage.removeItem('designName')
    this.designId = ''
    this.designName = ''
  }

  async updateDesignId(value: any): Promise<void> {
    this.designId = value
    await AsyncStorage.setItem('designId', value)
  }

  async updateDesignName(value: any): Promise<void> {
    this.designName = value
    await AsyncStorage.setItem('designName', value)
  }
}

export default DesignStore
