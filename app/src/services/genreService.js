import http from './httpServices'
import { apiUrl } from '../config.json'

export function getGenres() {
    return http.get( apiUrl + '/genres')
}