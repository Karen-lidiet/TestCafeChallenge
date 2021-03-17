import { Selector, t } from 'testcafe'

class LoginPage{
    constructor (){
        this.usernameField = Selector('input[name="user-name"]')
        this.passwordField = Selector('input[name="password"]')
        this.loginButton = Selector('.btn_action')
        this.errorMessage = Selector('h3[data-test="error"]')
    }

    async login(user, password){
         await t
        .typeText(this.usernameField, user)
        .typeText(this.passwordField, password)
        .click(this.loginButton)
    }
}

export default new LoginPage
