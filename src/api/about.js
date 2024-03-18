import request from './request.js'

export async function getAbout(){
    return await request.get('/api/about')
}