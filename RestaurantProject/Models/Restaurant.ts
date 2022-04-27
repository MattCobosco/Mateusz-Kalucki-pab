class Restaurant{
    name: string;
    address: string;
    phone: string;
    nip: string;
    email: string;
    website: string;

    constructor(name: string, address: string, phone: string, nip: string, email: string, website: string)
    {
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.nip = nip;
        this.email = email;
        this.website = website;
    }
}

export default Restaurant;