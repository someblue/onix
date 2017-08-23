import $ from 'jquery'

export default function(content) {
  var $temp = $('<textarea>')
  $('body').append($temp)
  $temp.val(content).select()
  document.execCommand('copy')
  $temp.remove()
}
