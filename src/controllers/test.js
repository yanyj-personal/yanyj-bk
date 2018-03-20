let getDeclarations = ctx => {
	console.log(ctx);
  ctx.body = {
    'page': 1,
    'results': [{
      'declareResult': 0,
      'declareTime': '2018-01-30 00:00:00',
      'declareUserName': '严彦君',
      'id': '297e020a614ad43201614ad49cee0000',
      'remarks': '测试'
    }, {
      'declareResult': 0,
      'declareTime': '2018-01-29 00:00:00',
      'declareUserName': '严彦君',
      'id': '297e020a614b171c01614b2bca6b0000',
      'remarks': '256525'
    }, {
      'declareResult': 0,
      'declareUserName': '严彦君',
      'id': '297e020a614ecbb501614ecc9c760000',
      'remarks': '123'
    }, {
      'declareResult': 0,
      'declareTime': '2018-02-01 00:00:00',
      'declareUserName': '严彦君',
      'id': '297e020a614ecbb501614ecd132c0001',
      'remarks': '多撒多'
    }, {
      'declareResult': 0,
      'declareTime': '2018-02-01 00:00:00',
      'declareUserName': '严彦君',
      'id': '297e020a614ecbb501615ecd132c0001',
      'remarks': '多撒多'
    }, {
      'declareResult': 0,
      'declareTime': '2018-02-01 00:00:00',
      'declareUserName': '严彦君',
      'id': '297e020a614ecbb501616ecd132c0001',
      'remarks': '多撒多'
    }, {
      'declareResult': 0,
      'declareTime': '2018-02-01 00:00:00',
      'declareUserName': '严彦君',
      'id': '297e020a614ecbb501617ecd132c0001',
      'remarks': '多撒多'
    }, {
      'declareResult': 0,
      'declareTime': '2018-02-01 00:00:00',
      'declareUserName': '严彦君',
      'id': '297e020a614ecbb501618ecd132c0001',
      'remarks': '多撒多'
    }, {
      'declareResult': 0,
      'declareTime': '2018-02-01 00:00:00',
      'declareUserName': '严彦君',
      'id': '297e020a614ecbb501619ecd132c0001',
      'remarks': '多撒多'
    }, {
      'declareResult': 0,
      'declareTime': '2018-02-01 00:00:00',
      'declareUserName': '严彦君',
      'id': '297e020a614ecbb501624ecd132c0001',
      'remarks': '多撒多'
    }],
    'rows': 10,
    'total': 11,
    'totalPages': 2
  };
};

export let apis = [
  ['get', '/declarations', getDeclarations],
];
