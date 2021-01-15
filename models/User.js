export default class User {
    constructor(id, firstname, lastname, email, phonenumber, address, city, zip) {
        this.id = id
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.phonenumber = phonenumber
        this.address = address
        this.city = city
        this.zip = zip
    }

    // get id() {
    //     return uuidv4();
    // }
}