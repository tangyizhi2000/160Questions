// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
// event.value is the name we are seraching for. Note that this is a fuzzy search.
exports.main = async (event, context) => {
  var value = event.value;
  if (value == "") {
    return await db.collection("CompanyGrades").where({
      Company_Name: value
    }).get()
  } else {
    return await db.collection("CompanyGrades").where({
      Company_Name: {
        $regex: '.*' + value,
        $options: 'i'
      }
    }).get()
  }
}