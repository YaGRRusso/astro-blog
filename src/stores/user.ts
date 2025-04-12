import { atom } from "nanostores"

export type User = {
  id: string
  name: string
  email: string
  image: string
}

export const $user = atom<User>({
  email: "johndoe@email.com",
  id: "1234567890",
  image: "https://example.com/image.jpg",
  name: "John Doe",
})
