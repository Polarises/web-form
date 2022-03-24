import utilHelper from "../utilsHelper";


const storageName = utilHelper.scope.username;
let temp = localStorage.getItem(storageName);
if (!temp) {
  localStorage.setItem(storageName, "{}");
}


const setItem = function (name, item) {
  try {
    let temp = JSON.parse(localStorage.getItem(storageName));
    temp[name] = item;
    localStorage.setItem(storageName, JSON.stringify(temp));
    return true;
  } catch (err) {
    throw err;
  }
}

const getItem = function (name) {
  try {
    let temp = JSON.parse(localStorage.getItem(storageName));
    let result = temp[name];
    return result;
  } catch (err) {
    throw err;
  }
}
const delItem = function (name) {
  try {
    let temp = JSON.parse(localStorage.getItem(storageName))
    delete temp[name];
    localStorage.setItem(storageName,JSON.stringify(temp))
    // return true
  } catch (err) {
    throw err
  }
}
const storageDao = {
  setItem,
  getItem,
  delItem
}
export default storageDao
