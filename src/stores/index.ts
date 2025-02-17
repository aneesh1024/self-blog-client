import { generateUUID } from '@/lib/utils';
import axios from 'axios';
import { defineStore } from 'pinia';

export const useBlogStore = defineStore('blog', {
  state: () => ({
    blogs: [] as Blog[],
  }),
  getters: {
    getBlogById: (state) => (id: string) =>
      state.blogs.find((blog) => blog._id === id),
  },
  actions: {
    async addBlog(title: string, content: string) {
      await axios.post('/api/blogs', {
        title: title,
        content: content
      }, { withCredentials: true })
      this.fetchData()

    },

    async updateBlog(id: string, title: string, content: string) {
      await axios.put(`/api/blogs/${id}`, {
        title: title,
        content: content
      }, { withCredentials: true })

      this.blogs = this.blogs.map((blogItem) => blogItem._id === id ?
        ({
          ...blogItem, title, content
        }) : blogItem
      );
    },

    async deleteBlog(id: string) {
      await axios.delete(`/api/blogs/${id}`, { withCredentials: true })
      this.blogs = this.blogs.filter((blog) => blog._id !== id);
    },

    // Example of fetching blogs (replace with your actual API call)
    async fetchData() {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('/api/blogs');
        this.blogs = response.data;
      } catch (error) {
        console.log('something went wrong while fetching blogs');

      }
    }
  }
})


