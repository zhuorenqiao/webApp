(($) => {
  $('#ajax-example-1').footable({
    filtering: {
      enabled: true,
      placeholder: '输入关键字进行查询',
    },
    editing: {
      enabled: true,
    },
    paging: {
      enabled: true,
    },
    columns: $.Deferred((d) => {
      setTimeout(() => {
        $.get('../../mock/columns.json').then(d.resolve, d.reject);
      }, 3000);
    }),
    rows: $.get('../../mock/rows.json'),
  });
})();
