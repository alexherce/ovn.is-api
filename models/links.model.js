const db = require('../lib/mysql.js');

const shortid = require('shortid');
const moment = require('moment');

function abort(connection, reject, error) {
  connection.release();
  return reject(error);
}

exports.create = function(params) {
  return new Promise((resolve, reject) => {

    let values = [];

    // generate short url
    values.push(shortid.generate());
    values.push(params.url);

    db.get(db.WRITE, function(err, connection) {
      if (err) {
        if (connection) connection.release();
        console.log(err);
        return reject(err);
      }

      connection.query("INSERT INTO links (urlKey, url) VALUES (?, ?)", values, function (error, result) {
        connection.release();
        if (error) {
          console.log(error);
          return reject({success: false, error: 'save_error', details: error});
        }
        if (!result) {
          console.log(result);
          return reject({success: false, error: 'save_error'});
        }
        return resolve({success: true, url: values[0]});
      });
    });
  });
}
