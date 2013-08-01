define(['BaseRouter'], function(BaseRouter) {
  return BaseRouter.extend(function(base) {
    return {
      routes: {
        'title': 'title',
        'slide/:id': 'slide',
        'end': 'end',
        'test': 'test',
        '':'title'
      }
    };
  });
});