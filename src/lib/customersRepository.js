const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Customer = require('../models/customer');

class CustomersRepository {

    // get all the customers
    getCustomers(callback) {
        console.log('*** CustomersRepository.getCustomers');
        Customer.count((err, custsCount) => {
            let count = custsCount;
            console.log(`Customers count: ${count}`);

            Customer.find({}, (err, customers) => {
                if (err) { 
                    console.log(`*** CustomersRepository.getCustomers error: ${err}`); 
                    return callback(err); 
                }
                callback(null, {
                    count: count,
                    customers: customers
                });
            });

        });
    }

    // get a  customer
    getCustomer(id, callback) {
        console.log('*** CustomersRepository.getCustomer');
        Customer.findById(id, (err, customer) => {
            if (err) { 
                console.log(`*** CustomersRepository.getCustomer error: ${err}`); 
                return callback(err); 
            }
            callback(null, customer);
        });
    }

    // insert a  customer
    insertCustomer(body, state, callback) {
        console.log('*** CustomersRepository.insertCustomer');
        console.log(state);
        let customer = new Customer();
        let newState = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }
        console.log(body);

        customer.firstName = body.firstName;
        customer.lastName = body.lastName;
        customer.email = body.email;
        customer.address = body.address;
        customer.city = body.city;
        customer.state = newState;
        customer.stateId = newState.id;
        customer.zip = body.zip;
        customer.gender = body.gender;

        customer.save((err, customer) => {
            if (err) { 
                console.log(`*** CustomersRepository insertCustomer error: ${err}`); 
                return callback(err, null); 
            }

            callback(null, customer);
        });
    }
}

module.exports = new CustomersRepository();