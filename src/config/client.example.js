import * as contentful from 'contentful'

export const client = contentful.createClient({
    space: 'space_id',
    accessToken: 'access_token'
})