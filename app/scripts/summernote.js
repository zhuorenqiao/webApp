(function ($) {
  // 控制编辑按钮和保存按钮的显示。
  const isEditor = false;


  // 初始化编辑器配置。
  const editorOptions = {
    height: 300,
    placeholder: '编辑区域',
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'underline', 'clear']],
      ['fontname', ['fontname']],
      ['fontsize', ['fontsize']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link', 'picture', 'video']],
      ['view', ['fullscreen', 'codeview', 'help']],
    ],
    fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', '宋体', '微软雅黑'],
  };

  // 初始化编辑器,并且绑定保存和编辑事件。
  function summernoteInit(selector, options) {
    // 查询接口的isEditor状态，如果是true，则已经编辑，save按钮隐藏,editor按钮显示
    // 如果是false，则未编辑，save按钮显示,editor按钮隐藏；
    $.ajax({
      url: '../../mock/editor.json',
      type: 'GET',
      dataType: 'json',
      data: {},
    }).done((data) => {
      if (data.status == '1000') {
        const datas = data.data;
        if (data.isEditor && datas.text) {
          if (localStorage.getItem('editorContent')) {
            selector.html(localStorage.getItem('editorContent'));
          } else {
            selector.html(datas.text);
          }

          // 编辑事件
          $('#edit').on('click', () => {
            selector.summernote(options);
            selector.summernote({ focus: true });
          });
        }
      }
    }).fail((err) => {
      console.log(err);
    });


    // 保存事件
    $('#save').on('click', () => {
      const makrup = selector.summernote('code');
      $.ajax({
        url: '../../mock/editorSave.json',
        type: 'GET',
        dataType: 'json',
      }).done((data) => {
        if (data.status == '1000') {
          selector.summernote('destroy');
          localStorage.setItem('editorContent', makrup);
        }
      }).fail((err) => {
        console.log(err);
      });
    });
  }

  // 入口文件
  function init() {
    // 初始化编辑器
    summernoteInit($('.summernote'), editorOptions);
  }

  // 开始执行
  init();
}(jQuery));
