

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type,
    url: action,
    data,
    dataType: 'json',
    success,
    error: function error(xhr) {
      console.log('Error');
      console.log(xhr.responseText);
      const messageObj = JSON.parse(xhr.responseText);
      console.log(messageObj.error);
    },
  });
};

var getSessionStorage = (key, callback) => {
  let data;
  const time = setInterval(() => {
    data = window.sessionStorage.getItem(key);

    if (data !== '' && data !== null) {
      data = callback(data);
      clearInterval(time);
    }
  }, 200);
};
var getStorage = (key, callback) => {
  let data;
  const time = setInterval(() => {
    data = window.localStorage.getItem(key);

    if (data !== '' && data !== null) {
      data = callback(data);
      clearInterval(time);
      // data = callback(data)
      return data;
      /// /console.log(data);
    }
    return data;
  }, 200);
  return data;
  /// /console.log(time);
};

var redirect = (location) => {
  window.location = location;
};
