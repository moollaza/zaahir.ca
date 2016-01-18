var express = require('express'),
	router = express.Router(),
	nunjucks = require('nunjucks')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.html', { title: 'Zaahir.ca' });
});

module.exports = router;
