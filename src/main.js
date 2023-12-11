import count from './js/count'
import sum from './js/sum'
import './style/css/index.css'
import './style/less/index.less'
import './style/sass/index.sass'
import './style/sass/index.scss'
import './style/stylus/index.styl'
const result1 = count(2);
console.log(result1);
const result2 = sum(1, 2, 3, 4);
console.log(result2);

// 判断是否支持HMR功能
if (module.hot) {
  module.hot.accept('./js/count.js', function (count) {
    const result1 = count(2);
    console.log(result1);
  });

  module.hot.accept('./js/sum.js', function (sum) {
    const result2 = sum(1, 2, 3, 4);
    console.log(result2);
  });
}