import { uuidv4 } from "../helpers/functions.js";

export default class User {
    constructor(firstname, lastname, email, phonenumber, address, city, zip) {
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.phonenumber = phonenumber
        this.address = address
        this.city = city
        this.zip = zip
    }

    get id() {
        return uuidv4();
    }
}