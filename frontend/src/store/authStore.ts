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
  user!: User | null
  navigation: any
  initialize: boolean = false

  constructor () {
    makeAutoObservable(this)
  }

  async init (): void {
    this.authToken = await AsyncStorage.getItem('authToken')
    this.user =
      await JSON.parse((await AsyncStorage.getItem('user'))) ?? null
    this.initialize = true
  }

  async update (field: string, value: any): void {
    if (field === 'authToken') {
      await AsyncStorage.setItem(field, value)
      this.authToken = value
    } else {
      await AsyncStorage.setItem(field, JSON.stringify(value))
      this.user = value
    }
  }

  async clear (): void {
    await AsyncStorage.removeItem('authToken')
    await AsyncStorage.removeItem('user')
    this.authToken = null
    this.user = null
  }

  updateNavigation (value: any): void {
    this.navigation = value
  }
}

export default AuthStore
