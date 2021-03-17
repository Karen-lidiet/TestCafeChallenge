import LoginPage from '../pages/LoginPage'
import ProductsPage from '../pages/ProductsPage'
import HeadersPage from '../pages/HeadersPage'
import ShoppingCartPage from '../pages/ShoppingCartPage'
import {CREDENTIALS}from '../data/Constants'
import CheckoutPage from '../pages/CheckoutPage'
import OverviewPage from '../pages/OverviewPage'

var faker = require('faker');

fixture ('Login feature testing')

.page `https://www.saucedemo.com/`

test('2 User cannnot login with invalid credentials', async t =>{
    await LoginPage.login(CREDENTIALS.INVALID_USER.USERNAME, CREDENTIALS.INVALID_USER.PASSWORD) 
        
    await t.expect(LoginPage.errorMessage.exists).ok()
    await t.expect(LoginPage.errorMessage.innerText).contains('Username and password do not match any user in this service')
})

test('1 User can login to page', async t =>{
    await LoginPage.login(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    await t.expect(HeadersPage.productLabel.exists).ok()
    await t.expect(HeadersPage.productLabel.innerText).contains('Products') 
})

test('3 Logout from Products to page', async t =>{
    await LoginPage.login(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    await ProductsPage.logout()
    await t.expect(LoginPage.loginButton.exists).ok()  
})

test('5 Add a single item to the Shopping Cart', async t =>{
    await LoginPage.login(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    await ProductsPage.addItemToCart(1) 
    await t.expect(HeadersPage.cartNumber.innerText).eql("1")
})

test('6 Add multiple items to the Shopping Cart', async t =>{
    await LoginPage.login(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    await ProductsPage.addItemToCart(3) 
    await t.expect(HeadersPage.cartNumber.innerText).eql("3")   
})

test('4 Navigate to Shopping Cart', async t =>{
    await LoginPage.login(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    await ProductsPage.addItemToCart(2) 
    await HeadersPage.navigateToShoppingCart()
    await t.expect(HeadersPage.subheaderLabel.exists).ok()
    await t.expect(HeadersPage.subheaderLabel.innerText).contains('Your Cart') 
})

test('7 Continue with missing mail information', async t =>{
    await LoginPage.login(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    await ProductsPage.addItemToCart(2) 
    await HeadersPage.navigateToShoppingCart()
    await ShoppingCartPage.checkout()
    await CheckoutPage.fillInfoAndContinue(faker.name.firstName(), faker.name.lastName(), "")
    await t.expect(CheckoutPage.errorMessage.exists).ok()   
    await t.expect(CheckoutPage.errorMessage.innerText).contains('Postal Code is required') 
})

test('8 Fill user information', async t =>{
    await LoginPage.login(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    await ProductsPage.addItemToCart(2) 
    await HeadersPage.navigateToShoppingCart()
    await ShoppingCartPage.checkout()
    await CheckoutPage.fillInfoAndContinue(faker.name.firstName(), faker.name.lastName(), faker.address.zipCode())
    await t.expect(HeadersPage.subheaderLabel.exists).ok()
    await t.expect(HeadersPage.subheaderLabel.innerText).contains('Checkout: Overview')
})

test('9 Final order items', async t =>{
    let addedItems 
    let overviewItems
    await LoginPage.login(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    addedItems = await ProductsPage.addItemToCart(1) 
    await HeadersPage.navigateToShoppingCart()
    await ShoppingCartPage.checkout()
    await CheckoutPage.fillInfoAndContinue(faker.name.firstName(), faker.name.lastName(), faker.address.zipCode())
    overviewItems = await OverviewPage.getItemsInOverview()
    await t.expect(addedItems).eql(overviewItems)
})

test('10 Complete a Purchase', async t =>{
    await LoginPage.login(CREDENTIALS.VALID_USER.USERNAME, CREDENTIALS.VALID_USER.PASSWORD)
    await ProductsPage.addItemToCart(3) 
    await HeadersPage.navigateToShoppingCart()
    await ShoppingCartPage.checkout()
    await CheckoutPage.fillInfoAndContinue(faker.name.firstName(), faker.name.lastName(), faker.address.zipCode())
    await OverviewPage.finishPurchase()
    await t.expect(HeadersPage.subheaderLabel.exists).ok()
    await t.expect(HeadersPage.subheaderLabel.innerText).contains("Finish")
})
