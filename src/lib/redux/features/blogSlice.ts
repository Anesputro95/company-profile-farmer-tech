import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IAuthBlog {
  objectId: string
  title: string
  thumbnail?: string
  content: string
  createdAt: string
}

const initialBlogState: IAuthBlog[] = []

const blogSlice = createSlice({
  name: "blogs",
  initialState: initialBlogState,
  reducers: {
    setBlogs: (state, action: PayloadAction<IAuthBlog[]>) => {
      // ganti semua blog dengan data baru (misal dari fetch backend)
      return action.payload
    },
    addBlog: (state, action: PayloadAction<IAuthBlog>) => {
      // tambah blog baru di array
      state.push(action.payload)
    },
    updateBlog: (state, action: PayloadAction<IAuthBlog>) => {
      // update blog berdasarkan objectId
      const index = state.findIndex(blog => blog.objectId === action.payload.objectId)
      if (index !== -1) {
        state[index] = action.payload
      }
    },
    deleteBlog: (state, action: PayloadAction<string>) => {
      // hapus blog berdasarkan objectId
      return state.filter(blog => blog.objectId !== action.payload)
    }
  }
})

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer
