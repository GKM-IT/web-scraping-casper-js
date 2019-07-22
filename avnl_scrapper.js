var casper = require('casper').create();
var length = 0;
function getCellContent(row, cell) {
    cellText = casper.evaluate(function(row, cell) {
        return document.querySelectorAll('table tbody tr')[row].childNodes[cell].innerText.trim();
    }, row, cell);
    return cellText;
}
casper.start("https://www.billdesk.com/pgidsk/pgmerc/jvvnljp/JVVNLJPDetails.jsp", function() {
    this.evaluate(function(id,email){
        document.querySelector('input[name="txtCustomerID"]').value = id;
    document.querySelector('input[name="txtEmail"]').value = email;
    document.querySelector('.subtn').click();
    }, casper.cli.get(0), 'jeetesh@gkmit.co');
});
casper.then(function(){
    // this.echo(this.getHTML());
    var rows = this.evaluate(function(){
        return document.querySelectorAll("tbody tr");
    });
    length = rows.length;
})
casper.then(function(){
    var fs = require('fs');
    this.echo(getCellContent(1, 3)+";"+getCellContent(6, 3)+";"+getCellContent(7, 3)+";"+getCellContent(10, 3));
    fs.write("data.csv", getCellContent(1, 3)+";"+getCellContent(6, 3)+";"+getCellContent(7, 3)+";"+getCellContent(10, 3)+"\n", "a");
})
casper.run();