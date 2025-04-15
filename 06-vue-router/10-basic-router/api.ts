import type { RegisterDTO, UserDTO } from '@shgk/vue-course-ui'

export function login(email: string, password: string): Promise<UserDTO> {
  if (email === 'demo@email' && password === 'password') {
    return Promise.resolve({ id: 1, fullname: 'Demo Organizer', email: 'demo@email', avatar: '' })
  } else {
    return Promise.reject(new Error('Invalid email or password'))
  }
}

export function register(registerDto: RegisterDTO): Promise<UserDTO> {
  return Promise.resolve({
    id: 1,
    fullname: registerDto.fullname,
    email: registerDto.email,
    avatar: '',
  })
}
