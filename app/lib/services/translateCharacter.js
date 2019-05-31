'use strict'

export default function translateCharacter (input) {
  if (input == undefined || input == '')
      return '';
  // đổi chữ hoa thành chữ thường
  var slug = input.toLowerCase();

  // đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ặ|ẵ|â|ấ|ầ|ẩ|ậ|ẫ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẹ|ẽ|ê|ế|ề|ể|ệ|ễ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ị|ĩ/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|ọ|õ|ô|ố|ồ|ộ|ổ|ỗ|ơ|ớ|ờ|ợ|ở|ỡ/gi, 'o');
  slug = slug.replace(/ú|ù|ụ|ủ|ũ|ư|ứ|ừ|ự|ử|ữ/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỵ|ỷ|ỹ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  // xóa ký tự đặc biệt
  slug = slug.replace(/\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|\_/gi, '');
  // đổi ký tự khoảng trắng thành dấu gạch ngang
  slug = slug.replace(/ /gi, '');
  // đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  // Phòng trường hợp người nhập quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-\-\-/gi, '');
  slug = slug.replace(/\-\-\-\-\-\-/gi, '');
  slug = slug.replace(/\-\-\-\-\-/gi, '');
  slug = slug.replace(/\-\-\-\-/gi, '');
  slug = slug.replace(/\-\-\-/gi, '');
  slug = slug.replace(/\-\-/gi, '');
  // xóa ký tự gạch ngang ở đầu và cuối
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
}
