import Cookies from 'js-cookie'
import {Base64} from 'js-base64'

export function get_format_token() {
    return "Basic " + Base64.encode(Cookies.get('token')+":");
}