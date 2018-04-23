/**
 * Created by yanyj on 2017/7/11.
 */
let http = require('http');
// let cheerio = require('cheerio');
let request = require('request');

/**
 *
 * @param {String} url
 */
function fecthUrl(url) {

}

/**
 *
 * @param {String} url
 * @param {Function} callback 处理方法
 */
function getPageByUrl(url, callback) {
	http.get(url, function (res) {
		var htmlStr = '';
		res.setEncoding('utf-8');//防止中文乱码

		//监听data事件
		res.on('data', (chunk) =>{
			htmlStr += chunk;
		});
		res.on('error', createHangUpError);


		//监听end事件
		res.on('end', () => {
			callback(htmlStr)
		});
	})
}


function createHangUpError() {
	var error = new Error('socket hang up');
	error.code = 'ECONNRESET';
	return error;
}

export {
	getPageByUrl
};
