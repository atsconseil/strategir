var http = require('http');
var url = require('url');
var fs = require('fs');
var csv = require('./node_modules/csv');


var csv_obj = csv();

function MyCSV(Entete1,	Entete2, Entete3, Horodatage, FirstName, Block, Line, Content) {
    this.Entete1 = Entete1;
    this.Entete2 = Entete2;
    this.Entete3 = Entete3;
    this.Horodatage = Horodatage;
    this.FirstName = FirstName;
    this.Block = Block;
    this.Line = Line;
    this.Content = Content;
};

var Data = [];

csv_obj.from.path('data/strategir_handicap.csv').to.array(function (data) {
    for (var index = 0; index < data.length; index++) {
    	var CSV_temp = new MyCSV(data[index][0], data[index][1], data[index][2], data[index][3], data[index][4], data[index][5], data[index][6], data[index][7]);
    	if(!Data[data[index][5]]){
    		Data.push(CSV_temp);
    	} else {
    		Data[data[index][5]].Content = Data[data[index][5]].Content.concat(CSV_temp.Content);
    	}   	
    }
    fs.appendFileSync('./data/data.json', JSON.stringify(Data, null, 2).concat(","));
});