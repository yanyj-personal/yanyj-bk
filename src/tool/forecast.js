// /**
//  * Created by yanyj on 2018/4/28.
//  */
// 主场球队取胜的可能性 =44．8% +（0．53%乘以两队积分差）
// 客场球队的获胜可能性=24．5% -（两队积分差乘以0．39%）
import Decimal from 'decimal';


function aiForecast(host,guest) {

	let subPoints = (host -guest);
	subPoints = new Decimal(subPoints > 0 ? subPoints : 0 - subPoints);

	let hostWinRate = new Decimal(44.8).add(new Decimal(0.53).mul(subPoints));
	let guestWinRate = new Decimal(24.5).sub(new Decimal(0.39).mul(subPoints));


	return [ +hostWinRate.toNumber().toFixed(2), +guestWinRate.toNumber().toFixed(2)];
}


//   六场预测
// 六场预测法同样要考虑球队的实力和主客场等因素制，在此不再详述。我们用上述经过改进的六场预测法，对英格兰超级联赛和意大利甲级联赛 2000 / 01 赛季从第七轮开始的 560 多场比赛进行了预测，得出如下预测准则：
//
// 准则 1 当对赛的两队六场积分差为 6 或 6 以上时，六场积分高的球队胜；
//
// 准则 2 当对赛的两队六场积分差为 5 时，若主场球队六场积分高，则主场球队胜；若主场球队六场积分低，则主场球队胜或平；
//
// 准则 3 当对赛的两队六场积分差为 2～4 时，则六场积分高的球队胜。
//
// 准则 4 当对赛的两队六场积分差为 1 或 0 时，则主场球队胜或平。

function sixForecast(host, guest) {
	let sub = Math.abs(host - guest);

	if(sub >= 6) {
		return host > guest ? [3] : [0];
	} else if(sub === 5) {
		return host > guest ? [3] : [3, 1];
	} else if(sub >=2 && sub <= 4) {
		return host > guest ? [3] : [0];
	} else  {
		return [3,1];
	}
}


//根据走势获取积分
function getPoints(trendPoint) {
	return trendPoint.reduce(function (a,b) {
		return (+a) + (+b);
	})
}

export default {
	aiForecast,
	sixForecast,
	getPoints
}
