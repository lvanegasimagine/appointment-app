import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY

const axiosClient = axios.create({
  baseURL: 'https://appointment-booking-admin-rpen.onrender.com/api/',
  headers: {
    Authorization: `Bearer ${API_KEY}`
  }
})

const getCategory = async () => await axiosClient.get('categories?populate=*')
const getDoctorList = async () => await axiosClient.get('doctors?populate=*')
const getDoctorByCategory = async (category: string) => await axiosClient.get('/doctors?filters[categories][Name][$in]=' + category + '&populate=*')
const getDoctorById = async (id: string) => await axiosClient.get(`/doctors/${id}?populate=*`)
const bookAppointment = async (data: any) => await axiosClient.post('/appointments', data)
const getUserBookingList = async (userEmail: any) => await axiosClient.get('/appointments?[filters][Email][$eq]=' + userEmail + '&populate[doctor][populate][image][populate][0]=url&populate=*')
const deleteBooking = async (id: any) => await axiosClient.delete('/appointments/' + id)

export default {
  getCategory,
  getDoctorList,
  getDoctorByCategory,
  getDoctorById,
  bookAppointment,
  getUserBookingList,
  deleteBooking
}
