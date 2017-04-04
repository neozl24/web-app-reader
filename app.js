const koa = require('koa');  //引入koa框架

const controller = require('koa-route');
const app = koa();
const views = require('co-views');
const querystring = require('querystring');

//得到一个具有模版渲染能力的中间件
const render = views('./view', {
   map: {html: 'ejs'}
});
const koa_static = require('koa-static-server');

const service = require('./service/webAppService');

//访问静态资源文件，比如访问http://127.0.0.1:3001/s/test.js
app.use(koa_static({
    rootDir:'./static/',
    rootPath: '/static/',    //url上面的路径，所以没有点
    maxage: 0           //缓存时间为0，表示不缓存
}));

//路由器，指定路由有内容返回
app.use(controller.get('/route_test', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = 'Hello koa!';
}));

//模版渲染
app.use(controller.get('/ejs_test', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('test', {title:'被这里的文字替换了'});  //模版的名字是test.html
}));

app.use(controller.get('/api_test', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_test_data();
}));


app.use(controller.get('/', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('index', {title:'书城首页'});
}));

app.use(controller.get('/book', function* () {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var bookId = params.id;
    this.body = yield render('book', {nav:'书籍详情', bookId: bookId});
}));

app.use(controller.get('/search', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('search', {title:'搜索页面', nav:'搜索'});
}));

app.use(controller.get('/reader', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('reader');
}));

app.use(controller.get('/ajax/male', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_male_data();
}));

app.use(controller.get('/ajax/female', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_female_data();
}));

app.use(controller.get('/ajax/category', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_category_data();
}));

app.use(controller.get('/ajax/book', function* () {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if (!id) {
        id = "";
    }
    this.body = service.get_book_data(id);
}));

app.use(controller.get('/ajax/chapter', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_chapter_data();
}));

app.use(controller.get('/ajax/chapter_data', function* () {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if (!id) {
        id = "";
    }
    this.body = service.get_chapter_content_data(id);
}));

app.use(controller.get('/ajax/search', function* () {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var start = params.start;
    var end = params.end;
    var keyword = params.keyword;
    this.body = yield service.get_search_data(start, end, keyword);
}));

app.use(controller.get('/ajax/index', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_index_data();
}));

app.use(controller.get('/ajax/rank', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_rank_data();
}));

app.listen(3001);

console.log('koa server is started!!!');