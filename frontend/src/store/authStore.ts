import AsyncStorage from '@react-native-async-storage/async-storage'
import { makeAutoObservable } from 'mobx'

interface User {
  name: string
  email: string
  phoneNumber: string
  address: string
  city: string
  country: string
  state: string
  zipCode: string
  subscription: any
}

class AuthStore {
  authToken!: string | null
  user: User | null
  navigation: any
  initialize: boolean = false

  constructor() {
    makeAutoObservable(this)
    this.user = null
  }

  async init(): Promise<void> {
    this.authToken = await AsyncStorage.getItem('authToken')
    const userAsync = (await AsyncStorage.getItem('user')) ?? ''
    if (userAsync !== '') {
      this.user = await JSON.parse(userAsync)
    } else {
      this.user = null
    }
    this.initialize = true
  }

  async update(field: string, value: any): Promise<void> {
    if (field === 'authToken') {
      await AsyncStorage.setItem(field, value)
      this.authToken = value
    } else {
      await AsyncStorage.setItem(field, JSON.stringify(value))
      this.user = value
    }
  }

  async clear(): Promise<void> {
    await AsyncStorage.removeItem('authToken')
    await AsyncStorage.removeItem('user')
    this.authToken = null
    this.user = null
  }

  updateNavigation(value: any): void {
    this.navigation = value
  }
}

export default AuthStore
