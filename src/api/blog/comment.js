import axios from 'axios'

export function postComment(form) {
    const url = '/api/blog/postComment'
    
    const name = form.name
    const email = form.email
    const content = form.content
    const articleId = form.articleId

    return axios.get(url,{params: {
        name,email,content,articleId
    }}).then((res) => {
        return Promise.resolve(res.data)
    }).catch(function(response) {
        console.log(response)
    })
}
export function replyComment(form) {
    const url = '/api/blog/postComment'
    
    const name = form.name
    const email = form.email
    const content = form.content
    const articleId = form.articleId
    const parentId = form.parentId

    return axios.get(url,{params: {
        name,email,content,articleId,parentId
    }}).then((res) => {
        return Promise.resolve(res.data)
    }).catch(function(response) {
        console.log(response)
    })
}
export function getCommentList(form) {
    const url = '/api/blog/getCommentList'
    
    const articleId = form

    return axios.get(url,{params: {
        articleId
    }}).then((res) => {
        return Promise.resolve(res.data)
    }).catch(function(response) {
        console.log(response)
    })
}
