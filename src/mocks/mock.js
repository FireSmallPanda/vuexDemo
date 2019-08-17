const Mock = require('mockjs')
const data = require('./data.json')
const data1 = require('./data1.json')
const base = 'https://dev-api-whale.codemao.cn'

const Random = Mock.Random;

Mock.mock(base+'/api/mock','get',{
    'name':'@name',
    'age|1-100':100,
    'color':'@color',
    'thumbnail_pic_s': Random.dataImage('300x250', 'mock的图片')
})
// 请求数据接口
Mock.mock('/recommed/slide', 'get', data);
// 请求数据接口
Mock.mock('/recommed/data1', 'get', data1);

// 设置所有ajax请求的超时时间，模拟网络传输耗时
Mock.setup({
    timeout: 2000-10000
})