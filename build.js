module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hapi = __webpack_require__(/*! hapi */ "hapi");

var _hapi2 = _interopRequireDefault(_hapi);

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _bootstrap = __webpack_require__(/*! ./app/bootstrap/bootstrap.js */ "./app/bootstrap/bootstrap.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_CONFIG_DIR = _path2.default.join(__dirname, '/app/config'); // chỗ này dùng làm gì

global.CONFIG = __webpack_require__(/*! config */ "config");

var options = _lodash2.default.cloneDeep(global.CONFIG.get('web.connection'));

const server = _hapi2.default.Server(options);

server.liftOff = async () => {
  try {
    await (0, _bootstrap.loader)(server);
    await server.start();
    console.log('Server running at ' + server.info.uri);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

server.liftOff();

/***/ }),

/***/ "./app/bootstrap/bootstrap.js":
/*!************************************!*\
  !*** ./app/bootstrap/bootstrap.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loader = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const mongo = __webpack_require__(/*! ../lib/mongo.js */ "./app/lib/mongo.js");

const redis = __webpack_require__(/*! ../lib/redis.js */ "./app/lib/redis.js");

const auth = __webpack_require__(/*! ../lib/auth.js */ "./app/lib/auth.js");

const Inert = __webpack_require__(/*! inert */ "inert");

const Vision = __webpack_require__(/*! vision */ "vision");

const HapiCors = __webpack_require__(/*! hapi-cors */ "hapi-cors");

const HapiSwagger = __webpack_require__(/*! hapi-swagger */ "hapi-swagger");

const RouteImage = __webpack_require__(/*! ../lib/routeimage */ "./app/lib/routeimage.js");

const loader = exports.loader = async function (server) {
  const Pack = __webpack_require__(/*! ./../../package */ "./package.json");

  const swaggerOptions = {
    info: {
      title: 'Test API',
      version: Pack.version
    }
  };
  await server.register([
  /* Plugin lib */
  mongo, redis, auth, Inert, Vision, {
    plugin: HapiSwagger,
    options: swaggerOptions
  }, RouteImage, {
    plugin: HapiCors,
    options: {
      origins: ['*'],
      methods: ['POST, GET, OPTIONS, PUT, DELETE']
    }
  }]).then(async err => {
    if (err) {
      console.log(err);
    }
    /* Load models */


    __webpack_require__(/*! ../models/Phong/model */ "./app/models/Phong/model.js");

    __webpack_require__(/*! ../models/KhuPhong/model */ "./app/models/KhuPhong/model.js");

    __webpack_require__(/*! ../models/LoaiPhong/model */ "./app/models/LoaiPhong/model.js");

    __webpack_require__(/*! ../models/TinhTrangPhong/model */ "./app/models/TinhTrangPhong/model.js");

    __webpack_require__(/*! ../models/KhachThue/model */ "./app/models/KhachThue/model.js");

    __webpack_require__(/*! ../models/LoaiKhachThue/model */ "./app/models/LoaiKhachThue/model.js");

    __webpack_require__(/*! ../models/HopDongThuePhong/model */ "./app/models/HopDongThuePhong/model.js");

    __webpack_require__(/*! ../models/PhieuThuTien/model */ "./app/models/PhieuThuTien/model.js");

    __webpack_require__(/*! ../models/CTPhieuThuTien/model */ "./app/models/CTPhieuThuTien/model.js");

    __webpack_require__(/*! ../models/CacKhoanThu/model */ "./app/models/CacKhoanThu/model.js");

    __webpack_require__(/*! ../models/PhieuTraPhong/model */ "./app/models/PhieuTraPhong/model.js");

    __webpack_require__(/*! ../models/User/model */ "./app/models/User/model.js");

    __webpack_require__(/*! ../models/Booking/model */ "./app/models/Booking/model.js");

    __webpack_require__(/*! ../models/LienHe/model */ "./app/models/LienHe/model.js");

    __webpack_require__(/*! ../models/NhanVien/model */ "./app/models/NhanVien/model.js");

    __webpack_require__(/*! ../models/Role/model */ "./app/models/Role/model.js");

    __webpack_require__(/*! ../models/RoleGroup/model */ "./app/models/RoleGroup/model.js");

    __webpack_require__(/*! ../lib/services/translateCharacter.js */ "./app/lib/services/translateCharacter.js");

    __webpack_require__(/*! ../lib/services/checkQuyen.js */ "./app/lib/services/checkQuyen.js");
    /* Load Modules */


    let modules = [];
    modules.push(__webpack_require__(/*! ../modules/phong */ "./app/modules/phong/index.js"));
    modules.push(__webpack_require__(/*! ../modules/khuphong */ "./app/modules/khuphong/index.js"));
    modules.push(__webpack_require__(/*! ../modules/loaiphong */ "./app/modules/loaiphong/index.js"));
    modules.push(__webpack_require__(/*! ../modules/tinhtrangphong */ "./app/modules/tinhtrangphong/index.js"));
    modules.push(__webpack_require__(/*! ../modules/khachthue */ "./app/modules/khachthue/index.js"));
    modules.push(__webpack_require__(/*! ../modules/loaikhacthue */ "./app/modules/loaikhacthue/index.js"));
    modules.push(__webpack_require__(/*! ../modules/hopdongthue */ "./app/modules/hopdongthue/index.js"));
    modules.push(__webpack_require__(/*! ../modules/cackhoanthu */ "./app/modules/cackhoanthu/index.js"));
    modules.push(__webpack_require__(/*! ../modules/phieuthutien */ "./app/modules/phieuthutien/index.js"));
    modules.push(__webpack_require__(/*! ../modules/ctphieuthutien */ "./app/modules/ctphieuthutien/index.js"));
    modules.push(__webpack_require__(/*! ../modules/phieutraphong */ "./app/modules/phieutraphong/index.js"));
    modules.push(__webpack_require__(/*! ../modules/user */ "./app/modules/user/index.js"));
    modules.push(__webpack_require__(/*! ../modules/nhanvien */ "./app/modules/nhanvien/index.js"));
    modules.push(__webpack_require__(/*! ../modules/role */ "./app/modules/role/index.js"));
    modules.push(__webpack_require__(/*! ../modules/rolegroup */ "./app/modules/rolegroup/index.js"));
    modules.push(__webpack_require__(/*! ../modules/booking */ "./app/modules/booking/index.js"));
    modules.push(__webpack_require__(/*! ../modules/lienhe */ "./app/modules/lienhe/index.js"));

    if (modules.length) {
      let options = {};
      options.routes = {
        prefix: '/api'
      };
      await server.register(modules, options, err => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
};

/***/ }),

/***/ "./app/lib/auth.js":
/*!*************************!*\
  !*** ./app/lib/auth.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const AuthJwt2 = __webpack_require__(/*! hapi-auth-jwt2 */ "hapi-auth-jwt2");

exports.register = async function (server, options) {
  const validate = async function (decoded, request) {
    const redisClient = server.redis;
    let result = await redisClient.getAsync(decoded.id);

    if (result) {
      let session = JSON.parse(result);

      if (session.valid === true) {
        return {
          isValid: true
        };
      }

      return {
        isValid: false
      };
    }

    return {
      isValid: false
    };
  };

  await server.register(AuthJwt2);
  server.auth.strategy('jwt', 'jwt', {
    key: global.CONFIG.get('web.jwt.secret'),
    validate,
    verifyOptions: {
      ignoreExpiration: true,
      algorithms: ['HS256']
    }
  });
  server.auth.default('jwt');
};

exports.name = 'app-auth-jwt2';
exports.dependencies = ['app-redis'];

/***/ }),

/***/ "./app/lib/basemail/mailBooking.js":
/*!*****************************************!*\
  !*** ./app/lib/basemail/mailBooking.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const fs = __webpack_require__(/*! fs */ "fs");

const path = __webpack_require__(/*! path */ "path");

const mailBooking = function (data) {
  let content = fs.readFileSync(path.join(__dirname, 'app', 'lib', 'basemail', 'templateBooking.html'));
  content = String(content);
  content = content.replace('{{hoTenKhachThue}}', `${data.hoNguoiBook} ${data.tenNguoiBook}`);
  content = content.replace('{{maBooking}}', `${data._id}`);
  content = content.replace('{{maBooking}}', `${data._id}`);
  return content;
};

exports.default = {
  mailBooking
};

/***/ }),

/***/ "./app/lib/basemail/mailHetHanHopDong.js":
/*!***********************************************!*\
  !*** ./app/lib/basemail/mailHetHanHopDong.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const fs = __webpack_require__(/*! fs */ "fs");

const path = __webpack_require__(/*! path */ "path");

const mailHetHanHopDong = function (data) {
  let content = fs.readFileSync(path.join(__dirname, 'app', 'lib', 'basemail', 'templateHetHanHopDong.html'));
  content = String(content);
  content = content.replace('{{hoTenKhachThue}}', `${data.khachThueID.hoKhachThue} ${data.khachThueID.tenKhachThue}`);
  return content;
};

exports.default = {
  mailHetHanHopDong
};

/***/ }),

/***/ "./app/lib/basemail/mailHopDong.js":
/*!*****************************************!*\
  !*** ./app/lib/basemail/mailHopDong.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const fs = __webpack_require__(/*! fs */ "fs");

const moment = __webpack_require__(/*! moment */ "moment");

const path = __webpack_require__(/*! path */ "path");

const mailHopDong = function (data) {
  let content = fs.readFileSync(path.join(__dirname, 'app', 'lib', 'basemail', 'templateHopDong.html'));
  content = String(content);
  content = content.replace('{{soHD}}', `${data._id}`);
  content = content.replace('{{hoTenKhachThue}}', `${data.khachThueID.hoKhachThue} ${data.khachThueID.tenKhachThue}`);
  content = content.replace('{{hoTenKhachThue}}', `${data.khachThueID.hoKhachThue} ${data.khachThueID.tenKhachThue}`);
  content = content.replace('{{hoTenKhachThue}}', `${data.khachThueID.hoKhachThue} ${data.khachThueID.tenKhachThue}`);
  content = content.replace('{{ngaySinh}}', `${moment(data.khachThueID.ngaySinh).format('DD/MM/YYYY')}`);
  content = content.replace('{{CMND}}', `${data.khachThueID.soCMND}`);
  content = content.replace('{{diaChi}}', `${data.khachThueID.diaChi}`);
  content = content.replace('{{tenPhong}}', `${data.phongID.tenPhong}`);
  content = content.replace('{{tenKhuPhong}}', `${data.phongID.khuPhongID.tenKhuPhong}`);
  content = content.replace('{{loaiPhong}}', `${data.phongID.loaiPhongID.tenLoaiPhong}`);
  content = content.replace('{{giaPhong}}', `${data.phongID.giaPhong.toLocaleString()}`);
  content = content.replace('{{ngayThue}}', `${moment(data.ngayLap).format('DD/MM/YYYY')} `);
  content = content.replace('{{ngayTra}}', `${moment(data.ngayKetThuc).format('DD/MM/YYYY')}`);
  content = content.replace('{{ngayKy}}', `${moment(Date.now()).format(`DD/MM/YYYY`)}`);
  content = content.replace('{{maKhachThue}}', `${data.khachThueID._id}`);
  return content;
};

exports.default = {
  mailHopDong
};

/***/ }),

/***/ "./app/lib/basemail/mailLienHe.js":
/*!****************************************!*\
  !*** ./app/lib/basemail/mailLienHe.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const fs = __webpack_require__(/*! fs */ "fs");

const path = __webpack_require__(/*! path */ "path");

const mailLienHe = function (data) {
  let content = fs.readFileSync(path.join(__dirname, 'app', 'lib', 'basemail', 'teamplateLienHe.html'));
  content = String(content);
  content = content.replace('{{matenPhong}}', `${data.phongID.tenPhong}`);
  content = content.replace('{{maPhong}}', `${data.phongID._id}`);
  return content;
};

exports.default = {
  mailLienHe
};

/***/ }),

/***/ "./app/lib/basemail/mailPhieuThuTien.js":
/*!**********************************************!*\
  !*** ./app/lib/basemail/mailPhieuThuTien.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const fs = __webpack_require__(/*! fs */ "fs");

const moment = __webpack_require__(/*! moment */ "moment");

const path = __webpack_require__(/*! path */ "path");

const formatCurrency = function (currency) {
  return currency.toLocaleString();
};

const mailPhieuThuTien = function (data) {
  let content = fs.readFileSync(path.join(__dirname, 'app', 'lib', 'basemail', 'templatePhieuThu.html'));
  content = String(content);
  content = content.replace('{{MaPT}}', data._id);
  content = content.replace('{{Thang}}', moment(data.ngayLap).format('MM/YYYY'));
  content = content.replace('{{TenPhong}}', data.phongID.tenPhong);
  content = content.replace('{{NgayLap}}', moment(data.ngayLap).format('DD/MM/YYYY'));
  content = content.replace('{{ngayHetHan}}', moment(data.ngayHetHan).format('DD/MM/YYYY'));

  for (let item of data.dsCTPT) {
    if (item.chiSoMoi && item.chiSoMoi > 0) {
      content = content.replace('{{ChiSoCu}}', item.chiSoCu);
      content = content.replace('{{ChiSoMoi}}', item.chiSoMoi);
      content = content.replace('{{SoLuong}}', item.chiSoMoi - item.chiSoCu);
      content = content.replace('{{GiaChiSo}}', formatCurrency(item.donGia));
      content = content.replace('{{ThanhTienDV}}', formatCurrency((item.chiSoMoi - item.chiSoCu) * item.donGia));
    } else {
      content = content.replace('{{Gia}}', formatCurrency(item.donGia));
      content = content.replace('{{ThanhTien}}', formatCurrency(item.donGia));
    }
  }

  if (data.dsCTPT.length === 3) {
    content = content.replace('{{Gia}}', '0');
    content = content.replace('{{ThanhTien}}', '0');
  }

  let tongTien = data.dsCTPT.reduce((tongTien, x) => {
    if (x.chiSoMoi && x.chiSoMoi > 0) {
      tongTien += (x.chiSoMoi - x.chiSoCu) * x.donGia;
    } else {
      tongTien += x.donGia;
    }

    return tongTien;
  }, 0);
  content = content.replace('{{TongCong}}', formatCurrency(tongTien));
  return content;
};

exports.default = {
  mailPhieuThuTien
};

/***/ }),

/***/ "./app/lib/basemail/sendMail.js":
/*!**************************************!*\
  !*** ./app/lib/basemail/sendMail.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const nodemailer = __webpack_require__(/*! nodemailer */ "nodemailer");

const SenMail = async (options, email) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'toan210597ntu@gmail.com',
      clientId: '111021480568-u7nd27a29i23hfgalgl54vcna1g5l94r.apps.googleusercontent.com',
      clientSecret: 'lVDO6CQihwxxY1PgbqSXcjDE',
      refreshToken: '1/QVtnf24Ad8HxbIFi5vZJiwvLNSKOWkdwRzpsIiY3c22kSf2JBSbNXFq5cui2oS_k'
    }
  });
  let mailOptions = {
    from: '"Phòng Trọ Cô Mai" <toan210597ntu@gmail.com>',
    to: email,
    subject: options.subject,
    text: options.text,
    html: options.content
  };
  await transporter.sendMail(mailOptions, function (err, res) {
    if (err) {
      console.log('Lỗi', err);
    } else {
      console.log("Đã gửi mail"); // Preview only available when sending through an Ethereal account
    }
  });
};

exports.default = {
  SenMail
};

/***/ }),

/***/ "./app/lib/mongo.js":
/*!**************************!*\
  !*** ./app/lib/mongo.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = __webpack_require__(/*! mongoose-paginate */ "mongoose-paginate");

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = async function (server, options) {
  await _mongoose2.default.connect(global.CONFIG.get('web.db.uri'), {
    useNewUrlParser: true
  });

  _mongoose2.default.set('useCreateIndex', true);

  _mongoose2.default.set('useFindAndModify', false);

  _mongoose2.default.plugin(_mongoosePaginate2.default);

  console.log('Register Mongo:', global.CONFIG.get('web.db.uri'));
};

exports.name = 'app-mongo';

/***/ }),

/***/ "./app/lib/redis.js":
/*!**************************!*\
  !*** ./app/lib/redis.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const bluebird = __webpack_require__(/*! bluebird */ "bluebird");

const redis = __webpack_require__(/*! redis */ "redis");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

exports.register = async function (server, options) {
  let settings = global.CONFIG.get('web.redisOptions');
  global.client = redis.createClient(settings);
  server.decorate('server', 'redis', global.client);
  server.decorate('request', 'redis', global.client);
  server.expose('client', global.client);
};

exports.name = 'app-redis';
exports.dependencies = 'app-mongo';

/***/ }),

/***/ "./app/lib/routeimage.js":
/*!*******************************!*\
  !*** ./app/lib/routeimage.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.register = async (server, options) => {
  server.route({
    method: 'GET',
    path: '/image/{file*}',
    handler: (request, h) => {
      try {
        return h.file('app/lib/images/' + request.params.file);
      } catch (err) {
        return err;
      }
    },
    config: {
      auth: false
    }
  });
};

exports.name = 'route-image';

/***/ }),

/***/ "./app/lib/services/checkQuyen.js":
/*!****************************************!*\
  !*** ./app/lib/services/checkQuyen.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const isRoles = (request, h) => {
  try {
    let getRolesAllow = ['chủ trọ', 'nhân viên'];
    let roles = request.auth.credentials.credentials.roles;

    if (getRolesAllow.includes(roles)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return Boom.forbidden(err);
  }
};

const isRolesCustomer = (request, h) => {
  try {
    let roles = request.auth.credentials.credentials.roles;

    if (roles === 'khách thuê') {
      return true;
    } else {
      return false;
    }
  } catch (err) {}
};

const isRolesAdmin = (request, h) => {
  try {
    let roles = request.auth.credentials.credentials.roles;

    if (roles === 'chủ trọ') {
      return true;
    } else {
      return false;
    }
  } catch (err) {}
};

exports.default = {
  isRoles,
  isRolesCustomer,
  isRolesAdmin
};

/***/ }),

/***/ "./app/lib/services/translateCharacter.js":
/*!************************************************!*\
  !*** ./app/lib/services/translateCharacter.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = translateCharacter;

function translateCharacter(input) {
  if (input == undefined || input == '') return ''; // đổi chữ hoa thành chữ thường

  var slug = input.toLowerCase(); // đổi ký tự có dấu thành không dấu

  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ặ|ẵ|â|ấ|ầ|ẩ|ậ|ẫ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẹ|ẽ|ê|ế|ề|ể|ệ|ễ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ị|ĩ/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|ọ|õ|ô|ố|ồ|ộ|ổ|ỗ|ơ|ớ|ờ|ợ|ở|ỡ/gi, 'o');
  slug = slug.replace(/ú|ù|ụ|ủ|ũ|ư|ứ|ừ|ự|ử|ữ/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỵ|ỷ|ỹ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd'); // xóa ký tự đặc biệt

  slug = slug.replace(/\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|\_/gi, ''); // đổi ký tự khoảng trắng thành dấu gạch ngang

  slug = slug.replace(/ /gi, ''); // đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  // Phòng trường hợp người nhập quá nhiều ký tự trắng

  slug = slug.replace(/\-\-\-\-\-\-\-/gi, '');
  slug = slug.replace(/\-\-\-\-\-\-/gi, '');
  slug = slug.replace(/\-\-\-\-\-/gi, '');
  slug = slug.replace(/\-\-\-\-/gi, '');
  slug = slug.replace(/\-\-\-/gi, '');
  slug = slug.replace(/\-\-/gi, ''); // xóa ký tự gạch ngang ở đầu và cuối

  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
}

/***/ }),

/***/ "./app/models/Booking/model.js":
/*!*************************************!*\
  !*** ./app/models/Booking/model.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema.js */ "./app/models/Booking/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bookingSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('Booking', bookingSchema);

/***/ }),

/***/ "./app/models/Booking/schema.js":
/*!**************************************!*\
  !*** ./app/models/Booking/schema.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  hoNguoiBook: {
    type: String,
    required: true,
    max: 20
  },
  tenNguoiBook: {
    type: String,
    required: true,
    max: 10
  },
  email: {
    type: String,
    required: true
  },
  soDienThoai: {
    type: String,
    required: true,
    max: 12
  },
  soCMND: {
    type: String,
    required: true,
    max: 11
  },
  diaChi: {
    type: String,
    required: true,
    max: 100
  },
  phongID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Phong'
  },
  ngayBookPhong: {
    type: Date,
    default: Date.now()
  },
  ngayNhanPhong: {
    type: Date,
    required: true
  },
  status: {
    type: Boolean,
    default: false,
    required: true
  }
};
const options = {
  collection: 'booking'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/CTPhieuThuTien/model.js":
/*!********************************************!*\
  !*** ./app/models/CTPhieuThuTien/model.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/CTPhieuThuTien/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cTPhieuThuTienSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('CTPhieuThuTien', cTPhieuThuTienSchema);

/***/ }),

/***/ "./app/models/CTPhieuThuTien/schema.js":
/*!*********************************************!*\
  !*** ./app/models/CTPhieuThuTien/schema.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  phieuThuID: {
    type: String,
    ref: 'PhieuThuTien'
  },
  chiSoCu: {
    type: Number
  },
  chiSoMoi: {
    type: Number
  },
  donGia: {
    type: Number,
    required: true
  },
  cacKhoanThuID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'CacKhoanThu'
  }
};
const options = {
  collection: 'ctphieuthutiens'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/CacKhoanThu/model.js":
/*!*****************************************!*\
  !*** ./app/models/CacKhoanThu/model.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/CacKhoanThu/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cacKhoanThuSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('CacKhoanThu', cacKhoanThuSchema);

/***/ }),

/***/ "./app/models/CacKhoanThu/schema.js":
/*!******************************************!*\
  !*** ./app/models/CacKhoanThu/schema.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const schema = {
  tenKhoanThu: {
    type: String,
    required: true,
    max: 30
  },
  giaKhoanThu: {
    type: Number
  },
  donViTinh: {
    type: String,
    required: true,
    max: 30
  }
};
const options = {
  collection: 'cackhoanthus'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/HopDongThuePhong/dao.js":
/*!********************************************!*\
  !*** ./app/models/HopDongThuePhong/dao.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (schema, options) {
  schema.statics.thongKeHD = async function (payload) {
    let Model = this;
    let ngayBD = payload.ngayThongKe[0];
    let ngayKT = payload.ngayThongKe[1];

    if (payload.tieuChi === 'hdLap') {
      return await Model.find({
        ngayLap: {
          $gt: ngayBD,
          $lt: ngayKT
        }
      }).populate([{
        path: 'khachThueID'
      }, {
        path: 'phongID',
        populate: ['khuPhongID']
      }]);
    }

    if (payload.tieuChi === 'hdKT') {
      return await Model.find({
        ngayKetThuc: {
          $gt: ngayBD,
          $lt: ngayKT
        }
      }).populate([{
        path: 'khachThueID'
      }, {
        path: 'phongID',
        populate: ['khuPhongID']
      }]);
    }
  };
};

/***/ }),

/***/ "./app/models/HopDongThuePhong/model.js":
/*!**********************************************!*\
  !*** ./app/models/HopDongThuePhong/model.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/HopDongThuePhong/schema.js");

var _dao = __webpack_require__(/*! ./dao.js */ "./app/models/HopDongThuePhong/dao.js");

var _dao2 = _interopRequireDefault(_dao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hopDongSchema = new _mongoose.Schema(_schema.schema, _schema.options);
hopDongSchema.plugin(_dao2.default);
exports.default = _mongoose2.default.model('HopDongThuePhong', hopDongSchema);

/***/ }),

/***/ "./app/models/HopDongThuePhong/schema.js":
/*!***********************************************!*\
  !*** ./app/models/HopDongThuePhong/schema.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  _id: {
    type: String,
    required: true
  },
  khachThueID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'KhachThue'
  },
  phongID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Phong'
  },
  ngayLap: {
    type: Date
  },
  ngayKetThuc: {
    type: Date
  }
};
const options = {
  collection: 'hopdongs'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/KhachThue/dao.js":
/*!*************************************!*\
  !*** ./app/models/KhachThue/dao.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (schema, options) {
  schema.statics.searchMultiple = async function (payload) {
    let Model = this;
    let queryString = {};

    if (payload.hoKhachThue) {
      queryString.hoKhachThue = {
        $regex: '.*' + payload.hoKhachThue + '.*'
      };
    }

    if (payload.tenKhachThue) {
      queryString.tenKhachThue = {
        $regex: '.*' + payload.tenKhachThue + '.*'
      };
    }

    if (payload.hoTenNguoiThan) {
      queryString.hoTenNguoiThan = {
        $regex: '.*' + payload.hoTenNguoiThan + '.*'
      };
    }

    if (payload.diaChi) {
      queryString.diaChi = {
        $regex: '.*' + payload.diaChi + '.*'
      };
    }

    if (payload.email) {
      queryString.email = {
        $regex: '.*' + payload.email + '.*'
      };
    }

    if (payload.loaiKhachThueID) {
      queryString.loaiKhachThueID = payload.loaiKhachThueID;
    }

    if (payload.tinhTrangKhachThue) {
      queryString.tinhTrangKhachThue = payload.tinhTrangKhachThue;
    }

    if (payload.soDienThoai) {
      queryString.soDienThoai = {
        $regex: '.*' + payload.soDienThoai + '.*'
      };
    }

    if (payload.soCMND) {
      queryString.soCMND = {
        $regex: '.*' + payload.soCMND + '.*'
      };
    }

    if (payload.gioiTinh) {
      queryString.gioiTinh = payload.gioiTinh;
    }

    if (payload.ngaySinh) {
      queryString.ngaySinh = payload.ngaySinh;
    }

    let data = await Model.find(queryString).lean().populate('loaiKhachThueID');
    return data;
  };
};

/***/ }),

/***/ "./app/models/KhachThue/model.js":
/*!***************************************!*\
  !*** ./app/models/KhachThue/model.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/KhachThue/schema.js");

var _dao = __webpack_require__(/*! ./dao.js */ "./app/models/KhachThue/dao.js");

var _dao2 = _interopRequireDefault(_dao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const phongSchema = new _mongoose.Schema(_schema.schema, _schema.options);
phongSchema.plugin(_dao2.default);
exports.default = _mongoose2.default.model('KhachThue', phongSchema);

/***/ }),

/***/ "./app/models/KhachThue/schema.js":
/*!****************************************!*\
  !*** ./app/models/KhachThue/schema.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  hoKhachThue: {
    type: String,
    required: true,
    max: 30
  },
  tenKhachThue: {
    type: String,
    required: true,
    max: 20
  },
  anhDaiDien: {
    type: String
  },
  ngaySinh: {
    type: Date
  },
  gioiTinh: {
    type: Boolean,
    default: false
  },
  soCMND: {
    type: String,
    required: true,
    max: 11
  },
  soDienThoai: {
    type: String,
    max: 11
  },
  hoTenNguoiThan: {
    type: String,
    max: 50
  },
  diaChi: {
    type: String,
    required: true,
    max: 80
  },
  loaiKhachThueID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'LoaiKhachThue'
  },
  tinhTrangKhachThue: {
    type: String,
    required: true
  },
  phongs: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Phong'
  }],
  email: String
};
const options = {
  collection: 'khacthues'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/KhuPhong/model.js":
/*!**************************************!*\
  !*** ./app/models/KhuPhong/model.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/KhuPhong/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const KhuPhongSchema = new _mongoose.Schema(_schema.schema, _schema.options);
KhuPhongSchema.virtual('dsPhong', {
  ref: 'Phong',
  localField: '_id',
  foreignField: 'khuPhongID'
});
exports.default = _mongoose2.default.model('KhuPhong', KhuPhongSchema);

/***/ }),

/***/ "./app/models/KhuPhong/schema.js":
/*!***************************************!*\
  !*** ./app/models/KhuPhong/schema.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const schema = {
  tenKhuPhong: {
    type: String,
    required: true,
    max: 20
  },
  anhKhuPhong: {
    type: String
  },
  moTa: String
};
const options = {
  collection: 'khuphongs',
  timestamps: true,
  virtuals: true
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/LienHe/model.js":
/*!************************************!*\
  !*** ./app/models/LienHe/model.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema.js */ "./app/models/LienHe/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const lienHeSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('LienHe', lienHeSchema);

/***/ }),

/***/ "./app/models/LienHe/schema.js":
/*!*************************************!*\
  !*** ./app/models/LienHe/schema.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  hoTenNguoiLienHe: {
    type: String,
    required: true,
    max: 50
  },
  email: {
    type: String,
    required: true
  },
  soDienThoai: {
    type: String,
    required: true,
    max: 12
  },
  phongID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Phong'
  }
};
const options = {
  collection: 'lienhes'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/LoaiKhachThue/model.js":
/*!*******************************************!*\
  !*** ./app/models/LoaiKhachThue/model.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/LoaiKhachThue/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const loaiKhachThueSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('LoaiKhachThue', loaiKhachThueSchema);

/***/ }),

/***/ "./app/models/LoaiKhachThue/schema.js":
/*!********************************************!*\
  !*** ./app/models/LoaiKhachThue/schema.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const schema = {
  tenLoaiKhachThue: {
    type: String,
    required: true,
    max: 30
  }
};
const options = {
  collection: 'loaikhachthues'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/LoaiPhong/model.js":
/*!***************************************!*\
  !*** ./app/models/LoaiPhong/model.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/LoaiPhong/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LoaiPhongSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('LoaiPhong', LoaiPhongSchema);

/***/ }),

/***/ "./app/models/LoaiPhong/schema.js":
/*!****************************************!*\
  !*** ./app/models/LoaiPhong/schema.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const schema = {
  tenLoaiPhong: {
    type: String,
    required: true,
    max: 30
  },
  giaPhong: {
    type: Number,
    required: true
  }
};
const options = {
  collections: 'loaiphongs'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/NhanVien/model.js":
/*!**************************************!*\
  !*** ./app/models/NhanVien/model.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/NhanVien/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const nhanVienSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('NhanVien', nhanVienSchema);

/***/ }),

/***/ "./app/models/NhanVien/schema.js":
/*!***************************************!*\
  !*** ./app/models/NhanVien/schema.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  hoNhanVien: {
    type: String,
    required: true,
    max: 30
  },
  tenNhanVien: {
    type: String,
    required: true,
    max: 20
  },
  anhDaiDien: {
    type: String,
    required: true
  },
  ngaySinh: {
    type: Date,
    required: true
  },
  gioiTinh: {
    type: Boolean,
    required: true,
    default: false
  },
  soCMND: {
    type: String,
    required: true,
    max: 11
  },
  soDienThoai: {
    type: String,
    max: 11
  },
  hoTenNguoiThan: {
    type: String,
    max: 50
  },
  diaChi: {
    type: String,
    required: true,
    max: 80
  },
  rolesGroupID: {
    ref: 'RoleGroup',
    type: _mongoose.Schema.Types.ObjectId
  },
  email: String,
  status: {
    type: Boolean,
    default: true
  }
};
const options = {
  collection: 'nhanviens'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/PhieuThuTien/dao.js":
/*!****************************************!*\
  !*** ./app/models/PhieuThuTien/dao.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (schema, options) {
  schema.statics.thongKePT = async function (payload) {
    let Model = this;
    let ngayBD = payload.ngayThongKe[0];
    let ngayKT = payload.ngayThongKe[1];

    if (payload.tieuChi === 'ptLap') {
      return await Model.find({
        ngayLap: {
          $gt: ngayBD,
          $lt: ngayKT
        }
      }).populate(['dsCTPT', {
        path: 'phongID',
        populate: ['khuPhongID']
      }]);
    }

    if (payload.tieuChi === 'ptKT') {
      return await Model.find({
        tinhTrangPhieuThu: 'quá hạn',
        ngayHetHan: {
          $gt: ngayBD,
          $lt: ngayKT
        }
      }).populate(['dsCTPT', {
        path: 'phongID',
        populate: ['khuPhongID']
      }]);
    }
  };
};

/***/ }),

/***/ "./app/models/PhieuThuTien/model.js":
/*!******************************************!*\
  !*** ./app/models/PhieuThuTien/model.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/PhieuThuTien/schema.js");

var _dao = __webpack_require__(/*! ./dao.js */ "./app/models/PhieuThuTien/dao.js");

var _dao2 = _interopRequireDefault(_dao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PhieuThuTienSchema = new _mongoose.Schema(_schema.schema, _schema.options);
PhieuThuTienSchema.virtual('dsCTPT', {
  ref: 'CTPhieuThuTien',
  localField: '_id',
  foreignField: 'phieuThuID'
});
PhieuThuTienSchema.plugin(_dao2.default);
exports.default = _mongoose2.default.model('PhieuThuTien', PhieuThuTienSchema);

/***/ }),

/***/ "./app/models/PhieuThuTien/schema.js":
/*!*******************************************!*\
  !*** ./app/models/PhieuThuTien/schema.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  _id: {
    type: String,
    required: true,
    length: 16
  },
  phongID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Phong'
  },
  ngayLap: {
    type: Date,
    required: true,
    default: Date.now()
  },
  ngayHetHan: {
    type: Date,
    required: true
  },
  moTa: {
    type: String
  },
  tinhTrangPhieuThu: {
    type: String,
    required: true,
    enum: ['chưa đóng', 'đã đóng', 'quá hạn']
  }
};
const options = {
  collection: 'phieuthutiens'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/PhieuTraPhong/dao.js":
/*!*****************************************!*\
  !*** ./app/models/PhieuTraPhong/dao.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (schema, options) {
  schema.statics.getPhongById = async function (idphong) {
    let Model = this;
    let phieutraphong = await Model.find({
      phongID: idphong
    });
    return phieutraphong[0];
  };
};

/***/ }),

/***/ "./app/models/PhieuTraPhong/model.js":
/*!*******************************************!*\
  !*** ./app/models/PhieuTraPhong/model.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _schema = __webpack_require__(/*! ./schema */ "./app/models/PhieuTraPhong/schema.js");

var _dao = __webpack_require__(/*! ./dao */ "./app/models/PhieuTraPhong/dao.js");

var _dao2 = _interopRequireDefault(_dao);

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PhieuTraPhongSchema = new _mongoose.Schema(_schema.schema, _schema.options);
PhieuTraPhongSchema.plugin(_dao2.default);
exports.default = _mongoose2.default.model('PhieuTraPhong', PhieuTraPhongSchema);

/***/ }),

/***/ "./app/models/PhieuTraPhong/schema.js":
/*!********************************************!*\
  !*** ./app/models/PhieuTraPhong/schema.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = {
  phongID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Phong'
  },
  khachThueID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'KhachThue'
  },
  ngayLap: {
    type: Date
  }
};
const options = {
  collection: 'PhieuTraPhong'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/Phong/dao.js":
/*!*********************************!*\
  !*** ./app/models/Phong/dao.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (schema, options) {
  schema.statics.SearchMultiple = async function (payload) {
    let Model = this;
    let queryString = {};

    if (payload.tenPhong) {
      queryString.tenPhong = {
        $regex: '.*' + payload.tenPhong + '.*'
      };
    }

    if (payload.khuPhongID) {
      queryString.khuPhongID = payload.khuPhongID;
    }

    if (payload.loaiPhongID) {
      queryString.loaiPhongID = payload.loaiPhongID;
    }

    if (payload.moTa) {
      queryString.moTa = {
        $regex: `.*${payload.moTa}.*`
      };
    }

    if (payload.soDien) {
      queryString.soDien = payload.soDien;
    }

    if (payload.soNuoc) {
      queryString.soNuoc = payload.soNuoc;
    }

    if (payload.dKMang) {
      queryString.dKMang = payload.dKMang;
    }

    if (payload.homeFlag) {
      queryString.homeFlag = payload.homeFlag;
    }

    if (payload.hotFlag) {
      queryString.hotFlag = payload.hotFlag;
    }

    if (payload.status) {
      queryString.status = payload.status;
    }

    let data = await Model.find(queryString).lean().populate('loaiPhongID').populate('khuPhongID').populate('tinhTrangPhongID');
    return data;
  };

  schema.statics.tracuuphongAdmin = async function (payload) {
    let Model = this;
    let queryString = {};
    let arrayLoaiPhong = [];

    if (payload.loaiPhong) {
      arrayLoaiPhong.push(payload.loaiPhong);
    }

    if (payload.giaPhong) {
      arrayLoaiPhong.push(payload.giaPhong);
    }

    if (payload.isMang) {
      queryString.dKMang = payload.isMang;
    }

    if (arrayLoaiPhong && arrayLoaiPhong.length > 0) {
      queryString.loaiPhongID = {
        $in: arrayLoaiPhong
      };
    }

    if (payload.tinhTrangPhongSelect && payload.tinhTrangPhongSelect.length > 0) {
      // lọc ra phòng có tình trạng theo yêu cầu
      queryString.tinhTrangPhongID = {
        $in: payload.tinhTrangPhongSelect
      };
    }

    let data = await Model.find(queryString).populate([{
      path: 'loaiPhongID'
    }, {
      path: 'khuPhongID',
      populate: ['dsPhong']
    }, {
      path: 'tinhTrangPhongID'
    }]).lean();
    return data;
  };

  schema.statics.tracuuphong = async function (payload) {
    let Model = this;
    let queryString = {};
    let arrayLoaiPhong = [];

    if (payload.loaiPhong) {
      arrayLoaiPhong.push(payload.loaiPhong);
    }

    if (payload.giaPhong) {
      arrayLoaiPhong.push(payload.giaPhong);
    }

    if (payload.isMang) {
      queryString.dKMang = payload.isMang;
    }

    if (arrayLoaiPhong && arrayLoaiPhong.length > 0) {
      queryString.loaiPhongID = {
        $in: arrayLoaiPhong
      };
    }

    if (payload.tinhTrangPhongSelect && payload.tinhTrangPhongSelect.length > 0) {
      // lọc ra phòng có tình trạn theo yêu cầu
      queryString.tinhTrangPhongID = {
        $in: payload.tinhTrangPhongSelect
      };
    }

    let options = {
      populate: [{
        path: 'loaiPhongID'
      }, {
        path: 'khuPhongID',
        populate: ['dsPhong']
      }, {
        path: 'tinhTrangPhongID'
      }],
      lean: true,
      limit: payload.pagination.rowsPerPage,
      page: payload.pagination.page
    };
    let data = await Model.paginate(queryString, options); //find().populate([{path:'loaiPhongID'},{path:'khuPhongID',populate:['dsPhong']},{path:'tinhTrangPhongID'}]).lean()

    return data;
  };
};

/***/ }),

/***/ "./app/models/Phong/model.js":
/*!***********************************!*\
  !*** ./app/models/Phong/model.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/Phong/schema.js");

var _dao = __webpack_require__(/*! ./dao */ "./app/models/Phong/dao.js");

var _dao2 = _interopRequireDefault(_dao);

var _mongoosePaginate = __webpack_require__(/*! mongoose-paginate */ "mongoose-paginate");

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PhongSchema = new _mongoose.Schema(_schema.schema, _schema.options);
PhongSchema.virtual('dsPhieuThu', {
  ref: 'PhieuThuTien',
  localField: '_id',
  foreignField: 'phongID'
});
PhongSchema.virtual('dsHopDong', {
  ref: 'HopDongThuePhong',
  localField: '_id',
  foreignField: 'phongID'
});
PhongSchema.plugin(_dao2.default);
PhongSchema.plugin(_mongoosePaginate2.default);
exports.default = _mongoose2.default.model('Phong', PhongSchema);

/***/ }),

/***/ "./app/models/Phong/schema.js":
/*!************************************!*\
  !*** ./app/models/Phong/schema.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = {
  tenPhong: {
    type: String,
    trim: true,
    max: 20,
    required: true
  },
  anhChinh: {
    type: String,
    required: true
  },
  anhChiTiet: {
    type: Array
  },
  moTa: {
    type: String
  },
  soDien: {
    type: Number,
    required: true
  },
  soNuoc: {
    type: Number,
    required: true
  },
  giaPhong: {
    type: Number,
    required: true
  },
  dKMang: {
    type: Boolean
  },
  status: Boolean,
  homeFlag: Boolean,
  hotFlag: Boolean,
  tinhTrangPhongID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'TinhTrangPhong'
  },
  khuPhongID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'KhuPhong'
  },
  loaiPhongID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'LoaiPhong'
  }
};
const options = {
  collection: 'phongs',
  virtuals: true
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/Role/model.js":
/*!**********************************!*\
  !*** ./app/models/Role/model.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema.js */ "./app/models/Role/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RoleSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('Role', RoleSchema);

/***/ }),

/***/ "./app/models/Role/schema.js":
/*!***********************************!*\
  !*** ./app/models/Role/schema.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const schema = {
  roleName: {
    type: String,
    required: true,
    max: 30
  }
};
const options = {
  collection: 'roles',
  virtuals: true
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/RoleGroup/model.js":
/*!***************************************!*\
  !*** ./app/models/RoleGroup/model.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema.js */ "./app/models/RoleGroup/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RoleGroupSchema = new _mongoose.Schema(_schema.schema, _schema.options);
RoleGroupSchema.virtual('dsNhanVien', {
  ref: 'NhanVien',
  // The model to use
  localField: '_id',
  // Find people where `localField`
  foreignField: 'rolesGroupID'
});
exports.default = _mongoose2.default.model('RoleGroup', RoleGroupSchema);

/***/ }),

/***/ "./app/models/RoleGroup/schema.js":
/*!****************************************!*\
  !*** ./app/models/RoleGroup/schema.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  nameRoleGroup: {
    type: String,
    required: true,
    max: 30
  },
  roles: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Role'
  }]
};
const options = {
  collections: 'rolegroups',
  virtuals: true
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/TinhTrangPhong/model.js":
/*!********************************************!*\
  !*** ./app/models/TinhTrangPhong/model.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/TinhTrangPhong/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TinhTrangPhongSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('TinhTrangPhong', TinhTrangPhongSchema);

/***/ }),

/***/ "./app/models/TinhTrangPhong/schema.js":
/*!*********************************************!*\
  !*** ./app/models/TinhTrangPhong/schema.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const schema = {
  tenTinhTrangPhong: {
    type: String,
    required: true,
    max: 20
  }
};
const options = {
  collection: 'tinhtrangphongs'
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/models/User/model.js":
/*!**********************************!*\
  !*** ./app/models/User/model.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = __webpack_require__(/*! ./schema */ "./app/models/User/schema.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = new _mongoose.Schema(_schema.schema, _schema.options);
exports.default = _mongoose2.default.model('User', userSchema);

/***/ }),

/***/ "./app/models/User/schema.js":
/*!***********************************!*\
  !*** ./app/models/User/schema.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = exports.schema = undefined;

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const schema = {
  userName: {
    type: String,
    required: true
  },
  passWord: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: ''
  },
  status: {
    type: Boolean,
    default: true // true: active, false: inactive

  },
  rolesGroupID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'RoleGroup'
  },
  nhanVienID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'NhanVien'
  },
  khachThueID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'KhachThue'
  }
};
const options = {
  collection: 'users',
  timestamps: true,
  virtuals: true
};
exports.schema = schema;
exports.options = options;

/***/ }),

/***/ "./app/modules/booking/controller/index.js":
/*!*************************************************!*\
  !*** ./app/modules/booking/controller/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mailBooking = __webpack_require__(/*! ../../../lib/basemail/mailBooking.js */ "./app/lib/basemail/mailBooking.js");

var _mailBooking2 = _interopRequireDefault(_mailBooking);

var _sendMail = __webpack_require__(/*! ../../../lib/basemail/sendMail.js */ "./app/lib/basemail/sendMail.js");

var _sendMail2 = _interopRequireDefault(_sendMail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Booking = _mongoose2.default.model('Booking');

const Phong = _mongoose2.default.model('Phong');

const get = async (request, h) => {
  try {
    return Booking.find().populate([{
      path: 'phongID',
      populate: [{
        path: 'loaiPhongID'
      }, {
        path: 'khuPhongID',
        populate: ['dsPhong']
      }, {
        path: 'tinhTrangPhongID'
      }]
    }]).lean();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const book = async (request, h) => {
  try {
    let data = request.payload;
    let booking = await Booking.create(data);
    let options = {
      subject: 'Kích hoạt đơn đặt phòng',
      text: 'Kích hoạt đơn đặt phòng',
      content: _mailBooking2.default.mailBooking(booking)
    };
    await _sendMail2.default.SenMail(options, booking.email);
    return booking;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const activeBooking = async (request, h) => {
  try {
    let booking = await Booking.findById(request.params.id);
    booking.status = true;
    await booking.save();
    let activeBooking = await Booking.findById(booking._id).populate([{
      path: 'phongID',
      populate: ['khuPhongID', 'loaiPhongID']
    }]);
    return activeBooking;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
}; // check số lượng khách đặt phòng theo id


const Check = async (request, h) => {
  try {
    let dsKhach = await Phong.findById({
      _id: request.params.id
    }).populate([{
      path: 'dsHopDong',
      populate: ['khachThueID']
    }]).lean();
    let dsKhachThue = dsKhach.dsHopDong.map(item => {
      return item.khachThueID;
    });
    let countPhong = dsKhachThue.filter(item => {
      for (let key of item.phongs) {
        if (String(key) === String(request.params.id)) {
          return item;
        }
      }
    });
    let dsBooking = await Booking.find({
      phongID: request.params.id,
      status: true
    }); // check số lượng khách đang ở là bao nhiêu && số lượng đang book dc active la bao nhiêu

    if (countPhong && dsBooking && dsBooking.length + countPhong.length >= 4) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  get,
  book,
  activeBooking,
  Check
};

/***/ }),

/***/ "./app/modules/booking/index.js":
/*!**************************************!*\
  !*** ./app/modules/booking/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index.js */ "./app/modules/booking/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_index2.default);
};

exports.name = 'admin-booking';

/***/ }),

/***/ "./app/modules/booking/routes/index.js":
/*!*********************************************!*\
  !*** ./app/modules/booking/routes/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index.js */ "./app/modules/booking/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index.js */ "./app/modules/booking/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/list-khach-dat-phong',
  handler: _index2.default.get,
  config: {
    tags: ['api'],
    description: 'lay danh sach cac khoan thu',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/check-so-luong-dat-{id}',
  handler: _index2.default.Check,
  config: {
    tags: ['api'],
    auth: false,
    validate: _index4.default.check,
    description: 'lay danh sach cac khoan thu',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/kich-hoat-phong-{id}',
  handler: _index2.default.activeBooking,
  config: {
    tags: ['api'],
    auth: false,
    validate: _index4.default.active,
    description: 'lay danh sach cac khoan thu',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/book-phong',
  handler: _index2.default.book,
  config: {
    tags: ['api'],
    auth: false,
    validate: _index4.default.book,
    description: 'dat phong',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/booking/validate/index.js":
/*!***********************************************!*\
  !*** ./app/modules/booking/validate/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(/*! joi */ "joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(_joi2.default);
const bookVal = {
  book: {
    payload: {
      hoNguoiBook: _joi2.default.string().required().max(20),
      tenNguoiBook: _joi2.default.string().required().max(10),
      email: _joi2.default.string().required().email(),
      soDienThoai: _joi2.default.string().required().max(12),
      soCMND: _joi2.default.string().required().max(11),
      diaChi: _joi2.default.string().required().max(100),
      phongID: _joi2.default.ObjectId(),
      ngayBookPhong: _joi2.default.date().required(),
      ngayNhanPhong: _joi2.default.date().required(),
      status: _joi2.default.boolean().required()
    }
  },
  check: {
    params: {
      id: _joi2.default.ObjectId()
    }
  },
  active: {
    params: {
      id: _joi2.default.ObjectId()
    }
  }
};
exports.default = { ...bookVal
};

/***/ }),

/***/ "./app/modules/cackhoanthu/controller/index.js":
/*!*****************************************************!*\
  !*** ./app/modules/cackhoanthu/controller/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const CacKhoanThu = Mongoose.model('CacKhoanThu');

const Boom = __webpack_require__(/*! boom */ "boom");

const save = async (request, h) => {
  try {
    let data = request.payload;
    let item = {};

    if (!data._id) {
      item = new CacKhoanThu(data);
    } else {
      item = await CacKhoanThu.findById({
        _id: data._id
      });
      item = Object.assign(item, data);
    }

    return await item.save();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

const getAll = async (request, h) => {
  try {
    return await CacKhoanThu.find();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

exports.default = {
  save,
  getAll
};

/***/ }),

/***/ "./app/modules/cackhoanthu/index.js":
/*!******************************************!*\
  !*** ./app/modules/cackhoanthu/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index */ "./app/modules/cackhoanthu/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_index2.default);
};

exports.name = 'cac-khoan-thu-admin';

/***/ }),

/***/ "./app/modules/cackhoanthu/routes/index.js":
/*!*************************************************!*\
  !*** ./app/modules/cackhoanthu/routes/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index */ "./app/modules/cackhoanthu/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/cackhoanthu/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/cackhoanthu',
  handler: _index2.default.getAll,
  config: {
    auth: false,
    tags: ['api'],
    description: 'lay danh sach cac khoan thu',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/cackhoanthu',
  handler: _index2.default.save,
  config: {
    tags: ['api'],
    description: 'them hoac sua cac khoan thu',
    validate: _index4.default.save,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/cackhoanthu/validate/index.js":
/*!***************************************************!*\
  !*** ./app/modules/cackhoanthu/validate/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(/*! joi */ "joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(_joi2.default);
const cacKhoanThuVal = {
  save: {
    payload: {
      _id: _joi2.default.string(),
      tenKhoanThu: _joi2.default.string().required().max(30),
      giaKhoanThu: _joi2.default.number(),
      donViTinh: _joi2.default.string().required().max(30)
    },
    options: {
      allowUnknown: true
    }
  }
};
exports.default = { ...cacKhoanThuVal
};

/***/ }),

/***/ "./app/modules/ctphieuthutien/controller/index.js":
/*!********************************************************!*\
  !*** ./app/modules/ctphieuthutien/controller/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const CTPhieuThuTien = Mongoose.model('CTPhieuThuTien');

const getAll = async (request, h) => {
  try {
    return await CTPhieuThuTien.find().populate([{
      path: 'cacKhoanThuID'
    }, {
      path: 'phieuThuID'
    }]);
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
}; // lấy thông tin theo mã phiếu thuư


const getById = async (request, h) => {
  try {
    return (await CTPhieuThuTien.find({
      phieuThuID: request.params.id
    }).populate([{
      path: 'cacKhoanThuID'
    }, {
      path: 'phieuThuID'
    }])) || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const save = async (request, h) => {
  try {
    let data = request.payload;
    let item = {};

    if (!data._id) {
      item = new CTPhieuThuTien(data);
    } else {
      item = await CTPhieuThuTien.findById({
        _id: data._id
      });
      item = Object.assign(item, data);
    }

    return await item.save();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  save,
  getAll,
  getById
};

/***/ }),

/***/ "./app/modules/ctphieuthutien/index.js":
/*!*********************************************!*\
  !*** ./app/modules/ctphieuthutien/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index */ "./app/modules/ctphieuthutien/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, option) => {
  server.route(_index2.default);
};

exports.name = 'chi-tiet-phieu-thu-admin';

/***/ }),

/***/ "./app/modules/ctphieuthutien/routes/index.js":
/*!****************************************************!*\
  !*** ./app/modules/ctphieuthutien/routes/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index */ "./app/modules/ctphieuthutien/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/ctphieuthutien/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/chitietphieuthu',
  handler: _index2.default.getAll,
  config: {
    tags: ['api'],
    description: 'lay tat ca cac chi tiet phieu thu',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/chitietphieuthu/{id}',
  handler: _index2.default.getById,
  config: {
    tags: ['api'],
    description: 'xem chi tiet phieu thu cua mot phieu thu',
    validate: _index4.default.getById,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/chitietphieuthu',
  handler: _index2.default.save,
  config: {
    tags: ['api'],
    description: 'them',
    validate: _index4.default.save,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/ctphieuthutien/validate/index.js":
/*!******************************************************!*\
  !*** ./app/modules/ctphieuthutien/validate/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

Joi.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(Joi);
const CTPhieuThuTienVal = {
  save: {
    payload: {
      _id: Joi.string(),
      phieuThuID: Joi.string(),
      tenDichVu: Joi.string().required(),
      chiSoCu: Joi.number(),
      chiSoMoi: Joi.number(),
      donGia: Joi.number(),
      cacKhoanThuID: Joi.ObjectId()
    },
    options: {
      allowUnknown: true
    }
  },
  getById: {
    params: {
      id: Joi.string()
    }
  }
};
exports.default = { ...CTPhieuThuTienVal
};

/***/ }),

/***/ "./app/modules/hopdongthue/controller/index.js":
/*!*****************************************************!*\
  !*** ./app/modules/hopdongthue/controller/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

var _sendMail = __webpack_require__(/*! ../../../lib/basemail/sendMail.js */ "./app/lib/basemail/sendMail.js");

var _sendMail2 = _interopRequireDefault(_sendMail);

var _mailHopDong = __webpack_require__(/*! ../../../lib/basemail/mailHopDong.js */ "./app/lib/basemail/mailHopDong.js");

var _mailHopDong2 = _interopRequireDefault(_mailHopDong);

var _mailHetHanHopDong = __webpack_require__(/*! ../../../lib/basemail/mailHetHanHopDong.js */ "./app/lib/basemail/mailHetHanHopDong.js");

var _mailHetHanHopDong2 = _interopRequireDefault(_mailHetHanHopDong);

var _translateCharacter = __webpack_require__(/*! ../../../lib/services/translateCharacter.js */ "./app/lib/services/translateCharacter.js");

var _translateCharacter2 = _interopRequireDefault(_translateCharacter);

var _index = __webpack_require__(/*! ../../user/controller/index.js */ "./app/modules/user/controller/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HopDongThuePhong = _mongoose2.default.model('HopDongThuePhong');

const KhachThue = _mongoose2.default.model('KhachThue');

const User = _mongoose2.default.model('User');

const Phong = _mongoose2.default.model('Phong'); //import translateCharacter from '../../../lib/services/translateCharacter.js'


const save = async (request, h) => {
  try {
    let data = request.payload;
    console.log('du lieu', data);
    let item = await HopDongThuePhong.findById(data._id);
    let khachThue = {};

    if (item) {
      item = Object.assign(item, data);
      await item.save();
    } else {
      item = new HopDongThuePhong(data);
      await item.save(); // sau khi lập hợp đồng thì thêm phòng đó vào khách thuê và sửa tình trạng khách từ chưa thuê sang đã thuê

      khachThue = await KhachThue.findById({
        _id: item.khachThueID
      });

      if (khachThue && !khachThue.phongs) {
        khachThue.phongs = [];
      }

      khachThue.phongs = khachThue.phongs.filter(key => key != String(item.phongID));
      khachThue.phongs = [...khachThue.phongs, ...[item.phongID]];
      khachThue.tinhTrangKhachThue = "Đang thuê"; // check xem khách này là có tài khoản hay chưa

      let checkHasUser = await User.findOne({
        khachThueID: khachThue._id
      });

      if (!checkHasUser) {
        // tạo tài khoản sử dụng cho khách và check mail mới kích hoạt tài khoản
        let user = {
          userName: (0, _translateCharacter2.default)(`${khachThue.hoKhachThue}${khachThue.tenKhachThue}${khachThue.soDienThoai}`),
          passWord: khachThue.soDienThoai,
          email: khachThue.email,
          status: false,
          rolesGroupID: '5cc565b39f49904f20b6211f',
          khachThueID: khachThue._id
        };
        await _index2.default.createAccountKT(user);
      }

      await khachThue.save(); // cập nhật tình trạng phòng đã thuê

      let phong = await Phong.findById({
        _id: item.phongID
      }).populate('tinhTrangPhongID'); // nếu chưa thuê sẽ đổi thành cho ở ghép

      if (phong.tinhTrangPhongID.id === "5c88669ffcd238559ca25d13") {
        phong.tinhTrangPhongID = "5c8866b6fcd238559ca25d15";
      } else if (phong.tinhTrangPhongID.id === "5c8866b6fcd238559ca25d15") {
        // kiểm tra số người đang ở trong phòng có bằng 4 hay không, nếu bằng thì chuyển sang đã thuê, không thì cho ở ghép
        let countHopDong = await HopDongThuePhong.find({
          phongID: item.phongID
        }).populate('khachThueID');
        let countKhachCurrent = countHopDong.reduce((so, x) => {
          if (x.khachThueID.phongs && x.khachThueID.phongs.length > 0) {
            for (let i of x.khachThueID.phongs) {
              if (String(i) === String(x.phongID)) {
                return so += 1;
              }
            }
          }

          return so;
        }, 0);

        if (countKhachCurrent && countKhachCurrent === 4) {
          phong.tinhTrangPhongID = "5c8866adfcd238559ca25d14";
        }
      }

      await phong.save();
    } // lấy hợp đồng để gởi mail


    let hopdong = await HopDongThuePhong.findById(item._id).populate([{
      path: 'khachThueID'
    }, {
      path: 'phongID',
      populate: ['khuPhongID', 'tinhTrangPhongID', 'loaiPhongID']
    }]);
    let options = {
      content: _mailHopDong2.default.mailHopDong(hopdong),
      subject: 'Hợp Đồng Thuê Phòng Trọ',
      text: 'Hợp Đồng Thuê Phòng Trọ'
    };

    _sendMail2.default.SenMail(options, khachThue.email);

    return hopdong;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const getAll = async (request, h) => {
  try {
    return await HopDongThuePhong.find().populate([{
      path: 'khachThueID'
    }, {
      path: 'phongID',
      populate: ['loaiPhongID', 'tinhTrangPhongID', 'khuPhongID']
    }]);
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const getById = async (request, h) => {
  try {
    return (await HopDongThuePhong.find({
      _id: request.params.id
    }).populate('khachThueID').populate('phongID')) || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const thongKeHD = async (request, h) => {
  try {
    let data = await HopDongThuePhong.thongKeHD(request.payload);
    return data || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const BaoHetHanHD = async (request, h) => {
  try {
    let data = request.payload.dsHD;

    for (let item of data) {
      let options = {
        content: _mailHetHanHopDong2.default.mailHetHanHopDong(item),
        subject: 'Báo Hết Hạn Hợp Đồng Thuê Phòng Trọ',
        text: 'Báo Hết Hạn Hợp Đồng Thuê Phòng Trọ'
      };

      _sendMail2.default.SenMail(options, item.khachThueID.email);
    }

    return true;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  getAll,
  getById,
  save,
  thongKeHD,
  BaoHetHanHD
};

/***/ }),

/***/ "./app/modules/hopdongthue/index.js":
/*!******************************************!*\
  !*** ./app/modules/hopdongthue/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _routes = __webpack_require__(/*! ./routes */ "./app/modules/hopdongthue/routes/index.js");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_routes2.default);
};

exports.name = 'hop-dong-thue-phong-admin';

/***/ }),

/***/ "./app/modules/hopdongthue/routes/index.js":
/*!*************************************************!*\
  !*** ./app/modules/hopdongthue/routes/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = __webpack_require__(/*! ../controller */ "./app/modules/hopdongthue/controller/index.js");

var _controller2 = _interopRequireDefault(_controller);

var _validate = __webpack_require__(/*! ../validate */ "./app/modules/hopdongthue/validate/index.js");

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/hopdongthuephong',
  handler: _controller2.default.getAll,
  config: {
    tags: ['api'],
    description: 'xem danh sach hop dong',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/hopdong-thongke',
  handler: _controller2.default.thongKeHD,
  config: {
    description: 'thống kê hợp đồng',
    validate: _validate2.default.thongKeHD,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/hopdongthuephong',
  handler: _controller2.default.save,
  config: {
    tags: ['api'],
    description: 'them va sua thong tin hop dong',
    validate: _validate2.default.save,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/hopdong-baohethan',
  handler: _controller2.default.BaoHetHanHD,
  config: {
    tags: ['api'],
    description: 'báo hết hạn hợp đồng',
    validate: _validate2.default.BaoHetHanHD,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/hopdongthuephong/{id}',
  handler: _controller2.default.getById,
  config: {
    tags: ['api'],
    description: 'xem thong tin 1 hop dong',
    validate: _validate2.default.getById,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/hopdongthue/validate/index.js":
/*!***************************************************!*\
  !*** ./app/modules/hopdongthue/validate/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(/*! joi */ "joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(_joi2.default);
const hopDongThueVal = {
  save: {
    payload: {
      _id: _joi2.default.string(),
      khachThueID: _joi2.default.ObjectId(),
      phongID: _joi2.default.ObjectId(),
      ngayKetThuc: _joi2.default.date(),
      ngayLap: _joi2.default.date()
    },
    options: {
      allowUnknown: true
    }
  },
  get: {
    params: {
      id: _joi2.default.string().required()
    }
  },
  delete: {
    params: {
      id: _joi2.default.string().required()
    }
  },
  thongKeHD: {
    payload: {
      ngayThongKe: _joi2.default.array().required(),
      tieuChi: _joi2.default.string().required()
    }
  },
  BaoHetHanHD: {
    payload: {
      dsHD: _joi2.default.array().required()
    }
  }
};
exports.default = { ...hopDongThueVal
};

/***/ }),

/***/ "./app/modules/khachthue/controller/index.js":
/*!***************************************************!*\
  !*** ./app/modules/khachthue/controller/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fs = __webpack_require__(/*! fs */ "fs");

const KhachThue = _mongoose2.default.model('KhachThue');

const Phong = _mongoose2.default.model('Phong');

const save = async (request, h) => {
  try {
    let data = request.payload;
    let item = {};

    if (!data._id) {
      if (data.anhDaiDien.name === null || data.anhDaiDien.name === "" || data.anhDaiDien.name === undefined) {
        data.anhDaiDien = "avatar.png";
      } else {
        let anhDaiDien64 = data.anhDaiDien.file64.replace(/^data(.*?)base64,/, "");
        fs.writeFile(`app/lib/images/${data.anhDaiDien.name}`, anhDaiDien64, 'base64', function (err) {
          return err;
        });
        data.anhDaiDien = data.anhDaiDien.name;
      }

      item = new KhachThue(data);
    } else {
      if (data.anhDaiDien.name === null || data.anhDaiDien.name === "" || data.anhDaiDien.name === undefined) {
        item = await KhachThue.findById({
          _id: data._id
        });
        data.anhDaiDien = item.anhDaiDien;
        item = Object.assign(item, data);
      } else {
        let anhDaiDien64 = data.anhDaiDien.file64.replace(/^data(.*?)base64,/, "");
        fs.writeFile(`app/lib/images/${data.anhDaiDien.name}`, anhDaiDien64, 'base64', function (err) {
          return err;
        });
        data.anhDaiDien = data.anhDaiDien.name;
        item = await KhachThue.findById({
          _id: data._id
        });
        item = Object.assign(item, data);
      }
    }

    await item.save();

    let khachThue = (await KhachThue.findById({
      _id: item._id
    }).populate('loaiKhachThueID')) || _boom2.default.notFound();

    return khachThue;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const getAll = async (request, h) => {
  try {
    return (await KhachThue.find().populate('loaiKhachThueID')) || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const deleteKhachThue = async (request, h) => {
  try {
    return (await KhachThue.findOneAndDelete({
      _id: request.params.id
    })) || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const search = async (request, h) => {
  try {
    let data = request.payload;

    if (request.params.isReal === true) {
      let items = await KhachThue.find(data).populate('loaiKhachThueID');
      return items;
    } else {
      let items = await KhachThue.searchMultiple(data);
      return items;
    }
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const getByDT = async (request, h) => {
  try {
    return (await KhachThue.find({
      soDienThoai: request.params.sdt
    }).populate('loaiKhachThueID')) || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const getByID = async (request, h) => {
  try {
    let khachThue = (await KhachThue.findById({
      _id: request.params.id
    }).populate('loaiKhachThueID')) || _boom2.default.notFound();

    let dsPhong = [];

    for (let item of khachThue.phongs) {
      let phong = await Phong.findById({
        _id: item
      }).populate(['loaiPhongID', 'khuPhongID', 'tinhTrangPhongID', {
        path: 'dsHopDong',
        populate: [{
          path: 'khachThueID',
          populate: ['loaiKhachThueID']
        }]
      }, {
        path: 'dsPhieuThu',
        populate: [{
          path: 'dsCTPT',
          populate: ['cacKhoanThuID']
        }]
      }]).lean();
      dsPhong.push(phong);
    }

    return {
      khachThue,
      phong: dsPhong
    };
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const put = async (request, h) => {
  try {
    let khachThue = await KhachThue.findById({
      _id: request.params.id
    });
    khachThue = Object.assign(khachThue, request.payload);
    return await khachThue.save();
  } catch (err) {
    return _boom2.default.forbidden();
  }
};

const themTuBook = async (request, h) => {
  try {
    let data = request.payload;
    data.tinhTrangKhachThue = 'Chưa thuê';
    data.anhDaiDien = 'avatar.png';
    return await KhachThue.create(data);
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  save,
  getAll,
  deleteKhachThue,
  search,
  getByDT,
  put,
  getByID,
  themTuBook
};

/***/ }),

/***/ "./app/modules/khachthue/index.js":
/*!****************************************!*\
  !*** ./app/modules/khachthue/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index */ "./app/modules/khachthue/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_index2.default);
};

exports.name = 'khach-thue-admin';

/***/ }),

/***/ "./app/modules/khachthue/routes/index.js":
/*!***********************************************!*\
  !*** ./app/modules/khachthue/routes/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index */ "./app/modules/khachthue/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/khachthue/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/khachthue',
  handler: _index2.default.getAll,
  config: {
    tags: ['api'],
    description: 'lay danh sach khach thue',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/khachthue/sdt={sdt}',
  handler: _index2.default.getByDT,
  config: {
    tags: ['api'],
    validate: _index4.default.getByDT,
    description: 'lay thong tin khach by so dien thoai',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/khachthue/id={id}',
  handler: _index2.default.getByID,
  config: {
    tags: ['api'],
    validate: _index4.default.get,
    description: 'lay thong tin khach by so dien thoai',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/khachthue',
  handler: _index2.default.save,
  config: {
    description: 'them va sua khach thue',
    tags: ['api'],
    validate: _index4.default.save,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/khachthue-them-book',
  handler: _index2.default.themTuBook,
  config: {
    description: 'them từ đặt phòng',
    tags: ['api'],
    validate: _index4.default.themTuBook,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/khachthuetimkiem/chinhxac={isReal}',
  handler: _index2.default.search,
  config: {
    description: 'im kiem khach thue',
    tags: ['api'],
    validate: _index4.default.search,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'PUT',
  path: '/khachthue/{id}',
  handler: _index2.default.put,
  config: {
    description: 'cập nhật tình trạng',
    tags: ['api'],
    validate: _index4.default.put,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/khachthue/{id}',
  handler: _index2.default.deleteKhachThue,
  config: {
    tags: ['api'],
    description: 'xoa thong tin khach thue',
    validate: _index4.default.delete,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/khachthue/validate/index.js":
/*!*************************************************!*\
  !*** ./app/modules/khachthue/validate/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

Joi.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(Joi);
const khachThueVal = {
  save: {
    payload: {
      _id: Joi.string().length(24),
      hoKhachThue: Joi.string().required().max(30),
      tenKhachThue: Joi.string().required().max(20),
      anhDaiDien: Joi.object(),
      ngaySinh: Joi.date().required(),
      gioiTinh: Joi.boolean().required(),
      soCMND: Joi.string().required().max(11),
      soDienThoai: Joi.string().required().max(13),
      hoTenNguoiThan: Joi.string().required().max(50),
      diaChi: Joi.string().required().max(80),
      loaiKhachThueID: Joi.ObjectId(),
      tinhTrangKhachThue: Joi.string().required(),
      email: Joi.string().email()
    },
    options: {
      allowUnknown: true
    }
  },
  put: {
    payload: {
      _id: Joi.string().length(24),
      hoKhachThue: Joi.string().required().max(30),
      tenKhachThue: Joi.string().required().max(20),
      anhDaiDien: Joi.string(),
      ngaySinh: Joi.date().required(),
      gioiTinh: Joi.boolean().required(),
      soCMND: Joi.string().required().max(11),
      soDienThoai: Joi.string().required().max(11),
      hoTenNguoiThan: Joi.string().required().max(50),
      diaChi: Joi.string().required().max(80),
      loaiKhachThueID: Joi.ObjectId(),
      tinhTrangKhachThue: Joi.string().required(),
      email: Joi.string().email()
    },
    params: {
      id: Joi.string().length(24)
    },
    options: {
      allowUnknown: true
    }
  },
  search: {
    params: {
      isReal: Joi.boolean()
    },
    payload: {
      hoKhachThue: Joi.string(),
      tenKhachThue: Joi.string(),
      ngaySinh: Joi.date(),
      gioiTinh: Joi.boolean(),
      soCMND: Joi.string(),
      soDienThoai: Joi.string(),
      hoTenNguoiThan: Joi.string(),
      diaChi: Joi.string(),
      loaiKhachThueID: Joi.ObjectId(),
      tinhTrangKhachThue: Joi.string(),
      email: Joi.string()
    }
  },
  get: {
    params: {
      id: Joi.ObjectId()
    }
  },
  delete: {
    params: {
      id: Joi.ObjectId()
    }
  },
  getByDT: {
    params: {
      sdt: Joi.string().required()
    }
  },
  themTuBook: {
    payload: {
      hoKhachThue: Joi.string().required().max(30),
      tenKhachThue: Joi.string().required().max(20),
      email: Joi.string().email(),
      soDienThoai: Joi.string().required().max(11),
      soCMND: Joi.string().required().max(11),
      diaChi: Joi.string().required().max(80)
    }
  }
};
exports.default = { ...khachThueVal
};

/***/ }),

/***/ "./app/modules/khuphong/controller/index.js":
/*!**************************************************!*\
  !*** ./app/modules/khuphong/controller/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const Boom = __webpack_require__(/*! boom */ "boom");

const KhuPhong = Mongoose.model('KhuPhong');

exports.getAll = async (request, h) => {
  try {
    return await KhuPhong.find().populate([{
      path: 'dsPhong',
      populate: ['dsPhieuThu']
    }]).lean();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

exports.getById = async (request, h) => {
  try {
    return (await KhuPhong.findById({
      _id: request.params.id
    })) || Boom.notFound();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

exports.create = async (request, h) => {
  try {
    return await KhuPhong.create(request.payload);
  } catch (err) {
    return Boom.forbidden(err);
  }
};

exports.update = async (request, h) => {
  try {
    let {
      tenKhuPhong,
      anhKhuPhong,
      moTa
    } = request.payload;
    const item = await KhuPhong.findOneAndUpdate({
      _id: request.params.id
    }, {
      tenKhuPhong,
      anhKhuPhong,
      moTa
    });
    return item || Boom.notFound();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

exports.delete = async (request, h) => {
  try {
    return (await KhuPhong.findOneAndRemove({
      _id: request.params.id
    })) || Boom.notFound();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

/***/ }),

/***/ "./app/modules/khuphong/index.js":
/*!***************************************!*\
  !*** ./app/modules/khuphong/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index.js */ "./app/modules/khuphong/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_index2.default);
};

exports.name = 'admin-khuphong';

/***/ }),

/***/ "./app/modules/khuphong/routes/index.js":
/*!**********************************************!*\
  !*** ./app/modules/khuphong/routes/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index */ "./app/modules/khuphong/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/khuphong/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _https = __webpack_require__(/*! https */ "https");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/khuphong',
  handler: _index2.default.getAll,
  config: {
    description: 'danh sach khu phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/khuphong/{id}',
  handler: _index2.default.getById,
  config: {
    validate: _index4.default.get,
    description: 'xem thong tin phong by id',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/khuphong',
  handler: _index2.default.create,
  config: {
    validate: _index4.default.create,
    description: 'tao moi khu phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'PUT',
  path: '/khuphong/{id}',
  handler: _index2.default.update,
  config: {
    validate: _index4.default.update,
    description: 'cap nhat khu phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/khuphong/{id}',
  handler: _index2.default.delete,
  config: {
    validate: _index4.default.delete,
    description: 'xoa khu phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/khuphong/validate/index.js":
/*!************************************************!*\
  !*** ./app/modules/khuphong/validate/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

Joi.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(Joi);
const khuPhongVal = {
  create: {
    payload: {
      tenKhuPhong: Joi.string().required().max(20),
      anhKhuPhong: Joi.string(),
      moTa: Joi.string()
    }
  },
  update: {
    params: {
      id: Joi.ObjectId()
    },
    payload: {
      tenKhuPhong: Joi.string().required().max(20),
      anhKhuPhong: Joi.string(),
      moTa: Joi.string()
    }
  },
  delete: {
    params: {
      id: Joi.ObjectId()
    }
  },
  get: {
    params: {
      id: Joi.ObjectId()
    }
  }
};
exports.default = { ...khuPhongVal
};

/***/ }),

/***/ "./app/modules/lienhe/controller/index.js":
/*!************************************************!*\
  !*** ./app/modules/lienhe/controller/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LienHe = _mongoose2.default.model('LienHe');

const save = async (request, h) => {
  try {
    return await LienHe.create(request.payload);
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  save
};

/***/ }),

/***/ "./app/modules/lienhe/index.js":
/*!*************************************!*\
  !*** ./app/modules/lienhe/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index.js */ "./app/modules/lienhe/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_index2.default);
};

exports.name = "lien-he";

/***/ }),

/***/ "./app/modules/lienhe/routes/index.js":
/*!********************************************!*\
  !*** ./app/modules/lienhe/routes/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index.js */ "./app/modules/lienhe/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index.js */ "./app/modules/lienhe/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'POST',
  path: '/dat-lien-he',
  handler: _index2.default.save,
  config: {
    auth: false,
    tags: ['api'],
    validate: _index4.default.save,
    description: 'lay danh sach cac khoan thu',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/lienhe/validate/index.js":
/*!**********************************************!*\
  !*** ./app/modules/lienhe/validate/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(/*! joi */ "joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(_joi2.default);
const lienHeVal = {
  save: {
    payload: {
      hoTenNguoiLienHe: _joi2.default.string().required().max(50),
      email: _joi2.default.string().email().required(),
      soDienThoai: _joi2.default.string(),
      phongID: _joi2.default.ObjectId()
    }
  }
};
exports.default = { ...lienHeVal
};

/***/ }),

/***/ "./app/modules/loaikhacthue/controller/index.js":
/*!******************************************************!*\
  !*** ./app/modules/loaikhacthue/controller/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LoaiKhachThue = _mongoose2.default.model('LoaiKhachThue');

const getAll = async (request, h) => {
  try {
    return (await LoaiKhachThue.find()) || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const save = async (request, h) => {
  try {
    let data = request.payload;
    let item = {};

    if (!data._id) {
      item = new LoaiKhachThue(data);
    } else {
      item = await LoaiKhachThue.findById(data._id);
      item = Object.assign(item, data);
    }

    await item.save();
    return item;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  getAll,
  save
};

/***/ }),

/***/ "./app/modules/loaikhacthue/index.js":
/*!*******************************************!*\
  !*** ./app/modules/loaikhacthue/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _routes = __webpack_require__(/*! ./routes */ "./app/modules/loaikhacthue/routes/index.js");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_routes2.default);
};

exports.name = 'loai-khach-thue-admin';

/***/ }),

/***/ "./app/modules/loaikhacthue/routes/index.js":
/*!**************************************************!*\
  !*** ./app/modules/loaikhacthue/routes/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = __webpack_require__(/*! ../controller */ "./app/modules/loaikhacthue/controller/index.js");

var _controller2 = _interopRequireDefault(_controller);

var _validate = __webpack_require__(/*! ../validate */ "./app/modules/loaikhacthue/validate/index.js");

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/loaikhachthue',
  handler: _controller2.default.getAll,
  config: {
    description: 'lay danh sach loai khach thue',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/loaikhachthue',
  handler: _controller2.default.save,
  config: {
    description: 'them va sua loai khach thue',
    tags: ['api'],
    validate: _validate2.default.save,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/loaikhacthue/validate/index.js":
/*!****************************************************!*\
  !*** ./app/modules/loaikhacthue/validate/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(/*! joi */ "joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(_joi2.default);
const loaiKhachThueVal = {
  get: {
    params: {
      id: _joi2.default.ObjectId()
    }
  },
  save: {
    payload: {
      _id: _joi2.default.string(),
      tenLoaiKhachThue: _joi2.default.string().required().max(30)
    }
  }
};
exports.default = { ...loaiKhachThueVal
};

/***/ }),

/***/ "./app/modules/loaiphong/controller/index.js":
/*!***************************************************!*\
  !*** ./app/modules/loaiphong/controller/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Mongoose = __webpack_require__(/*! mongoose */ "mongoose");

const LoaiPhong = Mongoose.model('LoaiPhong');

const Boom = __webpack_require__(/*! boom */ "boom");

const getAll = async (request, h) => {
  try {
    return await LoaiPhong.find();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

const getById = async (request, h) => {
  try {
    return (await LoaiPhong.findById({
      _id: request.params.id
    })) || Boom.notFound();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

const create = async (request, h) => {
  try {
    return await LoaiPhong.create(request.payload);
  } catch (err) {
    return Boom.forbidden(err);
  }
};

const update = async (request, h) => {
  try {
    let {
      tenLoaiPhong,
      giaPhong
    } = request.payload;
    const item = await LoaiPhong.findOneAndUpdate({
      _id: request.params.id
    }, {
      tenLoaiPhong,
      giaPhong
    });
    return item || Boom.notFound();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

const deleteLoaiPhong = async (request, h) => {
  try {
    return (await LoaiPhong.findOneAndRemove({
      _id: request.params.id
    })) || Boom.notFound();
  } catch (err) {
    return Boom.forbidden(err);
  }
};

exports.default = {
  getAll,
  getById,
  create,
  update,
  deleteLoaiPhong
};

/***/ }),

/***/ "./app/modules/loaiphong/index.js":
/*!****************************************!*\
  !*** ./app/modules/loaiphong/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index */ "./app/modules/loaiphong/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_index2.default);
};

exports.name = 'admin-loaiphong';

/***/ }),

/***/ "./app/modules/loaiphong/routes/index.js":
/*!***********************************************!*\
  !*** ./app/modules/loaiphong/routes/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index */ "./app/modules/loaiphong/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/loaiphong/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/loaiphong',
  handler: _index2.default.getAll,
  config: {
    auth: false,
    description: 'xem danh sach loai phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/loaiphong/{id}',
  handler: _index2.default.getById,
  config: {
    validate: _index4.default.get,
    description: 'xem thong tin loai phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/loaiphong',
  handler: _index2.default.create,
  config: {
    validate: _index4.default.create,
    description: 'them loai phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'PUT',
  path: '/loaiphong/{id}',
  handler: _index2.default.update,
  config: {
    validate: _index4.default.update,
    description: 'cap nhat thong tin loai phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/loaiphong/{id}',
  handler: _index2.default.deleteLoaiPhong,
  config: {
    validate: _index4.default.delete,
    description: 'xoa loai phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/loaiphong/validate/index.js":
/*!*************************************************!*\
  !*** ./app/modules/loaiphong/validate/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

Joi.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(Joi);
const LoaiPhongVal = {
  create: {
    payload: {
      tenLoaiPhong: Joi.string().required().max(30),
      giaPhong: Joi.number().required()
    }
  },
  update: {
    params: {
      id: Joi.ObjectId()
    },
    payload: {
      tenLoaiPhong: Joi.string().required().max(30),
      giaPhong: Joi.number().required()
    }
  },
  get: {
    params: {
      id: Joi.ObjectId()
    }
  },
  delete: {
    params: {
      id: Joi.ObjectId()
    }
  }
};
exports.default = { ...LoaiPhongVal
};

/***/ }),

/***/ "./app/modules/nhanvien/controller/index.js":
/*!**************************************************!*\
  !*** ./app/modules/nhanvien/controller/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

var _translateCharacter = __webpack_require__(/*! ../../../lib/services/translateCharacter.js */ "./app/lib/services/translateCharacter.js");

var _translateCharacter2 = _interopRequireDefault(_translateCharacter);

var _index = __webpack_require__(/*! ../../user/controller/index.js */ "./app/modules/user/controller/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fs = __webpack_require__(/*! fs */ "fs");

const NhanVien = _mongoose2.default.model('NhanVien');

const Account = _mongoose2.default.model('User');

const save = async (request, h) => {
  try {
    // if(request.pre.isRoles) {
    let data = request.payload;
    let item = {};

    if (!data._id) {
      let anhDaiDien64 = data.anhDaiDien.file64.replace(/^data(.*?)base64,/, "");
      fs.writeFile(`app/lib/images/${data.anhDaiDien.name}`, anhDaiDien64, 'base64', function (err) {
        return err;
      });
      data.anhDaiDien = data.anhDaiDien.name;
      item = new NhanVien(data); // chỗ này chưa check trường hợp nếu nhân viên đó vừa là khách thì tài khoản sẽ trùng??

      let user = {
        userName: (0, _translateCharacter2.default)(`nhanvien${item.hoNhanVien}${item.tenNhanVien}${item.soDienThoai}`),
        passWord: item.soDienThoai,
        email: item.email,
        status: item.status,
        rolesGroupID: item.rolesGroupID,
        nhanVienID: item._id
      };
      await _index2.default.createAccountNV(user);
    } else {
      if (data.anhDaiDien.name === null || data.anhDaiDien.name === "" || data.anhDaiDien.name === undefined) {
        item = await NhanVien.findById({
          _id: data._id
        }); // kiểm tra thử có sửa quyền của tài khoản nhân viên hay không

        if (String(data.rolesGroupID) !== String(item.rolesGroupID)) {
          let account = await Account.findOne({
            nhanVienID: item._id
          });

          if (account) {
            account.rolesGroupID = data.rolesGroupID;
            await account.save();
          }
        }

        data.anhDaiDien = item.anhDaiDien;
        item = Object.assign(item, data);
      } else {
        let anhDaiDien64 = data.anhDaiDien.file64.replace(/^data(.*?)base64,/, "");
        fs.writeFile(`app/lib/images/${data.anhDaiDien.name}`, anhDaiDien64, 'base64', function (err) {
          return err;
        });
        data.anhDaiDien = data.anhDaiDien.name; // kiểm tra thử có sửa quyền của tài khoản nhân viên hay không

        if (String(data.rolesGroupID) !== String(item.rolesGroupID)) {
          let account = await Account.findOne({
            nhanVienID: item._id
          });

          if (account) {
            account.rolesGroupID = data.rolesGroupID;
            await account.save();
          }
        }

        item = await NhanVien.findById({
          _id: data._id
        });
        item = Object.assign(item, data);
      }
    }

    await item.save();

    let nhanVien = (await NhanVien.findById({
      _id: item._id
    }).populate('rolesGroupID')) || _boom2.default.notFound();

    return nhanVien; // }
    // else {
    //   return h.response({message:'Not allowed'})
    // }
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const getAll = async (request, h) => {
  try {
    // if(request.pre.isRoles) {
    return (await NhanVien.find().populate('rolesGroupID')) || _boom2.default.notFound(); // }
    // else {
    //   return h.response({message:'Not allowed'})
    // }
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  save,
  getAll
};

/***/ }),

/***/ "./app/modules/nhanvien/index.js":
/*!***************************************!*\
  !*** ./app/modules/nhanvien/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index.js */ "./app/modules/nhanvien/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_index2.default);
};

exports.name = "nhan-vien-app";

/***/ }),

/***/ "./app/modules/nhanvien/routes/index.js":
/*!**********************************************!*\
  !*** ./app/modules/nhanvien/routes/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index */ "./app/modules/nhanvien/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/nhanvien/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

var _checkQuyen = __webpack_require__(/*! ../../../lib/services/checkQuyen.js */ "./app/lib/services/checkQuyen.js");

var _checkQuyen2 = _interopRequireDefault(_checkQuyen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/nhanvien',
  handler: _index2.default.getAll,
  config: {
    tags: ['api'],
    description: 'lay danh sach nhan vien',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/nhanvien',
  handler: _index2.default.save,
  config: {
    description: 'them va sua nhan vien',
    tags: ['api'],
    validate: _index4.default.save,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/nhanvien/validate/index.js":
/*!************************************************!*\
  !*** ./app/modules/nhanvien/validate/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

Joi.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(Joi);
const nhanVienVal = {
  save: {
    payload: {
      _id: Joi.string().length(24),
      hoNhanVien: Joi.string().required(),
      tenNhanVien: Joi.string().required().max(20),
      anhDaiDien: Joi.object(),
      ngaySinh: Joi.date().required(),
      gioiTinh: Joi.boolean().required(),
      soCMND: Joi.string().required().max(11),
      soDienThoai: Joi.string().required().max(11),
      hoTenNguoiThan: Joi.string().required().max(50),
      diaChi: Joi.string().required().max(80),
      rolesGroupID: Joi.ObjectId(),
      email: Joi.string().email(),
      status: Joi.boolean().default(true)
    },
    options: {
      allowUnknown: true
    }
  },
  put: {
    payload: {
      _id: Joi.string().length(24),
      hoNhanVien: Joi.string().required(),
      tenNhanVien: Joi.string().required().max(20),
      anhDaiDien: Joi.string(),
      ngaySinh: Joi.date().required(),
      gioiTinh: Joi.boolean().required(),
      soCMND: Joi.string().required().max(11),
      soDienThoai: Joi.string().required().max(11),
      hoTenNguoiThan: Joi.string().required().max(50),
      diaChi: Joi.string().required().max(80),
      ChucVu: Joi.ObjectId(),
      email: Joi.string().email(),
      status: Joi.boolean().default(true)
    },
    params: {
      id: Joi.string().length(24)
    },
    options: {
      allowUnknown: true
    }
  },
  get: {
    params: {
      id: Joi.ObjectId()
    }
  },
  delete: {
    params: {
      id: Joi.ObjectId()
    }
  },
  getByDT: {
    params: {
      sdt: Joi.string().required()
    }
  }
};
exports.default = { ...nhanVienVal
};

/***/ }),

/***/ "./app/modules/phieuthutien/controller/index.js":
/*!******************************************************!*\
  !*** ./app/modules/phieuthutien/controller/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

var _moment = __webpack_require__(/*! moment */ "moment");

var _moment2 = _interopRequireDefault(_moment);

var _mailPhieuThuTien = __webpack_require__(/*! ../../../lib/basemail/mailPhieuThuTien.js */ "./app/lib/basemail/mailPhieuThuTien.js");

var _mailPhieuThuTien2 = _interopRequireDefault(_mailPhieuThuTien);

var _sendMail = __webpack_require__(/*! ../../../lib/basemail/sendMail.js */ "./app/lib/basemail/sendMail.js");

var _sendMail2 = _interopRequireDefault(_sendMail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const paypal = __webpack_require__(/*! paypal-rest-sdk */ "paypal-rest-sdk");

paypal.configure({
  'mode': 'sandbox',
  //sandbox or live
  'client_id': global.CONFIG.get('web.paypal.clientId'),
  'client_secret': global.CONFIG.get('web.paypal.secretPayPal')
});

const PhieuThuTien = _mongoose2.default.model('PhieuThuTien');

const Phong = _mongoose2.default.model('Phong');

const CTPhieuThuTien = _mongoose2.default.model('CTPhieuThuTien');

const CacKhoanThu = _mongoose2.default.model('CacKhoanThu');

const HopDongThue = _mongoose2.default.model('HopDongThuePhong');

let TotalCTPT = 0;

const getAll = async (request, h) => {
  try {
    return await PhieuThuTien.find().populate(['phongID', 'dsCTPT']).lean();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
}; // hàm lập phiếu thu và kèm theo là sửa phiếu thu


const save = async (request, h) => {
  try {
    let data = request.payload;
    let item = {};

    if (!data._id) {
      let phong = await Phong.findById({
        _id: data.phongID
      }).populate('khuPhongID');
      let soKhuPhong = phong.khuPhongID.tenKhuPhong.split(' ');
      let soPhong = phong.tenPhong.split(' ');
      let ngaylap = new Date(data.ngayLap); //'04-28-2019')

      data.ngayLap = ngaylap;
      let getThangNam = (0, _moment2.default)(ngaylap).format('MMYYYY'); // ngày hết hạn là ngày 10 của tháng tiếp theo: số 11 ở cuối vì chênh lệch múi giờ sẽ giảm xuống 10

      data.ngayHetHan = new Date(`${ngaylap.getFullYear()}-${ngaylap.getMonth() + 2 > 12 ? '01' : ngaylap.getMonth() + 2}-11`); // mã phiểu thu gồm: PT + số phòng + số khu phòng + tháng và năm tạo

      data._id = `PTP${soPhong[1]}KV${soKhuPhong[2]}${getThangNam}`;
      data.tinhTrangPhieuThu = 'chưa đóng';
      phong.soDien = data.soDienMoi;
      phong.soNuoc = data.soNuocMoi;
      let {
        _id,
        phongID,
        ngayLap,
        ngayHetHan,
        moTa,
        tinhTrangPhieuThu
      } = data;
      await phong.save();
      item = new PhieuThuTien({
        _id,
        phongID,
        ngayLap,
        ngayHetHan,
        moTa,
        tinhTrangPhieuThu
      }); //tiếp theo sẽ tạo chi tiết phiếu thu và thêm vào DB

      let tienDien = await CacKhoanThu.findById({
        _id: '5c983b7d28aebc66041a45aa'
      });
      let tienNuoc = await CacKhoanThu.findById({
        _id: '5c983b9b28aebc66041a45ab'
      });
      let tienMang = await CacKhoanThu.findById({
        _id: '5c983bf228aebc66041a45ac'
      });
      let tienThu = [{
        phieuThuID: item.id,
        cacKhoanThuID: '5c9b3dc77e5bed22acc4811a',
        donGia: phong.giaPhong
      }, {
        phieuThuID: item.id,
        chiSoCu: data.soDien,
        chiSoMoi: data.soDienMoi,
        donGia: tienDien.giaKhoanThu,
        cacKhoanThuID: tienDien._id
      }, {
        phieuThuID: item.id,
        chiSoCu: data.soNuoc,
        chiSoMoi: data.soNuocMoi,
        donGia: tienNuoc.giaKhoanThu,
        cacKhoanThuID: tienNuoc._id
      }];

      if (phong.dKMang === true) {
        tienThu.push({
          phieuThuID: item.id,
          donGia: tienMang.giaKhoanThu,
          cacKhoanThuID: tienMang._id
        });
      }

      for (let ctPT of tienThu) {
        await CTPhieuThuTien.create(ctPT);
      }
    } else {
      item = await PhieuThuTien.findById({
        _id: data._id
      });
      item = Object.assign(item, data);
    }

    let phieuthu = await item.save();
    let phieuthuMail = await PhieuThuTien.findById({
      _id: phieuthu._id
    }).populate(['phongID', 'dsCTPT']); // lấy ra hợp đồng của phòng có phiếu thu và lọc ra email khách thuê đang ở phòng này để gởi mail

    /*let hopDong = await HopDongThue.find({phongID: phieuthuMail.phongID}).populate('khachThueID')
    let mailKhachThues = hopDong.filter(item => {
      if(item.khachThueID.phongs && item.khachThueID.phongs.length > 0) {
        let a = false
        for( let i of item.khachThueID.phongs) {
          if(String(i) === String(item.phongID)) {
            a = true
            break
          }
        }
        if( a === true) {
          return item
        }
        else {
          return null
        }
      }
    }).map(key => {
      return key.khachThueID.email
    })
    let stringEmail = ""
    for(let str of mailKhachThues) {
      stringEmail += str + ', '
    }*/

    let options = {
      content: _mailPhieuThuTien2.default.mailPhieuThuTien(phieuthuMail),
      subject: phieuthuMail.tinhTrangPhieuThu === 'chưa đóng' ? 'Phiếu Báo Hóa Đơn' : 'Phiếu Thanh Toán',
      text: phieuthuMail.tinhTrangPhieuThu === 'chưa đóng' ? 'Phiếu Báo Hóa Đơn' : 'Phiếu Thanh Toán'
    };
    let stringEmail = await GetEmailOfKhach(phieuthuMail.phongID);

    _sendMail2.default.SenMail(options, stringEmail);

    return phieuthu;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
}; // hàm gới mail thông tin của 1 phiếu thu


const sendMail = async (request, h) => {
  try {
    let phieuthuMail = await PhieuThuTien.findById({
      _id: request.params.id
    }).populate(['phongID', 'dsCTPT']); // let hopDong = await HopDongThue.find({phongID: phieuthuMail.phongID}).populate('khachThueID')
    // let mailKhachThues = hopDong.map(hd => hd.khachThueID.email)
    // let stringEmail = ""
    // for(let str of mailKhachThues) {
    //   stringEmail += str + ', '
    // }

    let options = {
      content: _mailPhieuThuTien2.default.mailPhieuThuTien(phieuthuMail),
      subject: 'Thông Tin Phiếu Thu Cần Xem',
      text: 'Thông Tin Phiếu Thu Cần Xem' // lấy ra email của phòng có phiếu thu và lọc ra email khách thuê đang ở phòng này để gởi mail

    };
    let stringEmail = await GetEmailOfKhach(phieuthuMail.phongID);

    _sendMail2.default.SenMail(options, stringEmail);

    return true;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
}; // hàm lấy thông tin để thanh toán qua paypal


const thanhToanPayPal = async (request, h) => {
  try {
    let phieuthu = request.payload.phieuthuInfo;
    let name = `Phiếu thu tiền ${(0, _moment2.default)(phieuthu.ngayLap).format('DD/MM/YYYY')}`;

    let namePhong = phieuthu._id.substring(2, 9);

    let tongTien = phieuthu.dsCTPT.reduce((tongTien, x) => {
      if (x.chiSoMoi && x.chiSoMoi > 0) {
        tongTien += (x.chiSoMoi - x.chiSoCu) * x.donGia;
      } else {
        tongTien += x.donGia;
      }

      return tongTien;
    }, 0);
    let convertUSD = (tongTien / 23000).toFixed(2); // tạm thời quy ước 1 đô 22000

    TotalCTPT = convertUSD;
    var create_payment_json = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": "http://localhost:8080/success",
        "cancel_url": "http://localhost:8080/cancel"
      },
      "transactions": [{
        "item_list": {
          "items": [{
            "name": name,
            "sku": phieuthu._id,
            "price": convertUSD,
            "currency": "USD",
            "quantity": 1
          }]
        },
        "amount": {
          "currency": "USD",
          "total": convertUSD
        },
        "description": `Thanh toán hóa đơn ${namePhong}`
      }]
    };
    return await processPaypal(create_payment_json);
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
}; // hàm chuyển link đến trang paypal


const processPaypal = create_payment_json => {
  return new _mongoose.Promise(resolve => {
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw error;
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            return resolve(payment.links[i].href);
          }
        }
      }
    });
  });
}; // hàm hoàn tất thanh toán qua paypal


const hoanTatPayPal = async (request, h) => {
  try {
    const payerId = request.query.PayerID;
    const paymentId = request.query.paymentId;
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
        "amount": {
          "currency": "USD",
          "total": TotalCTPT
        }
      }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
      if (error) {
        throw error;
      } else {
        console.log("Success");
        let phieuthuId = payment.transactions.pop().item_list.items.pop().sku;
        let phieuthu = await PhieuThuTien.findById({
          _id: phieuthuId
        }).populate(['phongID', 'dsCTPT']);

        if (phieuthu) {
          phieuthu.tinhTrangPhieuThu = 'đã đóng';
          let {
            phongID,
            ngayLap,
            ngayHetHan,
            moTa,
            tinhTrangPhieuThu
          } = phieuthu;
          await PhieuThuTien.findByIdAndUpdate({
            _id: phieuthu._id
          }, {
            phongID,
            ngayLap,
            ngayHetHan,
            moTa,
            tinhTrangPhieuThu
          });
        }

        let options = {
          content: _mailPhieuThuTien2.default.mailPhieuThuTien(phieuthu),
          subject: 'Thanh toán qua PayPal',
          text: 'Thanh toán qua PayPal' // lấy ra email của phòng có phiếu thu và lọc ra email khách thuê đang ở phòng này để gởi mail

        };
        let stringEmail = await GetEmailOfKhach(phieuthu.phongID);

        _sendMail2.default.SenMail(options, stringEmail);
      }
    });
    return true;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
}; // báo hết hạn


const BaoHetHanPT = async (request, h) => {
  try {
    for (let item of request.dsPT) {
      let phieuthuMail = await PhieuThuTien.findById({
        _id: item._id
      }).populate(['phongID', 'dsCTPT']);
      let options = {
        content: _mailPhieuThuTien2.default.mailPhieuThuTien(phieuthuMail),
        subject: 'Phiếu Báo Quá Hạn',
        text: 'Phiếu Báo Quá Hạn'
      };
      let stringEmail = await GetEmailOfKhach(phieuthuMail.phongID);

      _sendMail2.default.SenMail(options, stringEmail);
    }

    return true;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
}; // thống kê


const thongKePT = async (request, h) => {
  try {
    let data = await PhieuThuTien.thongKePT(request.payload);
    return data || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
}; // hàm lọc ra những email của khách đang ở phòng để nhận mail


const GetEmailOfKhach = async phongID => {
  let hopDong = await HopDongThue.find({
    phongID: phongID
  }).populate('khachThueID');
  let mailKhachThues = hopDong.filter(item => {
    if (item.khachThueID.phongs && item.khachThueID.phongs.length > 0) {
      let a = false;

      for (let i of item.khachThueID.phongs) {
        if (String(i) === String(item.phongID)) {
          a = true;
          break;
        }
      }

      if (a === true) {
        return item;
      } else {
        return null;
      }
    }
  }).map(key => {
    return key.khachThueID.email;
  });
  let stringEmail = "";

  for (let str of mailKhachThues) {
    stringEmail += str + ', ';
  }

  return stringEmail;
};

exports.default = {
  getAll,
  save,
  sendMail,
  thanhToanPayPal,
  hoanTatPayPal,
  thongKePT,
  BaoHetHanPT
};

/***/ }),

/***/ "./app/modules/phieuthutien/index.js":
/*!*******************************************!*\
  !*** ./app/modules/phieuthutien/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index */ "./app/modules/phieuthutien/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_index2.default);
};

exports.name = 'phieu-thu-tien-admin';

/***/ }),

/***/ "./app/modules/phieuthutien/routes/index.js":
/*!**************************************************!*\
  !*** ./app/modules/phieuthutien/routes/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index */ "./app/modules/phieuthutien/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/phieuthutien/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/phieuthutien',
  handler: _index2.default.getAll,
  config: {
    tags: ['api'],
    description: "lay danh sach phieu thu",
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/sendmailphieuthutien/{id}',
  handler: _index2.default.sendMail,
  config: {
    tags: ['api'],
    validate: _index4.default.sendmail,
    description: "gửi mail hóa đơn",
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/hoan-tat-thanh-toan-paypal',
  handler: _index2.default.hoanTatPayPal,
  config: {
    tags: ['api'],
    auth: false,
    description: "hoàn tất giao dịch",
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/phieuthu-baohethan',
  handler: _index2.default.BaoHetHanPT,
  config: {
    tags: ['api'],
    description: 'báo hết hạn hợp đồng',
    validate: _index4.default.BaoHetHanPT,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/phieuthutien',
  handler: _index2.default.save,
  config: {
    tags: ['api'],
    description: 'them hoac sua phieu thu',
    validate: _index4.default.save,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/phieuthu-thongke',
  handler: _index2.default.thongKePT,
  config: {
    tags: ['api'],
    description: 'thống kê phiếu thu',
    validate: _index4.default.thongKePT,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/phieuthutien-thanhtoan',
  handler: _index2.default.thanhToanPayPal,
  config: {
    tags: ['api'],
    description: 'thanh toan paypal',
    validate: _index4.default.thanhtoan,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/phieuthutien/validate/index.js":
/*!****************************************************!*\
  !*** ./app/modules/phieuthutien/validate/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

Joi.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(Joi);
const phieuThuTienVal = {
  save: {
    payload: {
      _id: Joi.string(),
      phongID: Joi.ObjectId(),
      ngayLap: Joi.date().required(),
      ngayHetHan: Joi.date().required(),
      moTa: Joi.string(),
      tinhTrangPhieuThu: Joi.string()
    },
    options: {
      allowUnknown: true
    }
  },
  sendmail: {
    params: {
      id: Joi.string()
    }
  },
  thanhtoan: {
    payload: {
      phieuthuInfo: Joi.object().required()
    }
  },
  thongKePT: {
    payload: {
      ngayThongKe: Joi.array().required(),
      tieuChi: Joi.string().required()
    }
  },
  BaoHetHanPT: {
    payload: {
      dsPT: Joi.array().required()
    }
  }
};
exports.default = { ...phieuThuTienVal
};

/***/ }),

/***/ "./app/modules/phieutraphong/controller/index.js":
/*!*******************************************************!*\
  !*** ./app/modules/phieutraphong/controller/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

var _mailLienHe = __webpack_require__(/*! ../../../lib/basemail/mailLienHe.js */ "./app/lib/basemail/mailLienHe.js");

var _mailLienHe2 = _interopRequireDefault(_mailLienHe);

var _sendMail = __webpack_require__(/*! ../../../lib/basemail/sendMail.js */ "./app/lib/basemail/sendMail.js");

var _sendMail2 = _interopRequireDefault(_sendMail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PhieuTraPhong = _mongoose2.default.model('PhieuTraPhong');

const KhachThue = _mongoose2.default.model('KhachThue');

const Phong = _mongoose2.default.model('Phong');

const LienHe = _mongoose2.default.model('LienHe');

const save = async (request, h) => {
  try {
    let data = request.payload;
    let item = {};

    if (!data._id) {
      item = new PhieuTraPhong(data); // bắt đầu cập nhật khách thuê khi trả phòng nếu thuê 2 phòng trở lên thì trừ phòng này ra , còn k thì cập nhật trạng thái thành đã trả phòng

      let khachThue = await KhachThue.findById({
        _id: item.khachThueID
      });

      if (khachThue && khachThue.phongs && khachThue.phongs.length > 0) {
        khachThue.phongs = khachThue.phongs.filter(key => String(key) != String(item.phongID));
      }

      if (khachThue.phongs && khachThue.phongs.length === 0) {
        khachThue.tinhTrangKhachThue = 'Đã trả phòng';
      }

      await khachThue.save();
      /* bắt đầu cập nhật tình trạng cho phòng, mặc định là nếu đã thuê phòng thì sẽ không chuyển thành cho ở ghép
        khách còn ở thì tự quyết định có muốn cho ở ghép hay không, còn nếu như phòng đó không ai ở nữa thì chuyển sang
        là còn trống,
        cách củ chuối, là lấy hết hợp đồng của phòng này ra và xem thử khách thuê đó còn ở phòng này k
      */

      let phong = await Phong.findById({
        _id: item.phongID
      }).populate({
        path: 'dsHopDong',
        populate: [{
          path: 'khachThueID'
        }]
      });
      let countKhach = phong.dsHopDong.filter(item => {
        if (item.khachThueID.phongs && item.khachThueID.phongs.length > 0) {
          let a = false;

          for (let i of item.khachThueID.phongs) {
            if (String(i) === String(item.phongID)) {
              a = true;
              break;
            }
          }

          if (a === true) {
            return item;
          } else {
            return null;
          }
        }
      });

      if (countKhach && countKhach.length === 0) {
        phong.tinhTrangPhongID = '5c88669ffcd238559ca25d13';
        await phong.save();
      }
    } else {
      item = await PhieuTraPhong.findById({
        _id: data._id
      });
      item = Object.assign(item, data);
    }

    await item.save();
    let phieu = await PhieuTraPhong.findById({
      _id: item._id
    }).populate('khachThueID'); // check phòng này có ai để lại liên hệ hay không thì gởi mail liên hệ

    let lienHePhong = await LienHe.find({
      phongID: phieu.phongID
    }).populate('phongID');

    if (lienHePhong && lienHePhong.length > 0) {
      let emailKhach = lienHePhong.map(v => {
        return v.email;
      });
      let stringEmail = "";

      for (let str of emailKhach) {
        stringEmail += str + ', ';
      }

      let options = {
        content: _mailLienHe2.default.mailLienHe(lienHePhong[0]),
        subject: 'Thông báo phòng trống',
        text: 'Thông báo phòng trống'
      };
      console.log('email', stringEmail);

      _sendMail2.default.SenMail(options, stringEmail);
    }

    return phieu;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const getAll = async (request, h) => {
  try {
    return await PhieuTraPhong.find();
  } catch (err) {
    return _boom2.default.forbidden();
  }
};

const getById = async (request, h) => {
  try {
    return (await PhieuTraPhong.findById({
      _id: request.params._id
    })) || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const getByPhongId = async (request, h) => {
  try {
    return (await PhieuTraPhong.find({
      phongID: request.params.idphong
    }).populate('khachThueID')) || {};
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  save,
  getAll,
  getById,
  getByPhongId
};

/***/ }),

/***/ "./app/modules/phieutraphong/index.js":
/*!********************************************!*\
  !*** ./app/modules/phieutraphong/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index.js */ "./app/modules/phieutraphong/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_index2.default);
};

exports.name = 'phieu-tra-phong-admin';

/***/ }),

/***/ "./app/modules/phieutraphong/routes/index.js":
/*!***************************************************!*\
  !*** ./app/modules/phieutraphong/routes/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index.js */ "./app/modules/phieutraphong/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/phieutraphong/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/phieutraphong',
  handler: _index2.default.getAll,
  config: {
    tags: ['api'],
    description: 'Lay toan bo phieu tra phong',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/phieutraphong/{id}',
  handler: _index2.default.getById,
  config: {
    tags: ['api'],
    description: 'Lay thong tin phieu tra phong',
    validate: _index4.default.get,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/phieutraphongbyphong/{idphong}',
  handler: _index2.default.getByPhongId,
  config: {
    tags: ['api'],
    description: 'Lay thong tin phieu tra phong theo phong',
    validate: _index4.default.getPhong,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/phieutraphong',
  handler: _index2.default.save,
  config: {
    tags: ['api'],
    description: 'them sua phieu tra phong',
    validate: _index4.default.save,
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/phieutraphong/validate/index.js":
/*!*****************************************************!*\
  !*** ./app/modules/phieutraphong/validate/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

Joi.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(Joi);
const PhieuTraPhongVal = {
  save: {
    payload: {
      phongID: Joi.ObjectId(),
      khachThueID: Joi.ObjectId(),
      ngayLap: Joi.date().required()
    }
  },
  get: {
    params: {
      id: Joi.ObjectId()
    }
  },
  getPhong: {
    params: {
      idphong: Joi.ObjectId()
    }
  }
};
exports.default = { ...PhieuTraPhongVal
};

/***/ }),

/***/ "./app/modules/phong/controller/index.js":
/*!***********************************************!*\
  !*** ./app/modules/phong/controller/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Phong = _mongoose2.default.model('Phong');

const Booking = _mongoose2.default.model('Booking');

const fs = __webpack_require__(/*! fs */ "fs");

const save = async (request, h) => {
  try {
    let data = request.payload;
    let phong = {};
    let item = {};
    let anhChinhName;
    let anhChiTietName;

    if (data._id) {
      if (data.anhChinh.name === null || data.anhChinh.name.length === 0 || data.anhChinh.name === undefined) {
        let entity = await Phong.findById({
          _id: data._id
        });
        anhChinhName = entity.anhChinh;
      } else {
        anhChinhName = data.anhChinh.name;
        let anhChinh64 = data.anhChinh.file64.replace(/^data(.*?)base64,/, "");
        fs.writeFile(`app/lib/images/${anhChinhName}`, anhChinh64, 'base64', function (err) {
          return err;
        });
      }

      if (data.anhChiTiet.name.length != 0) {
        anhChiTietName = data.anhChiTiet.name;
        let anhChiTiet64 = [];

        for (let item of data.anhChiTiet.file64) {
          let anh = item.replace(/^data(.*?)base64,/, "");
          anhChiTiet64.push(anh);
        }

        for (let i = 0; i < data.anhChiTiet.name.length; i++) {
          fs.writeFile(`app/lib/images/${data.anhChiTiet.name[i]}`, anhChiTiet64[i], 'base64', function (err) {
            return err;
          });
        }
      } else {
        let entity = await Phong.findById({
          _id: data._id
        });
        anhChiTietName = entity.anhChiTiet;
      }

      let payload = {
        tenPhong: data.tenPhong,
        anhChinh: anhChinhName,
        anhChiTiet: anhChiTietName,
        moTa: data.moTa,
        soDien: data.soDien,
        soNuoc: data.soNuoc,
        giaPhong: data.giaPhong,
        dKMang: data.dKMang,
        status: data.status,
        homeFlag: data.homeFlag,
        hotFlag: data.hotFlag,
        tinhTrangPhongID: data.tinhTrangPhongID,
        khuPhongID: data.khuPhongID,
        loaiPhongID: data.loaiPhongID
      };
      item = (await Phong.findOneAndUpdate({
        _id: data._id
      }, payload)) || _boom2.default.notFound();
      phong = await Phong.findById({
        _id: item._id
      }).populate('loaiPhongID').populate('khuPhongID').populate('tinhTrangPhongID');
    } else {
      anhChinhName = data.anhChinh.name;
      let anhChinh64 = data.anhChinh.file64.replace(/^data(.*?)base64,/, "");
      fs.writeFile(`app/lib/images/${anhChinhName}`, anhChinh64, 'base64', function (err) {
        return err;
      });
      anhChiTietName = data.anhChiTiet.name;
      let anhChiTiet64 = [];

      for (let item of data.anhChiTiet.file64) {
        let anh = item.replace(/^data(.*?)base64,/, "");
        anhChiTiet64.push(anh);
      }

      for (let i = 0; i < data.anhChiTiet.name.length; i++) {
        fs.writeFile(`app/lib/images/${data.anhChiTiet.name[i]}`, anhChiTiet64[i], 'base64', function (err) {
          return err;
        });
      }

      let payload = {
        tenPhong: data.tenPhong,
        anhChinh: anhChinhName,
        anhChiTiet: anhChiTietName,
        moTa: data.moTa,
        soDien: data.soDien,
        soNuoc: data.soNuoc,
        giaPhong: data.giaPhong,
        dKMang: data.dKMang,
        status: data.status,
        homeFlag: data.homeFlag,
        hotFlag: data.hotFlag,
        tinhTrangPhongID: data.tinhTrangPhongID,
        khuPhongID: data.khuPhongID,
        loaiPhongID: data.loaiPhongID
      };
      item = await Phong.create(payload);
      phong = await Phong.findById({
        _id: item._id
      }).populate('loaiPhongID').populate('khuPhongID').populate('tinhTrangPhongID');
    }

    return phong;
  } catch (err) {
    console.log(err);
    return _boom2.default.forbidden(err);
  }
};

const getAll = async (request, h) => {
  try {
    // if(request.pre.isRoles) {
    return await Phong.find().populate('loaiPhongID').populate('khuPhongID').populate('tinhTrangPhongID').populate('dsPhieuThu').lean(); // }
    // else {
    //   return h.response({message:'Not allowed'})
    // }
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const getAllClient = async (request, h) => {
  try {
    let options = {
      populate: [{
        path: 'loaiPhongID'
      }, {
        path: 'khuPhongID',
        populate: ['dsPhong']
      }, {
        path: 'tinhTrangPhongID'
      }],
      lean: true,
      limit: request.payload.rowsPerPage,
      page: request.payload.page
    };
    let items = await Phong.paginate({}, options);

    for (let item of items.docs) {
      if (String(item.tinhTrangPhongID._id) !== '5c8866adfcd238559ca25d14') {
        let dsKhach = await Phong.findById({
          _id: item._id
        }).populate([{
          path: 'dsHopDong',
          populate: ['khachThueID']
        }]);
        let dsKhachThue = dsKhach.dsHopDong.map(item1 => {
          return item1.khachThueID;
        });
        let countKhach = dsKhachThue.filter(item2 => {
          for (let key of item2.phongs) {
            if (String(key) === String(item._id)) {
              return item2;
            }
          }
        });
        let dsBooking = await Booking.find({
          phongID: item._id,
          status: true
        }); // check số lượng khách đang ở là bao nhiêu && số lượng đang book dc active la bao nhiêu

        if (countKhach && dsBooking && dsBooking.length + countKhach.length < 4) {
          item.ok = true;
        }
      }
    }

    return items;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const update = async (request, h) => {
  try {
    let anhChinh = request.payload.anhChinh;
    let anhChinhName = anhChinh.name;
    let anhChinh64 = anhChinh.file64.replace(/^data(.*?)base64,/, "");
    fs.writeFile(`app/lib/images/${anhChinhName}`, anhChinh64, 'base64', function (err) {
      return err;
    });
    let anhChiTiet = request.payload.anhChiTiet;
    let anhChiTiet64 = [];

    for (let item of anhChiTiet.file64) {
      let anh = item.replace(/^data(.*?)base64,/, "");
      anhChiTiet64.push(anh);
    }

    for (let i = 0; i < anhChiTiet.name.length; i++) {
      fs.writeFile(`app/lib/images/${anhChiTiet.name[i]}`, anhChiTiet64[i], 'base64', function (err) {
        return err;
      });
    }

    let payload = {
      tenPhong: request.payload.tenPhong,
      anhChinh: anhChinhName,
      anhChiTiet: anhChiTiet.name,
      moTa: request.payload.moTa,
      soDien: request.payload.soDien,
      soNuoc: request.payload.soNuoc,
      giaPhong: request.payload.giaPhong,
      dKMang: request.payload.dKMang,
      status: request.payload.status,
      homeFlag: request.payload.homeFlag,
      tinhTrangPhongID: request.payload.tinhTrangPhongID,
      khuPhongID: request.payload.khuPhongID,
      loaiPhongID: request.payload.loaiPhongID
    };
    let data = await Phong.findOneAndUpdate({
      _id: request.params.id
    }, payload);
    let phong = await Phong.findById({
      _id: data._id
    }).populate('loaiPhongID').populate('khuPhongID');
    return phong || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const deletePhong = async (request, h) => {
  try {
    return (await Phong.findOneAndRemove({
      _id: request.params.id
    })) || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const getById = async (request, h) => {
  try {
    return await Phong.findById({
      _id: request.params.id
    }).populate(['loaiPhongID', {
      path: 'khuPhongID',
      populate: ['dsPhong']
    }, 'tinhTrangPhongID', {
      path: 'dsHopDong',
      populate: [{
        path: 'khachThueID',
        populate: ['loaiKhachThueID']
      }]
    }, {
      path: 'dsPhieuThu',
      populate: [{
        path: 'dsCTPT',
        populate: ['cacKhoanThuID']
      }]
    }]).lean();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const searchMultiple = async (request, h) => {
  try {
    let data = request.payload;

    if (request.params.isReal === true) {
      let items = await Phong.find(data).populate('loaiPhongID').populate('khuPhongID').populate('tinhTrangPhongID');
      return items;
    } else {
      let items = await Phong.SearchMultiple(request.payload);
      return items;
    }
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const tracuuphong = async (request, h) => {
  try {
    // chỗ này đã phân trang
    let items = await Phong.tracuuphong(request.payload); // kiểm tra số người đang ở tại phòng đó và cần thêm tình trạng phòng đó khác đã thuê

    for (let item of items.docs) {
      if (String(item.tinhTrangPhongID._id) !== '5c8866adfcd238559ca25d14') {
        let dsKhach = await Phong.findById({
          _id: item._id
        }).populate([{
          path: 'dsHopDong',
          populate: ['khachThueID']
        }]);
        let dsKhachThue = dsKhach.dsHopDong.map(item1 => {
          return item1.khachThueID;
        });
        let countKhach = dsKhachThue.filter(item2 => {
          for (let key of item2.phongs) {
            if (String(key) === String(item._id)) {
              return item2;
            }
          }
        });
        let dsBooking = await Booking.find({
          phongID: item._id,
          status: true
        }); // check số lượng khách đang ở là bao nhiêu && số lượng đang book dc active la bao nhiêu

        if (countKhach && dsBooking && dsBooking.length + countKhach.length < 4) {
          item.ok = true;
        }
      }
    }

    return items;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const tracuuphongAdmin = async (request, h) => {
  try {
    let items = await Phong.tracuuphongAdmin(request.payload);
    return items;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  save,
  getById,
  getAll,
  getAllClient,
  update,
  deletePhong,
  searchMultiple,
  tracuuphong,
  tracuuphongAdmin
};

/***/ }),

/***/ "./app/modules/phong/index.js":
/*!************************************!*\
  !*** ./app/modules/phong/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index.js */ "./app/modules/phong/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_index2.default);
};

exports.name = 'admin-phong';

/***/ }),

/***/ "./app/modules/phong/routes/index.js":
/*!*******************************************!*\
  !*** ./app/modules/phong/routes/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index.js */ "./app/modules/phong/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index.js */ "./app/modules/phong/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/phong',
  handler: _index2.default.getAll,
  config: {
    auth: false,
    description: 'lay danh sach phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/timkiemphong/timchinhxac={isReal}',
  handler: _index2.default.searchMultiple,
  config: {
    description: 'tim kiem nhieu tham so',
    validate: _index4.default.search,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/tracuuphong',
  handler: _index2.default.tracuuphong,
  config: {
    auth: false,
    description: 'tra cuu phong',
    validate: _index4.default.tracuuphong,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/tracuuphong-admin',
  handler: _index2.default.tracuuphongAdmin,
  config: {
    auth: false,
    description: 'tra cuu phong',
    validate: _index4.default.tracuuphong,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/get-all-client',
  handler: _index2.default.getAllClient,
  config: {
    auth: false,
    description: 'load tat ca danh sach phan trang',
    validate: _index4.default.getallclient,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/phong/{id}',
  handler: _index2.default.getById,
  config: {
    validate: _index4.default.get,
    description: 'xem thong tin phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/phong-client/{id}',
  handler: _index2.default.getById,
  config: {
    auth: false,
    validate: _index4.default.get,
    description: 'xem thong tin phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/phong',
  handler: _index2.default.save,
  config: {
    validate: _index4.default.create,
    description: 'vua them sua phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'PUT',
  path: '/phong/{id}',
  handler: _index2.default.update,
  config: {
    validate: _index4.default.update,
    description: 'cập nhật thông tin phòng',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/phong/{id}',
  handler: _index2.default.deletePhong,
  config: {
    validate: _index4.default.delete,
    description: 'Xoa phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/phong/validate/index.js":
/*!*********************************************!*\
  !*** ./app/modules/phong/validate/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(/*! joi */ "joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(_joi2.default);
const phongVal = {
  create: {
    payload: {
      _id: _joi2.default.string().length(24),
      tenPhong: _joi2.default.string().required().max(20).trim(),
      anhChinh: _joi2.default.object(),
      anhChiTiet: _joi2.default.object(),
      moTa: _joi2.default.string(),
      soDien: _joi2.default.number().required(),
      soNuoc: _joi2.default.number().required(),
      giaPhong: _joi2.default.number().required(),
      dKMang: _joi2.default.boolean(),
      status: _joi2.default.boolean(),
      homeFlag: _joi2.default.boolean(),
      hotFlag: _joi2.default.boolean(),
      tinhTrangPhongID: _joi2.default.ObjectId(),
      khuPhongID: _joi2.default.ObjectId(),
      loaiPhongID: _joi2.default.ObjectId()
    },
    options: {
      allowUnknown: true
    }
  },
  search: {
    params: {
      isReal: _joi2.default.boolean()
    },
    payload: {
      tenPhong: _joi2.default.string(),
      moTa: _joi2.default.string(),
      soDien: _joi2.default.number(),
      soNuoc: _joi2.default.number(),
      giaPhong: _joi2.default.number(),
      dKMang: _joi2.default.boolean(),
      status: _joi2.default.boolean(),
      homeFlag: _joi2.default.boolean(),
      hotFlag: _joi2.default.boolean(),
      tinhTrangPhongID: _joi2.default.ObjectId(),
      khuPhongID: _joi2.default.ObjectId(),
      loaiPhongID: _joi2.default.ObjectId()
    }
  },
  update: {
    params: {
      id: _joi2.default.ObjectId()
    },
    payload: {
      tenPhong: _joi2.default.string().required().max(20).trim(),
      anhChinh: _joi2.default.object(),
      anhChiTiet: _joi2.default.object(),
      moTa: _joi2.default.string(),
      soDien: _joi2.default.number().required(),
      soNuoc: _joi2.default.number().required(),
      giaPhong: _joi2.default.number().required(),
      dKMang: _joi2.default.boolean(),
      status: _joi2.default.boolean(),
      homeFlag: _joi2.default.boolean(),
      hotFlag: _joi2.default.boolean(),
      tinhTrangPhongID: _joi2.default.ObjectId(),
      khuPhongID: _joi2.default.ObjectId(),
      loaiPhongID: _joi2.default.ObjectId()
    }
  },
  delete: {
    params: {
      id: _joi2.default.ObjectId()
    }
  },
  get: {
    params: {
      id: _joi2.default.ObjectId()
    }
  },
  tracuuphong: {
    payload: {
      loaiPhong: _joi2.default.ObjectId(),
      giaPhong: _joi2.default.ObjectId(),
      isMang: _joi2.default.boolean(),
      tinhTrangPhongSelect: _joi2.default.array()
    },
    options: {
      allowUnknown: true
    }
  },
  getallclient: {
    payload: {
      pagination: _joi2.default.object()
    },
    options: {
      allowUnknown: true
    }
  }
};
exports.default = { ...phongVal
};

/***/ }),

/***/ "./app/modules/role/controller/index.js":
/*!**********************************************!*\
  !*** ./app/modules/role/controller/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Role = _mongoose2.default.model('Role');

const get = async (request, h) => {
  try {
    return await Role.find();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const save = async (request, h) => {
  try {
    let data = request.payload;
    let item = {};

    if (!data._id) {
      item = new Role(data);
    } else {
      item = await Role.findById(data._id);
      item = Object.assign(item, data);
    }

    await item.save();
    return item;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  get,
  save
};

/***/ }),

/***/ "./app/modules/role/index.js":
/*!***********************************!*\
  !*** ./app/modules/role/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _routes = __webpack_require__(/*! ./routes */ "./app/modules/role/routes/index.js");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_routes2.default);
};

exports.name = 'role-admin';

/***/ }),

/***/ "./app/modules/role/routes/index.js":
/*!******************************************!*\
  !*** ./app/modules/role/routes/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validate = __webpack_require__(/*! ../validate */ "./app/modules/role/validate/index.js");

var _validate2 = _interopRequireDefault(_validate);

var _controller = __webpack_require__(/*! ../controller */ "./app/modules/role/controller/index.js");

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/role',
  handler: _controller2.default.get,
  config: {
    auth: false,
    description: 'xem danh sách role',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/role',
  handler: _controller2.default.save,
  config: {
    auth: false,
    validate: _validate2.default.create,
    description: 'them va sua role',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/role/validate/index.js":
/*!********************************************!*\
  !*** ./app/modules/role/validate/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(/*! joi */ "joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.ObjecId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(_joi2.default);
const roleVal = {
  create: {
    payload: {
      _id: _joi2.default.string(),
      roleName: _joi2.default.string().required().max(30)
    },
    options: {
      allowUnknown: true
    }
  }
};
exports.default = { ...roleVal
};

/***/ }),

/***/ "./app/modules/rolegroup/controller/index.js":
/*!***************************************************!*\
  !*** ./app/modules/rolegroup/controller/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RoleGroup = _mongoose2.default.model('RoleGroup');

const get = async (request, h) => {
  try {
    return await RoleGroup.find().populate(['roles', 'dsNhanVien']).lean();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const save = async (request, h) => {
  try {
    let data = request.payload;
    let item = {};

    if (!data._id) {
      data.roles = [];
      data.roles.push('5cc5752e6adfd01278d9a325');
      item = new RoleGroup(data);
    } else {
      item = await RoleGroup.findById(data._id);
      item = Object.assign(item, data);
    }

    await item.save();
    return item;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
}; // add quyền cho group


const addRole = async (request, h) => {
  try {
    let data = request.payload;
    let roleGroup = await RoleGroup.findById({
      _id: data.idGroup
    });

    if (roleGroup) {
      roleGroup.roles = [];
      roleGroup.roles = [...data.roles];
    }

    await roleGroup.save();
    let resRole = await RoleGroup.findById({
      _id: roleGroup._id
    }).populate('roles');
    return resRole;
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  get,
  save,
  addRole
};

/***/ }),

/***/ "./app/modules/rolegroup/index.js":
/*!****************************************!*\
  !*** ./app/modules/rolegroup/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _routes = __webpack_require__(/*! ./routes */ "./app/modules/rolegroup/routes/index.js");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_routes2.default);
};

exports.name = "rolegroup-admin";

/***/ }),

/***/ "./app/modules/rolegroup/routes/index.js":
/*!***********************************************!*\
  !*** ./app/modules/rolegroup/routes/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validate = __webpack_require__(/*! ../validate */ "./app/modules/rolegroup/validate/index.js");

var _validate2 = _interopRequireDefault(_validate);

var _controller = __webpack_require__(/*! ../controller */ "./app/modules/rolegroup/controller/index.js");

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/role-group',
  handler: _controller2.default.get,
  config: {
    auth: false,
    tags: ['api'],
    description: 'lay danh sach nhom quyen',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/role-group',
  handler: _controller2.default.save,
  config: {
    auth: false,
    validate: _validate2.default.save,
    tags: ['api'],
    description: 'them hoac sua nhom quyen',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/role-group-add-role',
  handler: _controller2.default.addRole,
  config: {
    auth: false,
    validate: _validate2.default.addRole,
    tags: ['api'],
    description: 'them quyen cho nhom',
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/rolegroup/validate/index.js":
/*!*************************************************!*\
  !*** ./app/modules/rolegroup/validate/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(/*! joi */ "joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(_joi2.default);
const roleGroupVal = {
  save: {
    payload: {
      _id: _joi2.default.string(),
      nameRoleGroup: _joi2.default.string().required().max(30)
    },
    options: {
      allowUnknown: true
    }
  },
  addRole: {
    payload: {
      idGroup: _joi2.default.ObjectId(),
      roles: _joi2.default.array()
    },
    options: {
      allowUnknown: true
    }
  }
};
exports.default = { ...roleGroupVal
};

/***/ }),

/***/ "./app/modules/tinhtrangphong/controller/index.js":
/*!********************************************************!*\
  !*** ./app/modules/tinhtrangphong/controller/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _boom = __webpack_require__(/*! boom */ "boom");

var _boom2 = _interopRequireDefault(_boom);

var _https = __webpack_require__(/*! https */ "https");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TinhTrangPhong = _mongoose2.default.model('TinhTrangPhong');

const getAll = async (request, h) => {
  try {
    return await TinhTrangPhong.find();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const getById = async (request, h) => {
  try {
    return (await TinhTrangPhong.findById({
      _id: request.params.id
    })) || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const create = async (request, h) => {
  try {
    return await TinhTrangPhong.create(request.payload);
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const update = async (request, h) => {
  try {
    let {
      tenTinhTrangPhong
    } = request.payload;
    const item = await TinhTrangPhong.findOneAndUpdate({
      _id: request.params.id
    }, {
      tenTinhTrangPhong
    });
    return item || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

const deleteTinhTrangPhong = async (request, h) => {
  try {
    return (await TinhTrangPhong.findOneAndRemove({
      _id: request.params.id
    })) || _boom2.default.notFound();
  } catch (err) {
    return _boom2.default.forbidden(err);
  }
};

exports.default = {
  getAll,
  getById,
  create,
  update,
  deleteTinhTrangPhong
};

/***/ }),

/***/ "./app/modules/tinhtrangphong/index.js":
/*!*********************************************!*\
  !*** ./app/modules/tinhtrangphong/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index */ "./app/modules/tinhtrangphong/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = async (server, options) => {
  server.route(_index2.default);
};

exports.name = 'admin-tinhtrangphong';

/***/ }),

/***/ "./app/modules/tinhtrangphong/routes/index.js":
/*!****************************************************!*\
  !*** ./app/modules/tinhtrangphong/routes/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index */ "./app/modules/tinhtrangphong/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/tinhtrangphong/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'GET',
  path: '/tinhtrangphong',
  handler: _index2.default.getAll,
  config: {
    auth: false,
    description: 'xem danh sach tinh trang phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/tinhtrangphong/{id}',
  handler: _index2.default.getById,
  config: {
    validate: _index4.default.get,
    description: 'xem thong tin tinh trang phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/tinhtrangphong',
  handler: _index2.default.create,
  config: {
    validate: _index4.default.create,
    description: 'tao moi tinh trang phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'PUT',
  path: '/tinhtrangphong/{id}',
  handler: _index2.default.update,
  config: {
    validate: _index4.default.update,
    description: 'cap nhat thong tin tinh trang phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'DELETE',
  path: '/tinhtrangphong/{id}',
  handler: _index2.default.deleteTinhTrangPhong,
  config: {
    validate: _index4.default.delete,
    description: 'xoa tinh trang phong',
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/tinhtrangphong/validate/index.js":
/*!******************************************************!*\
  !*** ./app/modules/tinhtrangphong/validate/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(/*! joi */ "joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(_joi2.default);
const tinhTrangPhongVal = {
  create: {
    payload: {
      tenTinhTrangPhong: _joi2.default.string().required().max(20)
    }
  },
  get: {
    params: {
      id: _joi2.default.ObjectId()
    }
  },
  update: {
    params: {
      id: _joi2.default.ObjectId()
    },
    payload: {
      tenTinhTrangPhong: _joi2.default.string().required().max(20)
    }
  },
  delete: {
    params: {
      id: _joi2.default.ObjectId()
    }
  }
};
exports.default = { ...tinhTrangPhongVal
};

/***/ }),

/***/ "./app/modules/user/controller/index.js":
/*!**********************************************!*\
  !*** ./app/modules/user/controller/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PhieuThu = _mongoose2.default.model('PhieuThuTien');

const Booking = _mongoose2.default.model('Booking');

const Bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");

const Boom = __webpack_require__(/*! boom */ "boom");

const User = _mongoose2.default.model('User');

const Jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

const Aguid = __webpack_require__(/*! aguid */ "aguid");

const cmd = __webpack_require__(/*! node-cmd */ "node-cmd");

const moment = __webpack_require__(/*! moment */ "moment");

const SALT_LENGTH = 10;

const signin = async (request, h) => {
  try {
    let data = request.payload;
    let listUsers = await User.find();
    let userNotDuplicate = listUsers.filter(item => {
      item.userName = data.userName;
    });

    if (userNotDuplicate && userNotDuplicate.length === 0) {
      let newpass = Bcrypt.hashSync(data.passWord, SALT_LENGTH);
      let user = {
        userName: data.userName,
        passWord: newpass,
        email: data.email,
        status: data.status,
        rolesGroupID: data.rolesGroupID,
        nhanVienID: data.nhanVienID // tao token

      };
      let token = Jwt.sign(user, global.CONFIG.get('web.jwt.secret'));
      let userRegisted = await User.create(user);
      return {
        auth: true,
        token: token,
        userRegisted
      };
    } else {
      return Boom.badRequest('Lỗi lúc thêm rồi!');
    }
  } catch (err) {
    return Boom.forbidden(err);
  }
};

const createAccountNV = async data => {
  try {
    // tài khoản nhân viên sẽ không bao giờ trùng
    let newpass = Bcrypt.hashSync(data.passWord, SALT_LENGTH);
    let user = {
      userName: data.userName,
      passWord: newpass,
      email: data.email,
      status: data.status,
      rolesGroupID: data.rolesGroupID,
      nhanVienID: data.nhanVienID
    };
    let userRegisted = await User.create(user);
    return userRegisted;
  } catch (err) {
    return Boom.forbidden(err);
  }
};

const createAccountKT = async data => {
  try {
    // để phân biệt tài khoản của nhân viên hay khách thì nên lọc user kèm theo rolesGroupID
    let listUsers = await User.find({
      rolesGroupID: '5cc560ee21fd1c0d185cbd82'
    });
    let userNotDuplicate = listUsers.filter(item => {
      item.userName = data.userName;
    });

    if (userNotDuplicate && userNotDuplicate.length === 0) {
      let newpass = Bcrypt.hashSync(data.passWord, SALT_LENGTH);
      let user = {
        userName: data.userName,
        passWord: newpass,
        email: data.email,
        status: data.status,
        rolesGroupID: data.rolesGroupID,
        khachThueID: data.khachThueID
      };
      let userRegisted = await User.create(user);
      return userRegisted;
    } else {
      return Boom.badRequest('Lỗi trùng tài khoản!');
    }
  } catch (err) {
    return Boom.forbidden(err);
  }
};

const login = async (request, h) => {
  try {
    let data = await User.findOne({
      userName: request.payload.userName
    }); // check xem tài khoản này của khach hay của nhan vien

    let userInfo = {};

    if (data && data.nhanVienID) {
      data = await User.findById({
        _id: data._id
      }).populate(['nhanVienID', {
        path: 'rolesGroupID',
        populate: ['roles']
      }]);
      userInfo = data.nhanVienID;
    }

    if (data && data.khachThueID) {
      data = await User.findById({
        _id: data._id
      }).populate(['khachThueID', {
        path: 'rolesGroupID',
        populate: ['roles']
      }]);
      userInfo = data.khachThueID;
    }

    if (data === null) {
      return {
        credentials: null,
        isValid: false
      };
    } else {
      let isValid = await Bcrypt.compare(request.payload.passWord, data.passWord);

      if (isValid) {
        const credentials = {
          userName: data.userName,
          email: data.email,
          rolesGroupID: data.rolesGroupID,
          status: data.status,
          userInfo
        };
        let session = {
          valid: true,
          id: Aguid(),
          expires: new Date().getTime() + 30 * 60 * 1000,
          credentials // đoạn này sẽ chèn thêm phần cập nhật phiếu thu hết hạn

        };
        let dsPTQuaHan = await PhieuThu.find({
          ngayHetHan: {
            $lt: Date.now()
          },
          tinhTrangPhieuThu: 'chưa đóng'
        });

        if (dsPTQuaHan && dsPTQuaHan.length > 0) {
          for (let item of dsPTQuaHan) {
            item.tinhTrangPhieuThu = 'quá hạn';
            await item.save();
          }
        } // chèn thêm cập nhật booking quá hạn, book không nhận phòng


        let dsBookingHetHan = await Booking.find({
          ngayNhanPhong: {
            $lt: Date.now()
          }
        });

        if (dsBookingHetHan && dsBookingHetHan.length > 0) {
          for (let item of dsBookingHetHan) {
            item.status = false;
            await item.save();
          }
        }

        request.server.redis.set(session.id, JSON.stringify(session));
        let token = Jwt.sign(session, global.CONFIG.get('web.jwt.secret'));
        const response = h.response({
          auth: true,
          token,
          credentials,
          isValid
        });
        response.header("Authorization", token);
        response.state("token", token, global.CONFIG.get('web.cookieOptions'));
        return response;
      } else {
        return {
          credentials: {
            userName: data.userName
          },
          isValid: false
        };
      }
    }
  } catch (err) {
    return Boom.forbidden(err);
  }
};

const getUser = async (request, h) => {
  try {
    let userInfo = request.auth.credentials.credentials;
    return userInfo;
  } catch (err) {
    return err;
  }
}; // cập nhật tài khoản


const editUser = async (request, h) => {
  try {
    // chưa check trùng tài khoản
    let data = request.payload;
    console.log('data', data);
    let user = {}; // nếu tài khoản cập nhật là khách

    if (data.khachThueID) {
      user = await User.findOne({
        khachThueID: data.khachThueID
      }); // nếu cập nhật mật khẩu

      if (data.oldPass) {
        let isPassword = await Bcrypt.compare(data.oldPass, user.passWord);
        let newpass = Bcrypt.hashSync(data.newPass, SALT_LENGTH);

        if (isPassword === true) {
          let newUser = {
            _id: user._id,
            userName: data.userName,
            passWord: newpass,
            email: data.email,
            status: user.status,
            rolesGroupID: user.rolesGroupID,
            khachThueID: data.khachThueID
          };
          user = Object.assign(user, newUser);
          await user.save();
          return {
            user,
            isPassword
          };
        } else {
          return {
            user,
            isPassword
          };
        }
      } else {
        // nếu cập nhật tài khoản
        let isPassword = true;
        user.userName = data.userName;
        await user.save();
        return {
          user,
          isPassword
        };
      }
    } // nếu tài khoản cập nhật là nhân viên


    if (data.nhanVienID) {
      user = await User.findOne({
        nhanVienID: data.nhanVienID
      }); // nếu cập nhật mật khẩu

      if (data.oldPass) {
        let isPassword = await Bcrypt.compare(data.oldPass, user.passWord);
        let newpass = Bcrypt.hashSync(data.newPass, SALT_LENGTH);

        if (isPassword === true) {
          let newUser = {
            _id: user._id,
            userName: data.userName,
            passWord: newpass,
            email: data.email,
            status: user.status,
            rolesGroupID: user.rolesGroupID,
            nhanVienID: data.nhanVienID
          };
          user = Object.assign(user, newUser);
          await user.save();
          return {
            user,
            isPassword
          };
        } else {
          return {
            user,
            isPassword
          };
        }
      } else {
        // nếu cập nhật tài khoản
        let isPassword = true;
        user.userName = data.userName;
        await user.save();
        return {
          user,
          isPassword
        };
      }
    }

    return false;
  } catch (err) {
    return err;
  }
}; // kích hoạt tài khoản


const active = async (request, h) => {
  try {
    let account = await User.findOne({
      khachThueID: request.params.id
    }).populate('khachThueID');

    if (account.status === false) {
      account.status = true;
    }

    await account.save();
    return account;
  } catch (err) {
    return Boom.forbidden(err);
  }
}; // sao luu tesst sao luu


const backup = async (request, h) => {
  try {
    let filename = 'QuanLyPhongTro-' + request.payload.namefolder + '-' + moment(new Date()).format('DD-MM-YYYY');
    cmd.run(`mongodump --out F:/DoAnTotNghiep/${request.payload.namefolder}/${filename} --db QuanLyPhongTro_57130724`);
    return true;
  } catch (err) {
    return err;
  }
}; // phục hồi


const restore = async (request, h) => {
  try {
    cmd.run(`mongorestore --port 27017 F:/DoAnTotNghiep/Backup/${request.payload.namefolder}`);
    return true;
  } catch (err) {
    return err;
  }
};

exports.default = {
  signin,
  login,
  getUser,
  editUser,
  active,
  createAccountNV,
  createAccountKT,
  backup,
  restore
};

/***/ }),

/***/ "./app/modules/user/index.js":
/*!***********************************!*\
  !*** ./app/modules/user/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(/*! ./routes/index.js */ "./app/modules/user/routes/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = (server, options) => {
  server.route(_index2.default);
};

exports.name = 'auth-app';

/***/ }),

/***/ "./app/modules/user/routes/index.js":
/*!******************************************!*\
  !*** ./app/modules/user/routes/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(/*! ../controller/index */ "./app/modules/user/controller/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ../validate/index */ "./app/modules/user/validate/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  method: 'POST',
  path: '/login',
  handler: _index2.default.login,
  config: {
    auth: false,
    description: 'check login',
    validate: _index4.default.login,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/get-current-user',
  handler: _index2.default.getUser,
  config: {
    description: 'lay thong tin user',
    validate: _index4.default.getuser,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'GET',
  path: '/kich-hoat-tai-khoan-{id}',
  handler: _index2.default.active,
  config: {
    description: 'active tài khoản khách thuê',
    validate: _index4.default.active,
    auth: false,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/sigin',
  handler: _index2.default.signin,
  config: {
    auth: false,
    description: 'sigin account',
    validate: _index4.default.signin,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/editUser',
  handler: _index2.default.editUser,
  config: {
    description: 'cập nhật tài khoản',
    validate: _index4.default.edit,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/backup',
  handler: _index2.default.backup,
  config: {
    auth: false,
    description: 'sao lưu',
    validate: _index4.default.backup,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}, {
  method: 'POST',
  path: '/restore',
  handler: _index2.default.restore,
  config: {
    auth: false,
    description: 'phục hồi',
    validate: _index4.default.backup,
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'Bad Request'
          }
        },
        payloadType: 'json'
      }
    }
  }
}];

/***/ }),

/***/ "./app/modules/user/validate/index.js":
/*!********************************************!*\
  !*** ./app/modules/user/validate/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const Joi = __webpack_require__(/*! joi */ "joi");

Joi.ObjectId = __webpack_require__(/*! joi-objectid */ "joi-objectid")(Joi);
const userVal = {
  signin: {
    payload: {
      userName: Joi.string().required().max(30),
      passWord: Joi.string().required(),
      email: Joi.string().email(),
      status: Joi.boolean().default(true),
      rolesGroupID: Joi.ObjectId(),
      nhanVienID: Joi.ObjectId()
    }
  },
  login: {
    payload: {
      userName: Joi.string().required().max(30),
      passWord: Joi.string().required()
    }
  },
  backup: {
    payload: {
      namefolder: Joi.string().required()
    }
  },
  edit: {
    payload: {
      userName: Joi.string().required().max(30),
      email: Joi.string().email().required(),
      oldPass: Joi.string(),
      newPass: Joi.string(),
      xacNhan: Joi.string(),
      khachThueID: Joi.string(),
      nhanVienID: Joi.string()
    },
    options: {
      allowUnknown: true
    }
  },
  active: {
    params: {
      id: Joi.ObjectId()
    }
  }
};
exports.default = { ...userVal
};

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, main, scripts, author, license, dependencies, devDependencies, default */
/***/ (function(module) {

module.exports = {"name":"quanlyphongtro","version":"1.0.0","description":"Đồ án tốt nghiệp ","main":"app.js","scripts":{"start":"npm run build:server:once && npm-run-all --parallel nodemon:prod watch:server","build:server:once":"cross-env NODE_ENV=development webpack --config webpack.config.js","watch:server":"cross-env NODE_ENV=development webpack --inline --progress --config webpack.config.js --watch","nodemon:prod":"cross-env NODE_ENV=development nodemon --inspect build.js"},"author":"Nguyễn Văn Toàn","license":"ISC","dependencies":{"aguid":"^2.0.0","bcrypt":"^3.0.5","bluebird":"^3.5.3","boom":"^7.3.0","config":"^3.0.1","hapi":"^17.5.3","hapi-auth-jwt2":"^8.3.0","hapi-cors":"^1.0.3","hapi-swagger":"^9.4.2","inert":"^5.1.2","joi":"^14.3.1","joi-objectid":"^2.0.0","jsonwebtoken":"^8.5.1","lodash":"^4.17.11","moment":"^2.24.0","mongodb-backup":"^1.6.9","mongodb-restore":"^1.6.2","mongoose":"^5.4.17","mongoose-paginate":"^5.0.3","node-cmd":"^3.0.0","node-excel-export":"^1.4.4","nodemailer":"^5.1.1","paypal-rest-sdk":"^1.8.1","redis":"^2.8.0","vision":"^5.4.4","xoauth2":"^1.2.0"},"devDependencies":{"@babel/core":"^7.3.4","babel-loader":"^8.0.5","babel-preset-env":"^1.7.0","cross-env":"^5.2.0","npm-run-all":"^4.1.5","webpack":"^4.29.6","webpack-cli":"^3.2.3","nodemon":"^1.18.10","webpack-node-externals":"^1.7.2"}};

/***/ }),

/***/ 0:
/*!**********************!*\
  !*** multi ./app.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! F:\DoAnTotNghiep\DoAnTotNghiep_Toan\api\app.js */"./app.js");


/***/ }),

/***/ "aguid":
/*!************************!*\
  !*** external "aguid" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("aguid");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),

/***/ "bluebird":
/*!***************************!*\
  !*** external "bluebird" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),

/***/ "boom":
/*!***********************!*\
  !*** external "boom" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("boom");

/***/ }),

/***/ "config":
/*!*************************!*\
  !*** external "config" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("config");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "hapi":
/*!***********************!*\
  !*** external "hapi" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("hapi");

/***/ }),

/***/ "hapi-auth-jwt2":
/*!*********************************!*\
  !*** external "hapi-auth-jwt2" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("hapi-auth-jwt2");

/***/ }),

/***/ "hapi-cors":
/*!****************************!*\
  !*** external "hapi-cors" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("hapi-cors");

/***/ }),

/***/ "hapi-swagger":
/*!*******************************!*\
  !*** external "hapi-swagger" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("hapi-swagger");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "inert":
/*!************************!*\
  !*** external "inert" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("inert");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),

/***/ "joi-objectid":
/*!*******************************!*\
  !*** external "joi-objectid" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("joi-objectid");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "mongoose-paginate":
/*!************************************!*\
  !*** external "mongoose-paginate" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose-paginate");

/***/ }),

/***/ "node-cmd":
/*!***************************!*\
  !*** external "node-cmd" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-cmd");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "paypal-rest-sdk":
/*!**********************************!*\
  !*** external "paypal-rest-sdk" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("paypal-rest-sdk");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redis");

/***/ }),

/***/ "vision":
/*!*************************!*\
  !*** external "vision" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vision");

/***/ })

/******/ });