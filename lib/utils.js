// Fetch asynchronuosly
exports.fetchAsync = (url, options) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(response => {
        const status = response.status;
        response.json().then(data => {
          resolve({ status: status, data: data });
        }).catch(error => {
          reject(error);
        });
      }).catch(error => {
        reject(error);
      });
  });
};

exports.createURL = (url, params = {}) => {
  url = new URL(url)
  Object.keys(params).forEach(key => {
    let value = params[key];
    let type = typeof value
    if (type == 'object')
      value = JSON.stringify(value);
    url.searchParams.append(key, value);
  });  
  return url;
};

exports.cond = (f1, op, f2) => {
  return { type: 'cond', f1: f1, op: op, f2: f2 };
};

exports.and = (...conditions) => {
  return { type: 'and', clauses: conditions };
};

exports.or = (...conditions) => {
  return { type: 'or', clauses: conditions };
};