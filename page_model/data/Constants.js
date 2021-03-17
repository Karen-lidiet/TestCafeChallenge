import dotenv from 'dotenv'
dotenv.config()

export const CREDENTIALS = {
    VALID_USER:{
        USERNAME:process.env.SAUCEUSER,
        PASSWORD:process.env.SAUCEPASSWORD
    },
    INVALID_USER:{
        USERNAME:'InvalidUser',
        PASSWORD:'InvalidPass'
    }
}