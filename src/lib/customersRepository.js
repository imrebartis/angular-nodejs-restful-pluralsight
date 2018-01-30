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

}

module.exports = new CustomersRepository();