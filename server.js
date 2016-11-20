var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var info = {
		personal : {
		title : 'Personal Information', 
		heading : 'Personal Information',
		content : `
	            <p>
	                I am Shreetama Ray, born on 30.10.1996 in Kolkata,India.
	                I have grown and studied till my higher education in a city called Bhiwani in Haryana.
	                Currently, to persue my undergraduate career as an engineer , I am staying in hostel in Jaipur.
	                I want to become a successful computer engineer one day so that I can contribute in development of my country.
	            </p>`

		},
		work : {
		title : 'Proffessional Information', 
		heading : 'Proffessional Information',
		content :`
	            <p>
	                I am persuing my B.Tech in Communication and Computer Engineering(CCE) from The LNM Institute of Information Technology, which is a deemed university located in Jaipur ,Rajasthan.
                To know more about my college, you can refer to our  <a href = "http://www.lnmiit.ac.in/Default.aspx">website </a>.
                Currently, I am in my fifth semester.
	            </p>`

		},
		interest: {
		title : 'My likes and Interests', 
		heading : 'My likes and Interests',
		content : `
	            <p>
	                After a lot of research and analysis, I have concluded that I love web designing the most, particularly backend development.
                	My favourite language is Python and I enjoy the Django framework a lotOn personal front, my ultimate interest is in singing as it has helped me heal in many struggling phases of my life.
                </p>`
		}
};


function createTemplate(data){
var title = data.title;
var heading = data.heading;
var content = data.content;
var htmlTemplate = `
<html>
    <head>
        <title> ${title} </title>
        <link href = "/ui/style.css" rel = "stylesheet" />
    </head>
    <body>
    	
        <div class = "container">
        	<div><h3> ${heading} </h3></div>

            <a href = "/"> Home </a>
        </div>
        
            <div>
            	${content}
            </div>
        </div>
    </body>
</html>
` ;
return htmlTemplate;
}



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/shree.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'shree.png'));
});

var names = [];
app.get('/submit-name', function(req,res){
    var name = req.query.name;
    names.push('name');
    res.send(JSON.stringify(names));
});


app.get('/:infoname', function(req,res){
    var infoname = req.params.infoname;
    res.send(createTemplate(info[infoname]));
});



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
