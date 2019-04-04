import Cookies from 'js-cookie'
import {Base64} from 'js-base64'

export const get_format_token = ()=> {
    return "Basic " + Base64.encode(Cookies.get('token')+":");
}