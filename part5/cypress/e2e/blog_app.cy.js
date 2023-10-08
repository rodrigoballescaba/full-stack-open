describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'Rodri',
      username: 'root',
      password: 'sekretos'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('log in to application')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('sekretos')
    cy.get('#login-button').click()
    cy.contains('Rodri logged-in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'sekretos' })
    })

    it('a new blog can be created and liked', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('title created')
      cy.get('#author').type('author created')
      cy.get('#url').type('url created')
      cy.get('#create').click()
      cy.contains('title created')
      cy.contains('author created')
      cy.contains('url created')

      cy.contains('view').click()
      cy.contains('0')
      cy.get('#button-like').click()
      cy.contains('1')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'El saco azul dorado 1', author: 'Rodrigo B', likes: 10, url: 'https://google.com' })
        cy.createBlog({ title: 'El saco azul dorado 2', author: 'Rodrigo B', likes: 20, url: 'https://google.com' })
        cy.createBlog({ title: 'El saco azul dorado 3', author: 'Rodrigo B', likes: 30, url: 'https://google.com' })
      })

      it('a blog can be deleted only by user that created', function () {
        const blog1Id = JSON.parse(localStorage.getItem('createBlog El saco azul dorado 1')).id

        cy.deleteBlog({ id: blog1Id })
      })

      describe('and other user have login', function () {
        beforeEach(function () {
          const otherUser = {
            name: 'Other',
            username: 'other',
            password: 'sekretos'
          }
      
          cy.request('POST', `${Cypress.env('BACKEND')}/users`, otherUser)
    
          cy.login({ username: 'other', password: 'sekretos' })
        })
  
        it('blogs are ordered according to likes with the blog with the most likes in first place', function () {
          cy.get('.blog').eq(0).should('contain', 'El saco azul dorado 3')
          cy.get('.blog').eq(1).should('contain', 'El saco azul dorado 2')
          cy.get('.blog').eq(2).should('contain', 'El saco azul dorado 1')
        })

        it('a blog can not be deleted by other user', function () {
          const blog2Id = JSON.parse(localStorage.getItem('createBlog El saco azul dorado 2')).id
  
          cy.deleteOtherBlog({ id: blog2Id })  
        })
      })
    })
  })

  it('fails with wrong credentials', function () {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('#notification').contains('wrong username or password')
    cy.get('#notification')
      .should('contain', 'wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'Rodri logged in')
  })
})
