function setupEditor(id, language) {
    var editor = ace.edit(id);
    editor.setTheme('ace/theme/tomorrow');
    editor.getSession().setMode(`ace/mode/${language}`);
    editor.getSession().on('change', function (e) {
        store.set(id, editor.getValue());
    });
    return editor;
}

var $template = setupEditor('template', 'plain_text');
var $data = setupEditor('data', 'javascript');
var $result = setupEditor('result', 'plain_text');
console.log('template: ', $template);
console.log('data: ', $data);
console.log('result: ', $result);

function bindContentProperty(obj) {
    Object.defineProperty(obj, "content", {
        get: function () { return this.getValue(); },
        set: function (v) { this.setValue(v, 1); }
    });
}

bindContentProperty($template);
bindContentProperty($data);
bindContentProperty($result);

function onLoad() {
    $template.content = store.get('template') || 'Hello {{ name }}!';
    $data.content = store.get('data') || '{"name": "Luke"}';
    generate();
}

function generate() {
    console.log('===== generating! =====');
    var data, result;

    try {
        eval(`var dataObj=${$data.content}`);
        data = dataObj;
    } catch (e) {
        alert('parse data error: ' + e);
        return;
    }

    result = template.render($template.content, data);

    console.log('template: ', $template.content);
    console.log('data: ', data);
    console.log('result: ', result);

    $result.content = result;
}

function copyResult() {
    // var copyTextarea = document.querySelector('#result');
    // copyTextarea.select();
    copyToClipboard($result.content);
}