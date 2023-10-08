Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBlogApp', JSON.stringify(body))
        cy.visit('')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
    cy.request({
        url: `${Cypress.env('BACKEND')}/blogs`,
        method: 'POST',
        body: { title, author, url, likes },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogApp')).token}`
        }
    }).then(({ body }) => {
        localStorage.setItem(`createBlog ${title}`, JSON.stringify(body))
        cy.visit('')
    })
})

Cypress.Commands.add('deleteBlog', ({ id }) => {
    cy.request({
        url: `${Cypress.env('BACKEND')}/blogs/${id}`,
        method: 'DELETE',
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogApp')).token}`
        }
    })
        .its('status')
        .should('eq', 204);

    cy.visit('')
})

Cypress.Commands.add('deleteOtherBlog', ({ id }) => {
    cy.request({
        url: `${Cypress.env('BACKEND')}/blogs/${id}`,
        method: 'DELETE',
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogApp')).token}`
        },
        failOnStatusCode: false
    })
        .its('status')
        .should('eq', 400);

    cy.visit('')
})